#!/bin/bash

# Deploy Simples - VPS já tem Docker instalado
# Uso: ./deploy-simples.sh

set -e

echo "🚀 Deploy Central de Sistemas - Porta 8885"

# Pull do repositório
echo "📥 Puxando código do Git..."
git pull origin main || git pull origin master

# Parar e remover container antigo
echo "🛑 Parando containers antigos..."
docker-compose down 2>/dev/null || true

# Build da nova imagem
echo "🔨 Construindo imagem Docker..."
docker-compose build --no-cache

# Subir container
echo "▶️  Iniciando container..."
docker-compose up -d

# Limpar imagens antigas
echo "🧹 Limpando cache..."
docker image prune -f

# Status
echo "✅ Deploy concluído!"
echo ""
docker-compose ps
echo ""
echo "🌐 Aplicação rodando em: http://72.61.62.17:8885"
