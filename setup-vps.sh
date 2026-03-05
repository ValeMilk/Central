#!/bin/bash

# Setup inicial na VPS
# Execute este script UMA VEZ na VPS para configurar tudo

set -e

echo "🔧 Configurando VPS para auto-deploy..."

# 1. Instalar dependências
echo "📦 Instalando dependências..."
apt-get update
apt-get install -y git curl netcat

# 2. Instalar Docker (se não tiver)
if ! command -v docker &> /dev/null; then
    echo "🐳 Instalando Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
fi

# 3. Instalar Docker Compose (se não tiver)
if ! command -v docker-compose &> /dev/null; then
    echo "🐳 Instalando Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

# 4. Configurar diretório do projeto
PROJECT_DIR="/root/central-de-app"

# 5. Clone do repositório (se ainda não existir)
if [ ! -d "$PROJECT_DIR" ]; then
    echo "📥 Clonando repositório..."
    read -p "Digite a URL do repositório Git: " REPO_URL
    git clone $REPO_URL $PROJECT_DIR
else
    echo "✅ Diretório do projeto já existe"
fi

# 6. Dar permissão de execução aos scripts
cd $PROJECT_DIR
chmod +x auto-deploy.sh
chmod +x webhook-listener.sh

# 7. Configurar Git (para evitar problemas de merge)
cd $PROJECT_DIR
git config pull.rebase false

# 8. Fazer o primeiro deploy
echo "🚀 Fazendo primeiro deploy..."
./auto-deploy.sh

# 9. Criar serviço systemd para webhook (opcional)
echo "📝 Criando serviço systemd para webhook..."
cat > /etc/systemd/system/webhook-deploy.service << 'EOF'
[Unit]
Description=Webhook Deploy Listener
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/central-de-app
ExecStart=/bin/bash /root/central-de-app/webhook-listener.sh
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# 10. Perguntar se quer ativar o webhook
read -p "Deseja ativar o webhook listener? (s/n): " ENABLE_WEBHOOK
if [ "$ENABLE_WEBHOOK" = "s" ]; then
    systemctl daemon-reload
    systemctl enable webhook-deploy.service
    systemctl start webhook-deploy.service
    echo "✅ Webhook listener ativado na porta 9000"
    echo "🔗 URL: http://72.61.62.17:9000/deploy"
fi

echo ""
echo "✅ Setup concluído!"
echo ""
echo "📋 Próximos passos:"
echo "   1. Configure seu repositório Git"
echo "   2. Para deploy manual: ssh root@72.61.62.17 'cd /root/central-de-app && ./auto-deploy.sh'"
echo "   3. Para webhook: curl http://72.61.62.17:9000/deploy"
echo "   4. Para GitHub Actions: Configure a secret SSH_PRIVATE_KEY"
echo ""
echo "🌐 Aplicação rodando em: http://72.61.62.17:8080"
