#!/bin/bash

# Script de auto-deploy - Puxa do Git e atualiza Docker
# Uso: ./auto-deploy.sh

set -e  # Para na primeira falha

echo "🔄 Iniciando auto-deploy..."

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Diretório do projeto
PROJECT_DIR="/root/central-de-app"
cd $PROJECT_DIR

# 1. Puxar últimas mudanças do Git
echo -e "${BLUE}📥 Puxando atualizações do Git...${NC}"
git pull origin main || git pull origin master

# Verificar se houve mudanças
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Git atualizado com sucesso${NC}"
else
    echo -e "${RED}❌ Erro ao puxar do Git${NC}"
    exit 1
fi

# 2. Parar containers antigos
echo -e "${BLUE}🛑 Parando containers...${NC}"
docker-compose down

# 3. Rebuild da imagem
echo -e "${BLUE}🔨 Reconstruindo imagem Docker...${NC}"
docker-compose build --no-cache

# 4. Subir novos containers
echo -e "${BLUE}🚀 Iniciando containers...${NC}"
docker-compose up -d

# 5. Limpar imagens antigas
echo -e "${BLUE}🧹 Limpando imagens antigas...${NC}"
docker image prune -f

# 6. Verificar status
echo -e "${BLUE}📊 Status dos containers:${NC}"
docker-compose ps

# 7. Mostrar logs recentes
echo -e "${BLUE}📋 Logs recentes:${NC}"
docker-compose logs --tail=30

echo -e "${GREEN}✅ Deploy concluído com sucesso!${NC}"
echo -e "${GREEN}🌐 Aplicação rodando em: http://72.61.62.17:8080${NC}"
