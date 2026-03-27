#!/bin/bash

# Setup Completo - Central de Sistemas
# Execute na VPS: bash setup-completo.sh

set -e

echo "🚀 Setup Central de Sistemas - Iniciando..."
echo ""

# 1. Clonar repositório
if [ ! -d "/root/central-de-app" ]; then
    echo "📥 Clonando repositório..."
    git clone https://github.com/ValeMilk/Central.git /root/central-de-app
else
    echo "✅ Repositório já existe, atualizando..."
    cd /root/central-de-app
    git pull
fi

# 2. Fazer deploy do container
echo ""
echo "🐳 Fazendo deploy do container..."
cd /root/central-de-app
chmod +x deploy-simples.sh
./deploy-simples.sh

# 3. Instalar Nginx
echo ""
echo "📦 Instalando Nginx..."
apt update
apt install nginx -y

# 4. Configurar Nginx para central.valemilk.com.br
echo ""
echo "⚙️  Configurando Nginx..."
cat > /etc/nginx/sites-available/central.valemilk.com.br.conf << 'EOF'
server {
    listen 80;
    server_name central.valemilk.com.br;

    location / {
        proxy_pass http://localhost:8885;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# 5. Ativar configuração
echo "🔗 Ativando configuração..."
ln -sf /etc/nginx/sites-available/central.valemilk.com.br.conf /etc/nginx/sites-enabled/

# 6. Remover default se existir
if [ -f "/etc/nginx/sites-enabled/default" ]; then
    echo "🗑️  Removendo site default..."
    rm -f /etc/nginx/sites-enabled/default
fi

# 7. Testar configuração
echo "🧪 Testando configuração do Nginx..."
nginx -t

# 8. Iniciar/Recarregar Nginx
echo "🔄 Iniciando Nginx..."
systemctl enable nginx
systemctl restart nginx

# 9. Verificar status
echo ""
echo "📊 Status dos serviços:"
echo ""
echo "=== Containers Docker ==="
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "=== Nginx ==="
systemctl status nginx --no-pager -l

echo ""
echo "✅ Setup concluído com sucesso!"
echo ""
echo "🌐 Acessos disponíveis:"
echo "   - Por IP: http://72.61.62.17:8885"
echo "   - Por domínio (após DNS propagar): http://central.valemilk.com.br"
echo ""
echo "📝 Para testar DNS:"
echo "   nslookup central.valemilk.com.br"
echo ""
