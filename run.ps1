$URL = "http://localhost"
$PORT = 8000


Start-Process "npm" "run hotfix"
Start-Process "npm" "run build" -wait -NoNewWindow
Set-Location ./server
START-Process chrome.exe "${URL}:${PORT}/#/main" -WindowStyle Maximized
Start-Process npm start -wait
Set-Location ../


