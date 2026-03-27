#!/bin/bash

# Script de configuração do Nginx para subdomínios
# Execute na VPS: ./setup-nginx.sh

set -e

echo "🔧 Configurando Nginx Reverse Proxy para subdomínios..."

# Verificar se Nginx está instalado
if ! command -v nginx &> /dev/null; then
    echo "📦 Instalando Nginx..."
    apt update
    apt install -y nginx
else
    echo "✅ Nginx já está instalado"
fi

# Criar diretório para as configurações
NGINX_DIR="/etc/nginx/sites-available"
NGINX_ENABLED="/etc/nginx/sites-enabled"

# Copiar configurações
echo "📋 Copiando configurações..."
cp central.valemilk.com.br.conf $NGINX_DIR/
cp supply.valemilk.com.br.conf $NGINX_DIR/
cp valefish.valemilk.com.br.conf $NGINX_DIR/
cp mapas.valemilk.com.br.conf $NGINX_DIR/

# Criar links simbólicos
echo "🔗 Ativando sites..."
ln -sf $NGINX_DIR/central.valemilk.com.br.conf $NGINX_ENABLED/
ln -sf $NGINX_DIR/supply.valemilk.com.br.conf $NGINX_ENABLED/
ln -sf $NGINX_DIR/valefish.valemilk.com.br.conf $NGINX_ENABLED/
ln -sf $NGINX_DIR/mapas.valemilk.com.br.conf $NGINX_ENABLED/

# Remover configuração default (opcional)
if [ -f "$NGINX_ENABLED/default" ]; then
    echo "🗑️  Removendo site default..."
    rm -f $NGINX_ENABLED/default
fi

# Testar configuração
echo "🧪 Testando configuração do Nginx..."
nginx -t

# Recarregar Nginx
echo "🔄 Recarregando Nginx..."
systemctl reload nginx
systemctl enable nginx

echo ""
echo "✅ Nginx configurado com sucesso!"
echo ""
echo "📝 Subdomínios configurados:"
echo "   • central.valemilk.com.br  → localhost:8885"
echo "   • supply.valemilk.com.br   → localhost:8886"
echo "   • valefish.valemilk.com.br → localhost:8888"
echo "   • mapas.valemilk.com.br    → localhost:3000"
echo ""
echo "🔒 Para ativar HTTPS (SSL), execute:"
echo "   apt install certbot python3-certbot-nginx"
echo "   certbot --nginx -d central.valemilk.com.br -d supply.valemilk.com.br -d valefish.valemilk.com.br -d mapas.valemilk.com.br"
echo ""
echo "📊 Ver status: systemctl status nginx"
echo "📋 Ver logs: tail -f /var/log/nginx/*.log"
