This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Google Analytics Integration

Este proyecto incluye una integración completa de Google Analytics 4 (GA4) para el seguimiento de eventos y navegación de usuarios.

### Configuración

#### Variables de Entorno

Asegúrate de configurar la siguiente variable de entorno:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Reemplaza `G-XXXXXXXXXX` con tu ID de seguimiento real de Google Analytics 4.

#### Configuración de CSP

El proyecto incluye la configuración necesaria en `next.config.js` para permitir las conexiones a Google Analytics:

```javascript
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com;
img-src 'self' data: https://www.google-analytics.com;
connect-src ${extractUrlsFromEnv()} https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net;
```

### Arquitectura de la Integración

#### 1. AnalyticsProvider (`src/presentation/provider/GoogleAnalytics/AnalyticsProvider.tsx`)

Este componente inicializa Google Analytics en la aplicación:

- Carga el script de Google Tag Manager
- Configura el ID de seguimiento
- Se ejecuta después de que la página sea interactiva

#### 2. Analytics Component (`src/presentation/components/atoms/common/analytics/Analytics.tsx`)

Componente que rastrea automáticamente las navegaciones de página:

- Utiliza `usePathname` y `useSearchParams` de Next.js
- Evita llamadas duplicadas con un sistema de control
- Llama a la función `pageview` automáticamente

#### 3. Funciones de Seguimiento (`src/lib/utils/GoogleAnalytics/gtag.ts`)

##### `pageview(url: string)`

Rastrea las vistas de página automáticamente:

```typescript
pageview("/my-account"); // Rastrea la navegación a Mi Cuenta
```

**Parámetros:**

- `url`: La URL de la página a rastrear

**Comportamiento:**

- Limpia la URL removiendo parámetros de consulta
- Mapea la URL a un nombre de pantalla legible usando `screenMap`
- Envía un evento `config` a GA4 con `page_path` y `page_title`

##### `trackEvent(options)`

Rastrea eventos personalizados de interacción del usuario:

```typescript
trackEvent({
  action: "button_click",
  category: "user_interaction",
  label: "edit_account_clicked",
  value: 1,
  customParameters: {
    user_id: "123456789",
    user_type: "CC",
    action_type: "edit_account",
    timestamp: new Date().toISOString(),
  },
});
```

**Parámetros requeridos:**

- `action`: Nombre de la acción (ej: "button_click", "form_submit")
- `category`: Categoría del evento (ej: "user_interaction", "form_interaction")
- `label`: Etiqueta descriptiva del evento
- `value`: Valor numérico (generalmente 1 para conteos)

**Parámetros opcionales:**

- `customParameters`: Objeto con parámetros personalizados adicionales

### Sistema de Logging Condicional

El proyecto implementa un sistema de logging inteligente que solo muestra información de debugging en desarrollo:

#### Funciones Helper de Logging

Cada archivo de Google Analytics incluye funciones helper para logging condicional:

```typescript
// Función helper para logs condicionales
const debugLog = (...args: any[]) => {
  if (process.env.NODE_ENV === "development") {
    console.log(...args);
  }
};

const debugWarn = (...args: any[]) => {
  if (process.env.NODE_ENV === "development") {
    console.warn(...args);
  }
};
```

#### Comportamiento del Logging

- **Desarrollo (`npm run dev`)**: Todos los logs de debugging son visibles
- **Producción (`npm run build`)**: Los logs se eliminan completamente
- **Rendimiento**: No hay overhead en producción
- **Seguridad**: Información sensible no se expone en producción

#### Logs Disponibles

**En `gtag.ts`:**

- Intentos de tracking de pageview
- Estado del ID de Google Analytics
- Disponibilidad de la función gtag
- Detalles de configuración de pageview
- Advertencias de configuración faltante

**En `Analytics.tsx`:**

- Estado del componente Analytics
- Cambios de pathname y searchParams
- URLs finales procesadas
- Estado de tracking

**En `AnalyticsProvider.tsx`:**

- Estado de inicialización de Google Analytics
- Carga exitosa/fallida de scripts
- ID de tracking configurado

### Mapeo de Pantallas

El archivo `src/lib/utils/GoogleAnalytics/screenMap.ts` contiene el mapeo de URLs a nombres de pantalla legibles:

```typescript
export const screenMap: Record<string, string> = {
  "/": "Inicio",
  "/my-account": "Mi Cuenta",
  "/certificates": "Certificados",
  "/subsidies": "Subsidios",
  // ... más rutas
};
```

### Ejemplos de Uso

#### 1. Seguimiento de Clics en Botones

```typescript
import { trackEvent } from "lib/utils/GoogleAnalytics/gtag";

// Función helper para logs condicionales
const debugLog = (...args: any[]) => {
  if (process.env.NODE_ENV === "development") {
    console.log(...args);
  }
};

const handleButtonClick = () => {
  debugLog("[GA] Disparando evento button_click");

  trackEvent({
    action: "button_click",
    category: "user_interaction",
    label: "edit_account_clicked",
    value: 1,
    customParameters: {
      user_id: identification_number,
      user_type: identification_type,
      action_type: "edit_account",
      timestamp: new Date().toISOString(),
    },
  });

  debugLog("[GA] Evento button_click enviado exitosamente");

  // Lógica del botón
  window.open(process.env.NEXT_PUBLIC_MODIFY_DATA, "_blank");
};
```

#### 2. Seguimiento de Envío de Formularios

```typescript
const handleFormSubmit = (formData: any) => {
  debugLog("[GA] Disparando evento form_submit");

  trackEvent({
    action: "form_submit",
    category: "form_interaction",
    label: "user_registration",
    value: 1,
    customParameters: {
      form_name: "registration",
      user_email: formData.email,
      registration_source: "web",
    },
  });

  debugLog("[GA] Evento form_submit enviado exitosamente");

  // Lógica de envío del formulario
};
```

#### 3. Seguimiento de Errores

```typescript
const handleError = (error: Error) => {
  debugLog("[GA] Disparando evento error_occurred");

  trackEvent({
    action: "error_occurred",
    category: "error_tracking",
    label: "api_error",
    value: 1,
    customParameters: {
      error_message: error.message,
      error_stack: error.stack,
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
    },
  });

  debugLog("[GA] Evento error_occurred enviado exitosamente");
};
```

### Mejores Prácticas

#### 1. Nomenclatura de Eventos

- **Action**: Usa verbos descriptivos (ej: "click", "submit", "download")
- **Category**: Agrupa eventos relacionados (ej: "user_interaction", "form_interaction")
- **Label**: Proporciona contexto específico (ej: "edit_account_button", "registration_form")

#### 2. Parámetros Personalizados

- Incluye información relevante del usuario cuando esté disponible
- Usa timestamps para eventos importantes
- Evita información sensible (contraseñas, tokens, etc.)
- Mantén consistencia en los nombres de parámetros

#### 3. Logging y Debugging

- **Siempre usa `debugLog` en lugar de `console.log`** para logs de Google Analytics
- Los logs solo aparecen en desarrollo, no en producción
- Incluye contexto útil en los logs para debugging
- Usa prefijos consistentes como `[GA]` o `[GTAG]`

#### 4. Rendimiento

- Los eventos se envían de forma asíncrona
- No bloquean la interfaz de usuario
- Los logs condicionales no afectan el rendimiento en producción

### Debugging

#### Logs de Desarrollo

Para debugging, todos los eventos incluyen logs de consola **solo en desarrollo**:

```javascript
// Solo visible en desarrollo (npm run dev)
debugLog("[GTAG] Attempting to track pageview:", url);
debugLog("[GA TEST] Disparando evento test_event en editAccount");
debugLog("[Analytics] Component mounted/updated");
```

#### Verificación de Eventos

1. **Desarrollo**: Revisa la consola del navegador para ver logs detallados
2. **Producción**: Usa Google Analytics Real-Time para verificar eventos
3. **Network Tab**: Verifica que las peticiones a Google Analytics se envíen correctamente

#### Troubleshooting

**Problema**: Los eventos no aparecen en Google Analytics
**Solución**:

- Verifica que `NEXT_PUBLIC_GA_ID` esté configurado correctamente
- Revisa los logs de desarrollo para errores
- Confirma que los dominios estén autorizados en GA4

**Problema**: Logs aparecen en producción
**Solución**:

- Asegúrate de usar `debugLog` en lugar de `console.log`
- Verifica que `process.env.NODE_ENV` esté configurado correctamente

### Configuración en Producción

1. Asegúrate de que `NEXT_PUBLIC_GA_ID` esté configurado correctamente
2. Verifica que los dominios estén autorizados en Google Analytics
3. Revisa los logs de consola en desarrollo para confirmar que los eventos se envían
4. Utiliza Google Analytics Real-Time para verificar eventos en tiempo real
5. Los logs de debugging se eliminan automáticamente en el build de producción

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
