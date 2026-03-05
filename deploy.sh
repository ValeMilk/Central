#!/bin/bash

# Script de deploy para VPS

echo "🚀 Iniciando deploy da Central de Sistemas..."

# Build da imagem
echo "📦 Construindo imagem Docker..."
docker-compose build

# Para containers antigos
echo "🛑 Parando containers antigos..."
docker-compose down

# Sobe os containers
echo "▶️  Subindo containers..."
docker-compose up -d

# Mostra logs
echo "📋 Logs dos últimos 50 linhas:"
docker-compose logs --tail=50

echo "✅ Deploy concluído!"
echo "🌐 Aplicação rodando em: http://localhost:8080"
