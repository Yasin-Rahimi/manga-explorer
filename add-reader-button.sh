#!/bin/bash
set -e

cd backend

echo "🔧 Changing proxy port to 10809..."

# 1. Update .env
if [ -f .env ]; then
    sed -i 's/10808/10809/g' .env
else
    echo "HTTP_PROXY=http://127.0.0.1:10809" > .env
    echo "HTTPS_PROXY=http://127.0.0.1:10809" >> .env
fi

# 2. Update app.js fallback
sed -i "s|http://127.0.0.1:10808|http://127.0.0.1:10809|g" src/app.js

echo "✅ Proxy port set back to 10809"
echo "Now restart the backend:"
echo "   cd backend && npm run dev"