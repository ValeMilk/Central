# 🚀 Deploy Automático - Guia Rápido

## ⚡ Setup Inicial (Execute 1 vez)

### 1. Prepare seu repositório Git
```bash
# Inicialize o Git (se ainda não tiver)
git init
git add .
git commit -m "Initial commit"
git branch -M main

# Adicione o remote (GitHub, GitLab, etc)
git remote add origin https://github.com/seu-usuario/central-de-app.git
git push -u origin main
```

### 2. Configure a VPS
```bash
# Envie os arquivos para a VPS
scp -r . root@72.61.62.17:/root/central-de-app/

# Conecte na VPS
ssh root@72.61.62.17

# Execute o setup (isso instala tudo automaticamente)
cd /root/central-de-app
chmod +x setup-vps.sh auto-deploy.sh
./setup-vps.sh
```

Durante o setup, informe a URL do seu repositório Git quando solicitado.

---

## 🔄 Deploy Automático

Escolha o método que preferir:

### 🎯 Método 1: Quick Deploy (Mais Rápido)

**Windows (PowerShell):**
```powershell
.\quick-deploy.ps1 "Mensagem do commit"
```

**Linux/Mac:**
```bash
./quick-deploy.sh "Mensagem do commit"
```

### 🤖 Método 2: GitHub Actions (100% Automático)

1. Configure a chave SSH no GitHub:
   ```bash
   ssh root@72.61.62.17
   ssh-keygen -t ed25519 -C "deploy-key"
   cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys
   cat ~/.ssh/id_ed25519  # Copie esta chave
   ```

2. No GitHub: `Settings → Secrets → New secret`
   - Nome: `SSH_PRIVATE_KEY`
   - Cole a chave privada

3. Pronto! Agora é só:
   ```bash
   git add .
   git commit -m "Mudanças"
   git push
   ```
   
   O deploy acontece automaticamente! 🎉

### 🔔 Método 3: Webhook HTTP

```bash
# Ative o webhook na VPS
ssh root@72.61.62.17
sudo systemctl start webhook-deploy.service

# Para deployar de qualquer lugar:
curl http://72.61.62.17:9000/deploy
```

### 📋 Método 4: Manual via SSH

```bash
ssh root@72.61.62.17 'cd /root/central-de-app && ./auto-deploy.sh'
```

---

## 🌐 Acessar Aplicação

Após o deploy:
- **URL:** http://72.61.62.17:8080
- **Aplicações dentro:**
  - Sistema CIS: http://72.61.62.17:8886/
  - ValeFish: http://72.61.62.17:8888/
  - Mapas: http://72.61.62.17:3000/

---

## 📊 Comandos Úteis

```bash
# Ver status dos containers
ssh root@72.61.62.17 'docker-compose ps'

# Ver logs em tempo real
ssh root@72.61.62.17 'cd /root/central-de-app && docker-compose logs -f'

# Restart da aplicação
ssh root@72.61.62.17 'cd /root/central-de-app && docker-compose restart'

# Parar a aplicação
ssh root@72.61.62.17 'cd /root/central-de-app && docker-compose down'

# Rebuild completo
ssh root@72.61.62.17 'cd /root/central-de-app && docker-compose up -d --build'
```

---

## 📁 Arquivos Criados

- **setup-vps.sh** - Setup inicial automático (executar 1x na VPS)
- **auto-deploy.sh** - Script de deploy (git pull + docker rebuild)
- **quick-deploy.sh** / **.ps1** - Deploy rápido com um comando
- **webhook-listener.sh** - Webhook HTTP para deploy
- **.github/workflows/deploy.yml** - GitHub Actions CI/CD
- **Dockerfile** - Container Docker otimizado
- **docker-compose.yml** - Orquestração Docker
- **nginx.conf** - Servidor web Nginx

---

## 🐛 Problemas Comuns

### Erro: "Permission denied (publickey)"
```bash
# Adicione sua chave SSH à VPS
ssh-copy-id root@72.61.62.17
```

### Container não inicia
```bash
# Veja os logs
ssh root@72.61.62.17 'cd /root/central-de-app && docker-compose logs'
```

### Porta 8080 já em uso
Edite `docker-compose.yml` e mude a porta:
```yaml
ports:
  - "3000:80"  # Mudará para porta 3000
```

### GitHub Actions falha
- Verifique se a secret `SSH_PRIVATE_KEY` está configurada corretamente
- Veja os logs em: `GitHub → Actions → Workflow run`

---

## 📚 Documentação Completa

Para mais detalhes, veja o arquivo [DEPLOY.md](DEPLOY.md)

---

## ✅ Checklist

- [ ] Repositório Git criado e configurado
- [ ] Arquivos enviados para a VPS
- [ ] `setup-vps.sh` executado na VPS
- [ ] Primeiro deploy realizado com sucesso
- [ ] Aplicação acessível em http://72.61.62.17:8080
- [ ] (Opcional) GitHub Actions configurado
- [ ] (Opcional) Webhook ativado

**Pronto para usar! 🎉**
