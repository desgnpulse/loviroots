---
name: lovi-project-infra
description: Lovi service names, container names, deploy paths — stops rediscovery every session
metadata:
  type: project
---

## Identity
| Item | Value |
|------|-------|
| Project slug | `lovi` |
| Repo root | `/home/jay/dev/lovi` |
| Primary language / runtime | Node.js 20 / Next.js 15 (App Router) |
| Package manager | pnpm |

## Services & Containers
| Service | Container name | Host port | Notes |
|---------|---------------|-----------|-------|
| (FILL when docker-compose is added) | | | |

## Deploy (Hetzner + Nginx + PM2 + Cloudflare)
| Item | Value |
|------|-------|
| SSH target | (FILL — add alias to ~/.ssh/config when server is provisioned) |
| Remote deploy path | `/home/jay/lovi` |
| Reverse proxy | Nginx → :3000 |
| CDN / SSL | Cloudflare Full Strict + certbot |
| Next.js output | `output: 'standalone'` in next.config.ts |
| Deploy sequence | git pull → pnpm install --frozen-lockfile → pnpm build → pm2 reload lovi |
| PM2 app name | `lovi` |
| Restart command | `ssh <target> "pm2 reload lovi"` |

## Naming Conventions / Gotchas
- Brand name is always "Lovi" — never "Lovy"
- WhatsApp number env var: NEXT_PUBLIC_WHATSAPP_NUMBER (no + prefix, format 2547XXXXXXXX)
- Pesapal has separate sandbox and production base URLs — check PESAPAL_ENV value

## Env Source
`.env` at repo root (gitignored). Reference: `.env.example`
