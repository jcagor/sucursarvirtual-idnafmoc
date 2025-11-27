// src/preload.js
(() => {
    // Objeto congelado para evitar modificaciones desde la web
    const marker = Object.freeze({
        isKiosk: true,
        // puedes agregar version/build si quieres
    });

    // 1) Exponer por contextBridge (visible como window.kiosk)
    try {
        const { contextBridge, ipcRenderer } = require('electron');

        // Marcador de kiosco
        contextBridge.exposeInMainWorld('kiosk', marker);

        // Funciones de conexión para el fallback
        contextBridge.exposeInMainWorld('desktop', {
            checkOnline: () => ipcRenderer.invoke('checkOnline'),
            openOnline: () => ipcRenderer.invoke('openOnline'),
            showNotification: (title, body) => ipcRenderer.invoke('showNotification', { title, body }),
        });

        // APIs para ventanas de notificación
        contextBridge.exposeInMainWorld('electronAPI', {
            closeNotification: () => ipcRenderer.invoke('closeNotification'),
            focusMainWindow: () => ipcRenderer.invoke('focusMainWindow')
        });
    } catch { }

    // 2) Doble seguro: define también una propiedad no configurable/oculta
    try {
        Object.defineProperty(window, '__SVP_KIOSK__', {
            value: true,
            writable: false,
            configurable: false,
            enumerable: false,
        });
    } catch { }
})();
