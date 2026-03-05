#!/bin/bash

# Quick Deploy - Atalho rápido para deploy
# Uso: ./quick-deploy.sh "mensagem do commit"

# Verificar se foi passada mensagem
if [ -z "$1" ]; then
    echo "❌ Erro: Informe a mensagem do commit"
    echo "Uso: ./quick-deploy.sh \"sua mensagem\""
    exit 1
fi

COMMIT_MSG="$1"

echo "🚀 Quick Deploy Iniciado..."

# 1. Git add
echo "📝 Adicionando arquivos..."
git add .

# 2. Git commit
echo "💾 Commitando: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"

# 3. Git push
echo "📤 Enviando para repositório..."
git push

# 4. Deploy na VPS
echo "🔄 Deployando na VPS..."
ssh root@72.61.62.17 'cd /root/central-de-app && ./auto-deploy.sh'

echo "✅ Deploy concluído!"
echo "🌐 Acesse: http://72.61.62.17:8080"
