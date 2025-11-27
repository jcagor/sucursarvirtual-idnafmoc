const { app, BrowserWindow, ipcMain, Notification, screen } = require('electron');
const path = require('path');
const http = require('http');
const https = require('https');

let mainWindow;
let notificationWindows = [];

const isDev = !app.isPackaged;
const APP_URL = isDev
  ? 'http://localhost:3000'
  : 'https://www.sucursalcomfandi.com';

// Configurar appUserModelId y nombre de app para notificaciones en Windows
if (process.platform === 'win32') {
  app.setAppUserModelId('com.comfandi.sucursal-kioscos');
}
app.setName('Sucursal Comfandi Kioscos');

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#0b0b0b',
    icon: path.join(__dirname, '../assets/icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: !isDev, // desactiva solo en desarrollo
    },
  });

  mainWindow.maximize();
  mainWindow.setMenu(null);

  // Si falla la carga de la web en cualquier momento, mostrar el fallback
  mainWindow.webContents.on('did-fail-load', () => {
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
  });

  loadContent();

  // Iniciar reintentos automáticos de conexión cada 30 segundos
  startAutoRetry();
}

function loadContent() {
  const client = isDev ? http : https;

  client
    .get(APP_URL, (res) => {
      if (res.statusCode < 500) {
        mainWindow.loadURL(APP_URL);
      } else {
        mainWindow.loadFile(path.join(__dirname, 'index.html'));
      }
    })
    .on('error', () => {
      mainWindow.loadFile(path.join(__dirname, 'index.html'));
    });
}

// Sistema de reintentos automáticos
let autoRetryInterval = null;
let retryAttempts = 0;
const MAX_RETRIES = 3;
const RETRY_INTERVAL = 10000; // 10 segundos

function startAutoRetry() {
  if (autoRetryInterval) {
    clearInterval(autoRetryInterval);
  }

  autoRetryInterval = setInterval(async () => {
    // Solo reintentar si estamos en la página de fallback
    const currentURL = mainWindow.webContents.getURL();
    if (currentURL.includes('index.html')) {
      console.log(`[AUTO-RETRY] Intento ${retryAttempts + 1}/${MAX_RETRIES}`);

      const isOnline = await checkConnection();
      if (isOnline) {
        console.log('[AUTO-RETRY] Conexión recuperada');
        retryAttempts = 0;
        loadContent();

        // Mostrar notificación de reconexión
        showCustomNotification(
          'Conexión restablecida',
          'La aplicación ha recuperado la conexión a internet.'
        );
      } else {
        retryAttempts++;
        if (retryAttempts >= MAX_RETRIES) {
          console.log('[AUTO-RETRY] Máximo de reintentos alcanzado, esperando próximo ciclo');
          retryAttempts = 0;
        }
      }
    }
  }, RETRY_INTERVAL);
}

async function checkConnection() {
  const client = isDev ? http : https;
  return new Promise((resolve) => {
    const req = client.request(APP_URL, { method: 'HEAD' }, (res) =>
      resolve(res.statusCode < 500)
    );
    req.on('error', () => resolve(false));
    req.setTimeout(5000, () => {
      req.destroy();
      resolve(false);
    });
    req.end();
  });
}

ipcMain.handle('openOnline', async () => loadContent());
ipcMain.handle('checkOnline', async () => {
  const client = isDev ? http : https;

  return new Promise((resolve) => {
    const req = client.request(APP_URL, { method: 'HEAD' }, (res) =>
      resolve(res.statusCode < 500)
    );
    req.on('error', () => resolve(false));
    req.end();
  });
});

// Handler para obtener nivel de batería - eliminado porque getBatteryLevel no está disponible
// Se usará la Battery API del navegador directamente desde el renderer

// Handler para mostrar notificación personalizada HTML
ipcMain.handle('showNotification', async (event, { title, body }) => {
  try {
    console.log('[DEBUG] showNotification:', title, body);
    showCustomNotification(title, body);
    return true;
  } catch (e) {
    console.error('[DEBUG] showNotification error:', e);
    return false;
  }
});

// Función para crear notificación personalizada
function showCustomNotification(title, message) {
  // Si ya hay una notificación, ciérrala antes de crear otra
  if (notificationWindows.length > 0) {
    const win = notificationWindows[0];
    if (!win.isDestroyed()) {
      win.close();
    }
    notificationWindows = [];
  }

  const primaryDisplay = screen.getPrimaryDisplay();
  const { width } = primaryDisplay.workAreaSize;
  const notificationHeight = 90;
  const rightMargin = 20;
  const topMargin = 20;

  const notificationWindow = new BrowserWindow({
    width: 380,
    height: notificationHeight,
    x: width - 380 - rightMargin,
    y: topMargin,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    movable: false,
    focusable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  notificationWindow.setIgnoreMouseEvents(false);
  notificationWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

  const encodedTitle = encodeURIComponent(title);
  const encodedMessage = encodeURIComponent(message);
  notificationWindow.loadFile(
    path.join(__dirname, 'notification.html'),
    { query: { title: encodedTitle, message: encodedMessage } }
  );

  notificationWindows.push(notificationWindow);

  notificationWindow.on('closed', () => {
    const index = notificationWindows.indexOf(notificationWindow);
    if (index > -1) {
      notificationWindows.splice(index, 1);
    }
  });
}

// Reposicionar notificaciones cuando se cierra una
function repositionNotifications() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width } = primaryDisplay.workAreaSize;
  const notificationHeight = 90;
  const spacing = 10;
  const rightMargin = 20;
  const topMargin = 20;

  notificationWindows.forEach((win, index) => {
    if (!win.isDestroyed()) {
      const y = topMargin + index * (notificationHeight + spacing);
      win.setBounds({ x: width - 380 - rightMargin, y, width: 380, height: notificationHeight });
    }
  });
}

// Handler para cerrar notificación
ipcMain.handle('closeNotification', async (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) {
    closeNotificationWindow(win);
  }
});

// Handler para enfocar ventana principal
ipcMain.handle('focusMainWindow', async () => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();
    mainWindow.show();
  }
});

function closeNotificationWindow(win) {
  if (!win.isDestroyed()) {
    win.close();
  }
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
