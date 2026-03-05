#!/bin/bash

# Webhook listener para auto-deploy
# Este script fica rodando e espera requisições HTTP para deployar

PORT=9000
PROJECT_DIR="/root/central-de-app"

echo "🎧 Webhook listener rodando na porta $PORT"
echo "Para deployar, acesse: http://72.61.62.17:$PORT/deploy"

while true; do
    echo -e "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nDeploy iniciado!" | \
    nc -l -p $PORT -q 1 | grep -q "GET /deploy" && {
        echo "🔔 Deploy trigger recebido!"
        cd $PROJECT_DIR && ./auto-deploy.sh
    }
done
