# Proyecto SVP Kioscos

## Descripción

Este proyecto es una aplicación de kioscos desarrollada con **Electron** que soporta funcionalidades offline y conexión web. Se implementaron notificaciones personalizadas, reintentos automáticos de conexión, y un sistema de temporizador sincronizado con la barra de progreso.

---

## Funcionalidades implementadas

### 1. **Notificaciones personalizadas**

- Ventanas HTML independientes con diseño moderno.
- Barra de progreso sincronizada con el temporizador.
- Pausa automática al pasar el cursor sobre la notificación.
- Reanuda el temporizador y la barra al quitar el cursor.

### 2. **Reintentos automáticos de conexión**

- Reintentos cada 10 segundos.
- Máximo de 3 intentos por ciclo.
- Notificación automática al recuperar conexión.

### 3. **Consolidación de preload**

- Un único archivo `preload.js` para exponer APIs seguras al renderer.

---

## Instalación

### Requisitos

- Node.js v16 o superior
- npm o yarn
- Sistema operativo compatible (Windows, macOS, Linux)

### Comandos de instalación

#### 1. **Instalar dependencias**

```bash
npm install
```

#### 2. **Ejecutar en modo desarrollo**

```bash
npm start
```

#### 3. **Empaquetar la aplicación**

```bash
npm run package
```

#### 4. **Crear instaladores**

- **Windows**:
  ```bash
  npm run dist:win
  ```
- **macOS**:
  ```bash
  npm run dist:mac
  ```
- **Linux**:
  ```bash
  npm run dist:linux
  ```

---

## Pendientes

1. **Implementar Tailwind CSS**

   - Para mejorar el diseño y facilitar la personalización.

2. **Usar un framework como compilador**

   - Evaluar alternativas como Vite o Parcel.
   - No se recomienda Next.js debido a su enfoque en aplicaciones web y no offline.

3. **Migrar a React**

   - React permitirá estructurar mejor la aplicación, separando componentes y reutilizando código.
   - Facilitará la integración con Tailwind CSS y la implementación de nuevas funcionalidades.

4. **Evaluar frameworks adicionales**
   - **Vite**: Ideal para proyectos modernos con soporte rápido y eficiente para React.
   - **Parcel**: Ofrece configuración mínima y es adecuado para aplicaciones pequeñas y medianas.
   - **No usar Next.js**: Aunque es poderoso, está diseñado principalmente para aplicaciones web con SSR (Server-Side Rendering), lo cual no es necesario en un entorno de kioscos offline. Además, Next.js puede ser demasiado robusto y pesado para las necesidades específicas de un kiosco, desaprovechando sus funcionalidades avanzadas.

---

## Diagrama: Arquitectura de Electron

```plaintext
┌─────────────────────────────────────────────────┐
│  VENTANA NATIVA DEL SO                          │
│  (Win32 API / Cocoa / X11)                      │
│  ┌───────────────────────────────────────────┐  │
│  │ Barra de título (customizable)           │  │
│  ├───────────────────────────────────────────┤  │
│  │                                           │  │
│  │  ┌─────────────────────────────────────┐ │  │
│  │  │ CHROMIUM EMBEBIDO                   │ │  │
│  │  │                                     │ │  │
│  │  │  Tu contenido web aquí             │ │  │
│  │  │  (React, HTML, CSS, JS)            │ │  │
│  │  │                                     │ │  │
│  │  │  + window.api (contextBridge)      │ │  │
│  │  │       ↓ IPC ↓                      │ │  │
│  │  └─────────────────────────────────────┘ │  │
│  │                                           │  │
│  └───────────────────────────────────────────┘  │
│                  ↕ IPC                          │
│  ┌───────────────────────────────────────────┐  │
│  │ NODE.JS (Backend)                        │  │
│  │  - Acceso a archivos                     │  │
│  │  - Bases de datos                        │  │
│  │  - Procesos del sistema                  │  │
│  │  - APIs nativas del SO                   │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### Explicación del flujo

1. **Ventana nativa del SO**: Electron utiliza las APIs nativas del sistema operativo (Win32 API en Windows, Cocoa en macOS, X11 en Linux) para crear ventanas que contienen el contenido de la aplicación.
2. **Chromium embebido**: Dentro de la ventana, Electron utiliza Chromium para renderizar contenido web. Aquí se cargan los archivos HTML, CSS y JavaScript, y se pueden usar frameworks como React.
3. **ContextBridge**: Permite exponer funciones del backend (Node.js) al frontend (Chromium) de forma segura. Esto se logra a través de `window.api`.
4. **IPC (Inter-Process Communication)**: Es el mecanismo que permite la comunicación entre el proceso principal (Node.js) y el proceso renderer (Chromium). Se utiliza para enviar eventos y datos entre ambos.
5. **Node.js (Backend)**: Proporciona acceso a funcionalidades del sistema operativo, como manejo de archivos, bases de datos y otros procesos nativos.

---

## Explicaciones

### ¿Qué es IPC?

**Inter-Process Communication (IPC)** es el mecanismo que Electron utiliza para la comunicación entre el proceso principal y los procesos renderer. Permite enviar mensajes y datos de forma segura.

### ¿Qué es ContextBridge?

**ContextBridge** es una API de Electron que permite exponer funciones y datos del proceso principal al renderer de forma segura, evitando riesgos de seguridad.

### ¿Qué es Chromium?

**Chromium** es el motor de navegador utilizado por Electron para renderizar contenido web. Proporciona compatibilidad con HTML, CSS y JavaScript modernos.

## Créditos

Desarrollado por el equipo de Comfandi para kioscos SVP.
