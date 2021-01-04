// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const SANTA_PASSWORD = 'santapass';

// TODO: Maybe get these from an API?
const products = [
  {
    name: 'Candy Cane',
    price: 1.99,
  },
  {
    name: 'Candy Cane (10)',
    price: 15.99,
  },
  {
    name: 'Mistletoe',
    price: 0.99,
  },
  {
    name: 'Eggnog',
    price: 3.99,
  },
  {
    name: 'Eggnog (Non-dairy)',
    price: 2.50,
  },
  {
    name: 'Gingerbread Cookies',
    price: 1.99,
  },
  {
    name: 'Gingerbread House',
    price: 10.99,
  },
  {
    name: 'Gingerbread People',
    price: 5.99,
  },
  {
    name: 'Ornaments',
    price: 1.99,
  },
  {
    name: 'Ornaments (10)',
    price: 9.95,
  },
  {
    name: 'Ornaments (100)',
    price: 89.95,
  },
  {
    name: 'Ornaments (1000)',
    price: 650.00,
  },
  {
    name: 'Stocking',
    price: 1.99,
  },
  {
    name: 'Hot Cocoa',
    price: 0.50,
  },
  {
    name: 'Gift Wrapping',
    price: 0.10,
  },
];

function createWindow(file) {
  // Create the browser window.
  const w = new BrowserWindow({
    width: 1024,
    height: 768,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  w.setMenu(null);
  w.loadFile(file);

  // Open the DevTools.
  // w.webContents.openDevTools();

  return w;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow('index.html');

  app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if(BrowserWindow.getAllWindows().length === 0) {
      createWindow('index.html');
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('products', (/* event, ...args */) => {
  return products;
});

ipcMain.handle('tax', (/* event, ...args */) => {
  return {
    rate: 0.13,
  };
});

ipcMain.handle('unlock', (event, password) => {
  return (password === SANTA_PASSWORD);
});

const LEVELS = [1, 1, 1, 2, 1, 2, 2, 1, 2, 2, 3, 3, 3, 2, 3, 3, 4, 4, 4, 4, 4, 3, 2, 1, 1, 1, 2, 1, 1];
let levelsPosition = -1;
ipcMain.handle('checkNetwork', () => {
  levelsPosition = (levelsPosition + 1) % LEVELS.length;

  return LEVELS[levelsPosition];
});
