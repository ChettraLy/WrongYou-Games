# WrongYou Games - Development Server Launcher
# Run with: .\start-server.ps1

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  WrongYou Games - Development Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Starting server on http://localhost:5000" -ForegroundColor Green
Write-Host ""
Write-Host "Opening browser..." -ForegroundColor Yellow
Write-Host ""

# Start the Node.js server in the background
$serverJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    node server.js
}

# Wait a moment for server to start
Start-Sleep -Seconds 2

# Open browser
Start-Process "http://localhost:5000"

Write-Host "Server is running!" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Keep the script running and show server output
Receive-Job -Job $serverJob -Wait

# Cleanup
Remove-Job -Job $serverJob

