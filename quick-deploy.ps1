# Quick Deploy para Windows PowerShell
# Uso: .\quick-deploy.ps1 "mensagem do commit"

param(
    [Parameter(Mandatory=$true)]
    [string]$CommitMsg
)

Write-Host "🚀 Quick Deploy Iniciado..." -ForegroundColor Green

# 1. Git add
Write-Host "📝 Adicionando arquivos..." -ForegroundColor Blue
git add .

# 2. Git commit
Write-Host "💾 Commitando: $CommitMsg" -ForegroundColor Blue
git commit -m $CommitMsg

# 3. Git push
Write-Host "📤 Enviando para repositório..." -ForegroundColor Blue
git push

# 4. Deploy na VPS
Write-Host "🔄 Deployando na VPS..." -ForegroundColor Blue
ssh root@72.61.62.17 "cd /root/central-de-app && ./auto-deploy.sh"

Write-Host "✅ Deploy concluído!" -ForegroundColor Green
Write-Host "🌐 Acesse: http://72.61.62.17:8080" -ForegroundColor Cyan
