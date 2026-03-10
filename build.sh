#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "==> Building resume PDF..."
python "$ROOT/resume/build_resume.py" --compile

echo ""
echo "==> Building website..."
cd "$ROOT/web"
npm run build

echo ""
echo "==> Done! Resume: resume/resume.pdf | Site: web/dist/"
