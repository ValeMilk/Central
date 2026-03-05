# 🐳 Deploy Docker - Central de Sistemas

## � Setup Rápido (Recomendado)

### 1️⃣ **Setup Inicial na VPS** (execute UMA VEZ)

```bash
# Na sua máquina local, envie os arquivos
scp -r . root@72.61.62.17:/root/central-de-app/

# Conecte na VPS
ssh root@72.61.62.17

# Execute o setup automático
cd /root/central-de-app
chmod +x setup-vps.sh
./setup-vps.sh
```

### 2️⃣ **Deploy Automático via Git**

Após o setup, toda vez que você fizer `git push`, pode atualizar assim:

```bash
# Opção 1: SSH direto (manual)
ssh root@72.61.62.17 'cd /root/central-de-app && ./auto-deploy.sh'

# Opção 2: Webhook (automático)
curl http://72.61.62.17:9000/deploy

# Opção 3: GitHub Actions (100% automático)
# Apenas faça git push - o GitHub Actions faz o resto!
```

---

## 📋 Pré-requisitos na VPS

```bash
# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## 🔄 Deploy Manual (sem Git)

### 1. Enviar arquivos para a VPS

```bash
# Via rsync (recomendado)
rsync -avz --exclude 'node_modules' --exclude 'dist' ./ root@72.61.62.17:/root/central-de-app/

# Ou via git
git clone seu-repositorio.git
cd central-de-app
```

### 2. Construir e subir o container

```bash
# Entrar na pasta do projeto
cd /root/central-de-app

# Build e start
docker-compose up -d --build

# Ver logs
docker-compose logs -f
```

---

## 🤖 GitHub Actions (Deploy Automático)

### Configurar GitHub Actions

1. **Gerar chave SSH na VPS** (se ainda não tiver):
```bash
ssh root@72.61.62.17
ssh-keygen -t ed25519 -C "deploy-key"
cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/id_ed25519  # Copie a chave PRIVADA
```

2. **Adicionar Secret no GitHub**:
   - Vá em: `Repositório → Settings → Secrets and variables → Actions`
   - Clique em `New repository secret`
   - Nome: `SSH_PRIVATE_KEY`
   - Valor: Cole a chave privada que copiou

3. **Pronto!** Agora a cada `git push`, o deploy é automático! 🎉

### Monitorar deploys
- Vá em: `Repositório → Actions` no GitHub
- Veja os logs de cada deploy em tempo real

---

## 🔔 Webhook Listener (Deploy via HTTP)

Se não quiser usar GitHub Actions, pode usar webhook:

```bash
# Na VPS, ativar o webhook listener
ssh root@72.61.62.17
cd /root/central-de-app
./webhook-listener.sh &

# Ou configurar como serviço (recomendado)
sudo systemctl start webhook-deploy.service
```

**Para deployar via webhook:**
```bash
curl http://72.61.62.17:9000/deploy
```

**Configurar no GitHub:**
1. `Repositório → Settings → Webhooks`
2. Add webhook: `http://72.61.62.17:9000/deploy`
3. Content type: `application/json`
4. Events: `Just the push event`

### 3. Verificar se está rodando

```bash
# Status dos containers
docker-compose ps

# Teste local
curl http://localhost:8080
```

## 🔧 Configurações

### Mudar a porta

Edite o arquivo `docker-compose.yml`:

```yaml
ports:
  - "3000:80"  # Mudará para porta 3000
```

### Configurar domínio (com reverse proxy)

Se usar Nginx na VPS como reverse proxy:

```nginx
# /etc/nginx/sites-available/central-de-app
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📝 Comandos Úteis

```bash
# Parar containers
docker-compose down

# Ver logs em tempo real
docker-compose logs -f

# Rebuild sem cache
docker-compose build --no-cache

# Restart
docker-compose restart

# Entrar no container
docker-compose exec central-de-app sh

# Remover tudo (containers, images, volumes)
docker-compose down -v --rmi all
```

## 🔄 Atualizar a aplicação

```bash
# 1. Puxar novas mudanças (se usar git)
git pull

# 2. Rebuild e restart
docker-compose up -d --build

# 3. Limpar images antigas (opcional)
docker image prune -f
```

## 🔒 SSL/HTTPS (Certbot)

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx

# Obter certificado
sudo certbot --nginx -d seu-dominio.com

# Auto-renovação (já configurado automaticamente)
sudo certbot renew --dry-run
```

## 🐛 Troubleshooting

### Container não inicia
```bash
docker-compose logs
docker-compose ps
```

### Porta já em uso
```bash
# Ver o que está usando a porta
sudo lsof -i :8080
sudo netstat -tulpn | grep 8080

# Matar o processo ou mudar a porta no docker-compose.yml
```

### Rebuild completo
```bash
docker-compose down
docker system prune -a
docker-compose up -d --build
```

## 📊 Monitoramento

### Ver uso de recursos
```bash
docker stats central-de-app
```

### Ver processos
```bash
docker-compose top
```

## 🎯 Estrutura do Container

- **Build Stage**: Node 20 Alpine (constrói a aplicação)
- **Production Stage**: Nginx Alpine (serve os arquivos estáticos)
- **Tamanho final**: ~25-30MB (muito leve!)
- **Porta exposta**: 80 (internamente) → 8080 (host)

## 🔗 Acesso

Após o deploy, acesse:
- Local: `http://localhost:8080`
- Remoto: `http://72.61.62.17:8080`
- Com domínio: `http://seu-dominio.com`

---

## 🎯 Guia Rápido - Fluxo Completo

### Setup Inicial (execute UMA VEZ)

```bash
# 1. Na sua máquina, faça commit e push do código
git add .
git commit -m "Adicionar configuração Docker"
git push

# 2. Envie os arquivos para a VPS
scp -r . root@72.61.62.17:/root/central-de-app/

# 3. Conecte na VPS e execute o setup
ssh root@72.61.62.17
cd /root/central-de-app
chmod +x setup-vps.sh auto-deploy.sh
./setup-vps.sh
```

### Fluxo de Trabalho Diário

**Opção A: GitHub Actions (Recomendado - Totalmente Automático)**
```bash
# Na sua máquina local
git add .
git commit -m "Suas mudanças"
git push

# Pronto! O GitHub Actions faz deploy automático
# Acompanhe em: github.com/seu-usuario/seu-repo/actions
```

**Opção B: Deploy Manual via SSH**
```bash
# Na sua máquina local
git add .
git commit -m "Suas mudanças"
git push

# Deployar na VPS
ssh root@72.61.62.17 'cd /root/central-de-app && ./auto-deploy.sh'
```

**Opção C: Webhook**
```bash
# Após git push
curl http://72.61.62.17:9000/deploy
```

### Verificar se está funcionando

```bash
# Status dos containers
ssh root@72.61.62.17 'docker-compose ps'

# Ver logs
ssh root@72.61.62.17 'cd /root/central-de-app && docker-compose logs --tail=50'

# Testar acesso
curl http://72.61.62.17:8080
```

---

## 📁 Estrutura dos Scripts

- **setup-vps.sh** - Setup inicial da VPS (executar 1x)
- **auto-deploy.sh** - Script de deploy (git pull + docker rebuild)
- **webhook-listener.sh** - Listener HTTP para deploy via webhook
- **.github/workflows/deploy.yml** - GitHub Actions para CI/CD
- **Dockerfile** - Imagem Docker multi-stage
- **docker-compose.yml** - Orquestração
- **nginx.conf** - Configuração Nginx
