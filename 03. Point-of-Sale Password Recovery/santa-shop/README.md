# Download the santa-shop.exe
# Copy it in a Windows VM
# Install santa-shop.exe
# Copy install directory to host machine
# Find resources/app.asar
# Extract app.asar
```thedead@dellian:~/Desktop/repos/KringleCon3/03. Point-of-Sale Password Recovery/santa-shop/asar application$ asar extract app.asar extracted_app```
# Find the SANTA_PASSWORD const in main.js
thedead@dellian:~/Desktop/repos/KringleCon3/03. Point-of-Sale Password Recovery/santa-shop/asar application$ grep -i password extracted_app/main.js 
const SANTA_PASSWORD = 'santapass';
ipcMain.handle('unlock', (event, password) => {
  return (password === SANTA_PASSWORD);
