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
  files=$(grep -rIl --include="*.md" --include="*.mdx" --include="*.json" --include="*.tsx" --include="*.ts" --include="*.jsx" "${excludes[@]}" -E "$pattern" "$TARGET" 2>/dev/null || true)
  [ -z "$files" ] && return

  local any=0 report=""
  while IFS= read -r file; do
    [ -z "$file" ] && continue
    local hit
    hit=$(grep -vE '^#' "$file" | grep -nE "$pattern" 2>/dev/null || true)
    if [ -n "$hit" ]; then
      any=1
      report+="$file:"$'\n'"$(printf '%s\n' "$hit" | sed 's/^/  /')"$'\n'
    fi
  done <<< "$files"

  if [ "$any" -eq 1 ]; then
    red "FAIL: $desc"
    printf '%s' "$report"
    ERRORS=$((ERRORS + 1))
  fi
}

# Same as flag(), but restricted to prose files (.md/.json) - for rules like
# "no exclamation points" that are unusable against source code, where "!"
# is legitimate TypeScript syntax (non-null assertions, negation).
flag_prose() {
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
  files=$(grep -rIl --include="*.md" --include="*.json" "${excludes[@]}" -E "$pattern" "$TARGET" 2>/dev/null || true)
  [ -z "$files" ] && return

  local any=0 report=""
  while IFS= read -r file; do
    [ -z "$file" ] && continue
    local hit
    hit=$(grep -vE '^#' "$file" | grep -nE "$pattern" 2>/dev/null || true)
    if [ -n "$hit" ]; then
      any=1
      report+="$file:"$'\n'"$(printf '%s\n' "$hit" | sed 's/^/  /')"$'\n'
    fi
  done <<< "$files"

  if [ "$any" -eq 1 ]; then
    red "FAIL: $desc"
    printf '%s' "$report"
    ERRORS=$((ERRORS + 1))
  fi
}


label "Punctuation"
flag "Em dash found (rewrite the sentence)"       '—|&mdash;|&#8212;|&#x2014;'
flag_prose "Exclamation point found (remove it)"  '!'

label "Banned AI words"
flag_prose "'dive in' found"          '\bdive in\b'
flag_prose "'delve' found"            '\bdelve\b'
flag_prose "'leverage' found"         '\bleverage\b'
flag_prose "'seamless' found"         '\bseamless\b'
flag_prose "'unlock' found"           '\bunlock\b'
flag_prose "'robust' found"           '\brobust\b'
flag_prose "'streamline' found"       '\bstreamline\b'
flag_prose "'harness' found"          '\bharness\b'
flag_prose "'cutting-edge' found"     'cutting-edge'
flag_prose "'transformative' found"   '\btransformative\b'
flag_prose "'game-changer' found"     'game-changer|game changer'
flag_prose "'revolutionary' found"    '\brevolutionary\b'

label "Banned phrases"
flag_prose "'utilize' found (use 'use')"        '\butilize\b'
flag_prose "'facilitate' found (use 'help')"    '\bfacilitate\b'
flag_prose "'initiate' found (use 'start')"     '\binitiate\b'

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
if os.path.isfile(target) and target.endswith(('.md', '.mdx')):
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
    in_frontmatter = False
    frontmatter_count = 0
    for line in raw_lines:
        stripped = line.strip()
        if stripped == '---':
            frontmatter_count += 1
            in_frontmatter = frontmatter_count == 1
            continue
        if in_frontmatter:
            continue
        if stripped.startswith('```'):
            in_code = not in_code
            continue
        if in_code:
            continue
        line = stripped
        if not line or line.startswith('#') or line.startswith('|') or line.count('|') >= 2:
            continue
        if line.startswith('- ') or line.startswith('* '):
            line = line[2:]
        # strip markdown bold/italic and links before splitting so bold labels
        # (e.g. **Label.**) don't merge with the following sentence
        line = re.sub(r'\*+([^*]+)\*+', r'\1', line)
        line = re.sub(r'\[([^\]]*)\]\([^)]*\)', r'\1', line)
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
