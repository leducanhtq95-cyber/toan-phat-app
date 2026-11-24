const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

const TARGET_URL = 'https://toanphat.ap.vn';

const ALLOWED_INTERNAL_HOSTS = [
  'toanphat.ap.vn',
  'script.google.com',
  'script.googleusercontent.com',
  'accounts.google.com',
  'docs.google.com',
  'drive.google.com',
];

function isInternalUrl(urlString) {
  try {
    const parsed = new URL(urlString);
    return ALLOWED_INTERNAL_HOSTS.some(
      (host) => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`)
    );
  } catch {
    return false;
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 960,
    minHeight: 640,
    title: 'Toàn Phát',
    autoHideMenuBar: true,
    backgroundColor: '#FFFFFF',
    icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  win.loadURL(TARGET_URL);

  win.webContents.on('did-fail-load', (_event, errorCode, _desc, validatedURL, isMainFrame) => {
    if (isMainFrame && errorCode !== -3) {
      win.loadFile(path.join(__dirname, 'offline.html'), {
        query: { url: validatedURL || TARGET_URL },
      });
    }
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (isInternalUrl(url)) {
      return {
        action: 'allow',
        overrideBrowserWindowOptions: {
          width: 1120,
          height: 760,
          autoHideMenuBar: true,
          icon: path.join(__dirname, 'build', 'icon.png'),
        },
      };
    }
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
