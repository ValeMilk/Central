# Script de Setup Inicial - Windows PowerShell
# Este script envia os arquivos para a VPS e executa o setup

Write-Host "🚀 Setup Inicial - Central de Sistemas" -ForegroundColor Green
Write-Host ""

$VPS_HOST = "root@72.61.62.17"
$VPS_PATH = "/root/central-de-app"

# 1. Verificar se tem Git configurado
Write-Host "📋 Verificando Git..." -ForegroundColor Blue
$gitRemote = git remote get-url origin 2>$null
if (-not $gitRemote) {
    Write-Host "⚠️  Git remote não configurado!" -ForegroundColor Yellow
    $repoUrl = Read-Host "Digite a URL do repositório Git (ou deixe em branco para pular)"
    if ($repoUrl) {
        git remote add origin $repoUrl
        Write-Host "✅ Git remote adicionado" -ForegroundColor Green
    }
}

# 2. Testar conexão SSH
Write-Host ""
Write-Host "🔌 Testando conexão SSH com VPS..." -ForegroundColor Blue
$sshTest = ssh -o ConnectTimeout=5 $VPS_HOST "echo 'OK'" 2>$null
if ($sshTest -eq "OK") {
    Write-Host "✅ Conexão SSH OK" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao conectar via SSH" -ForegroundColor Red
    Write-Host "Verifique se você tem acesso: ssh $VPS_HOST" -ForegroundColor Yellow
    exit 1
}

# 3. Criar diretório na VPS
Write-Host ""
Write-Host "📁 Criando diretório na VPS..." -ForegroundColor Blue
ssh $VPS_HOST "mkdir -p $VPS_PATH"
Write-Host "✅ Diretório criado" -ForegroundColor Green

# 4. Enviar arquivos via SCP
Write-Host ""
Write-Host "📤 Enviando arquivos para VPS..." -ForegroundColor Blue
Write-Host "(Isso pode demorar alguns minutos...)" -ForegroundColor Yellow

# Usar scp recursivo
scp -r `
    -o "ExcludeFrom=.gitignore" `
    . `
    "${VPS_HOST}:${VPS_PATH}/"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Arquivos enviados com sucesso" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao enviar arquivos" -ForegroundColor Red
    exit 1
}

# 5. Dar permissões de execução
Write-Host ""
Write-Host "🔐 Configurando permissões..." -ForegroundColor Blue
ssh $VPS_HOST "cd $VPS_PATH && chmod +x *.sh"
Write-Host "✅ Permissões configuradas" -ForegroundColor Green

# 6. Perguntar se quer executar o setup agora
Write-Host ""
$runSetup = Read-Host "Deseja executar o setup automático na VPS agora? (s/n)"
if ($runSetup -eq "s" -or $runSetup -eq "S") {
    Write-Host ""
    Write-Host "🔧 Executando setup na VPS..." -ForegroundColor Blue
    Write-Host "(Isso vai instalar Docker, clonar o repo e fazer o primeiro deploy)" -ForegroundColor Yellow
    Write-Host ""
    
    ssh -t $VPS_HOST "cd $VPS_PATH && ./setup-vps.sh"
    
    Write-Host ""
    Write-Host "✅ Setup concluído!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Acesse a aplicação em: http://72.61.62.17:8080" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "⏭️  Setup manual:" -ForegroundColor Yellow
    Write-Host "   1. Conecte na VPS: ssh $VPS_HOST" -ForegroundColor White
    Write-Host "   2. Entre no diretório: cd $VPS_PATH" -ForegroundColor White
    Write-Host "   3. Execute o setup: ./setup-vps.sh" -ForegroundColor White
}

Write-Host ""
Write-Host "📚 Próximos passos:" -ForegroundColor Blue
Write-Host "   - Para deploy rápido: .\quick-deploy.ps1 'mensagem'" -ForegroundColor White
Write-Host "   - Ver documentação: cat DEPLOY-QUICK.md" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Tudo pronto!" -ForegroundColor Green
