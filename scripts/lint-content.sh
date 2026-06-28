#!/usr/bin/env bash
# Run against any content file or directory.
# Usage: ./scripts/lint-content.sh [file-or-dir]
# Exit 1 if violations found, 0 if clean.
# Called automatically by .git/hooks/pre-commit on staged .md/.json files.
#
# Customize EXCLUDE_DIRS and EXCLUDE_FILES for the project.
# new-project.sh patches these automatically on bootstrap.

set -euo pipefail

TARGET="${1:-.}"
ERRORS=0

# ── PROJECT-SPECIFIC EXCLUSIONS ───────────────────────────────────
# new-project.sh replaces the lines below with project values.
EXCLUDE_DIRS=(".claude" "scripts" "docs" "data" "plugins" "node_modules" ".next")
EXCLUDE_FILES=("CLAUDE.md" "CLAUDE.local.md" "program.md")
# ─────────────────────────────────────────────────────────────────

red()   { printf "\033[31m%s\033[0m\n" "$*"; }
green() { printf "\033[32m%s\033[0m\n" "$*"; }
label() { printf "\n\033[1m%s\033[0m\n" "$*"; }

flag() {
  local desc="$1"; shift
  local pattern="$1"; shift

  local excludes=()
  for d in "${EXCLUDE_DIRS[@]}"; do
    excludes+=(--exclude-dir="$d")
  done
  for f in "${EXCLUDE_FILES[@]}"; do
    excludes+=(--exclude="$f")
  done

  local files
  files=$(grep -rIl --include="*.md" --include="*.mdx" --include="*.json" "${excludes[@]}" -E "$pattern" "$TARGET" 2>/dev/null || true)
  if [ -n "$files" ]; then
    red "FAIL: $desc"
    grep -rIn --include="*.md" --include="*.mdx" --include="*.json" "${excludes[@]}" -E "$pattern" "$TARGET" 2>/dev/null | sed 's/^/  /' || true
    ERRORS=$((ERRORS + 1))
  fi
}

label "Punctuation"
flag "Em dash found (rewrite the sentence)"       $'—'
flag "Exclamation point found (remove it)"        '!'

label "Banned AI words"
flag "'dive in' found"          '\bdive in\b'
flag "'delve' found"            '\bdelve\b'
flag "'leverage' found"         '\bleverage\b'
flag "'seamless' found"         '\bseamless\b'
flag "'unlock' found"           '\bunlock\b'
flag "'robust' found"           '\brobust\b'
flag "'streamline' found"       '\bstreamline\b'
flag "'harness' found"          '\bharness\b'
flag "'cutting-edge' found"     'cutting-edge'
flag "'transformative' found"   '\btransformative\b'
flag "'game-changer' found"     'game-changer|game changer'
flag "'revolutionary' found"    '\brevolutionary\b'

label "Banned phrases"
flag "'utilize' found (use 'use')"        '\butilize\b'
flag "'facilitate' found (use 'help')"    '\bfacilitate\b'
flag "'initiate' found (use 'start')"     '\binitiate\b'

label "Credential safety"
flag "Possible API key pattern found" '(sk-ant-|sk-[a-z]+-|AKIA|ghp_|ghs_)[A-Za-z0-9_-]{16,}'

label "Readability (max 20 words per sentence)"
export LINT_EXCLUDE_DIRS="${EXCLUDE_DIRS[*]}"
python3 - "$TARGET" <<'PYEOF'
import sys, re, os

target = sys.argv[1]
EXCLUDE_DIRS_PY = set(os.environ.get('LINT_EXCLUDE_DIRS', '.claude scripts').split())
EXCLUDE_FILES = {'CLAUDE.md', 'CLAUDE.local.md'}

def is_excluded(path):
    parts = path.replace('\\', '/').split('/')
    for d in EXCLUDE_DIRS_PY:
        if d in parts:
            return True
    return os.path.basename(path) in EXCLUDE_FILES

files = []
if os.path.isfile(target):
    if not is_excluded(target):
        files = [target]
else:
    for root, dirs, names in os.walk(target):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS_PY and not d.startswith('.')]
        for name in names:
            if (name.endswith('.md') or name.endswith('.mdx')) and name not in EXCLUDE_FILES:
                files.append(os.path.join(root, name))

LIMIT = 20
found = False
for path in files:
    raw_lines = open(path).readlines()
    sentences = []
    in_code = False
    for line in raw_lines:
        if line.strip().startswith('```'):
            in_code = not in_code
            continue
        if in_code:
            continue
        line = line.strip()
        if not line or line.startswith('#') or line.startswith('---') or line.startswith('|'):
            continue
        if line.startswith('- ') or line.startswith('* '):
            line = line[2:]
        for s in re.split(r'(?<=[.?])\s+', line):
            s = s.strip()
            if s:
                sentences.append(s)

    for s in sentences:
        s = re.sub(r'\[.*?\]', '', s).strip()
        words = [w for w in re.split(r'\s+', s) if re.search(r'[a-zA-Z]', w)]
        if len(words) > LIMIT:
            print(f'  \033[31mFAIL\033[0m ({len(words)} words) in {path}:')
            print(f'    {s[:120]}')
            found = True

if found:
    sys.exit(1)
PYEOF
READABILITY_EXIT=$?
[ "$READABILITY_EXIT" -ne 0 ] && ERRORS=$((ERRORS + 1))

printf "\n"
if [ "$ERRORS" -eq 0 ]; then
  green "All checks passed."
  exit 0
else
  red "$ERRORS check(s) failed."
  exit 1
fi
