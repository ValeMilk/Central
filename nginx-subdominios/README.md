# 🌐 Configuração de Subdomínios - Nginx Reverse Proxy

## 📋 Pré-requisitos

1. **DNS configurado** - Certifique-se que os registros DNS estão apontando para o servidor:
   - `central.valemilk.com.br` → `72.61.62.17`
   - `cis.valemilk.com.br` → `72.61.62.17`
   - `valefish.valemilk.com.br` → `72.61.62.17`
   - `mapas.valemilk.com.br` → `72.61.62.17`

2. **Testar DNS** (aguarde 24-48h após configuração):
   ```bash
   nslookup central.valemilk.com.br
   nslookup cis.valemilk.com.br
   nslookup valefish.valemilk.com.br
   nslookup mapas.valemilk.com.br
   ```

## 🚀 Instalação na VPS

### Passo 1: Enviar arquivos para a VPS

```bash
# Na sua máquina local
scp -r nginx-subdominios/ root@72.61.62.17:/root/
```

### Passo 2: Conectar na VPS e executar

```bash
# Conectar na VPS
ssh root@72.61.62.17

# Ir para o diretório
cd /root/nginx-subdominios

# Dar permissão de execução
chmod +x setup-nginx.sh

# Executar o script de configuração
./setup-nginx.sh
```

### Passo 3: Verificar se funcionou

```bash
# Ver status do Nginx
systemctl status nginx

# Testar se os subdomínios respondem
curl http://central.valemilk.com.br
curl http://cis.valemilk.com.br
curl http://valefish.valemilk.com.br
curl http://mapas.valemilk.com.br
```

## 🔒 Configurar HTTPS (SSL) - IMPORTANTE!

Depois que o DNS estiver propagado, configure SSL:

```bash
# Instalar Certbot
apt install certbot python3-certbot-nginx -y

# Obter certificados SSL (gratuito via Let's Encrypt)
certbot --nginx \
  -d central.valemilk.com.br \
  -d cis.valemilk.com.br \
  -d valefish.valemilk.com.br \
  -d mapas.valemilk.com.br

# Testar renovação automática
certbot renew --dry-run
```

Pronto! Agora todos os sites terão HTTPS automaticamente.

## 📊 Monitoramento

```bash
# Ver logs em tempo real
tail -f /var/log/nginx/central.access.log
tail -f /var/log/nginx/cis.access.log
tail -f /var/log/nginx/valefish.access.log
tail -f /var/log/nginx/mapas.access.log

# Ver todos os logs de erro
tail -f /var/log/nginx/*.error.log

# Recarregar Nginx após mudanças
nginx -t && systemctl reload nginx
```

## 🔧 Estrutura

Cada aplicação roda em uma porta diferente:

| Subdomínio | Porta | Aplicação |
|------------|-------|-----------|
| central.valemilk.com.br | 8885 | Central de Sistemas |
| cis.valemilk.com.br | 8886 | Sistema CIS |
| valefish.valemilk.com.br | 8888 | ValeFish |
| mapas.valemilk.com.br | 3000 | Mapas |

O Nginx recebe as requisições HTTP/HTTPS na porta 80/443 e redireciona para a porta correta baseado no subdomínio.

## 🐛 Troubleshooting

### Erro 502 Bad Gateway
```bash
# Verificar se a aplicação está rodando na porta correta
netstat -tulpn | grep 8885
netstat -tulpn | grep 8886
netstat -tulpn | grep 8888
netstat -tulpn | grep 3000

# Verificar logs
tail -f /var/log/nginx/error.log
```

### DNS não resolve
```bash
# Testar DNS
nslookup central.valemilk.com.br
dig central.valemilk.com.br

# Aguarde até 48h para propagação completa
```

### Firewall bloqueando
```bash
# Abrir portas no firewall (se necessário)
ufw allow 80/tcp
ufw allow 443/tcp
ufw reload
```

## 🔄 Atualizar configurações

Se precisar mudar algo:

```bash
# Editar arquivo
nano /etc/nginx/sites-available/central.valemilk.com.br.conf

# Testar configuração
nginx -t

# Recarregar
systemctl reload nginx
```

## ✅ Checklist

- [ ] DNS configurado para todos os subdomínios
- [ ] DNS propagado (teste com nslookup)
- [ ] Arquivos enviados para VPS
- [ ] Script setup-nginx.sh executado
- [ ] Nginx rodando sem erros
- [ ] Subdomínios acessíveis via HTTP
- [ ] SSL configurado (HTTPS)
- [ ] Certificados renovando automaticamente
- [ ] Todas aplicações respondendo corretamente
