# Sucursal-Personas-Readme

Created by: Pastor Emilio Betancourt O
Created time: Jun 10, 2025

# 📌 **README.md - Documentación del Proyecto Sucursal Empresas**

## 🖼 Captura de Pantalla

![image](https://github.com/user-attachments/assets/8b6fc0dd-d00c-4d59-88a0-278b945aa283)
![image](https://github.com/user-attachments/assets/3604a126-1930-463d-9c10-98e9b5e1814b)
![image](https://github.com/user-attachments/assets/73b6b717-d722-40ef-8d9f-f6080f9ccfd2)

## MER

![RANN_MER](https://github.com/user-attachments/assets/94980584-b105-407b-988f-67a070199a67)


## 🏗 Arquitectura del Sistema

### 📌 Diagrama de Arquitectura

![image](https://github.com/user-attachments/assets/e12f3641-5fdd-46c1-9fe8-05e30b39ec37)

## Figma proyectos

### Mypimes
https://www.figma.com/design/4ZPpAUf79YjKKkjgTY9UND/Procesos-MiPyme?node-id=14-43&p=f&t=23BaFHHgKi9dPAx2-0

### MPAC 

https://www.figma.com/design/geptyXM4AYlrjptkkI0E16/MPac?node-id=1-7&p=f&t=ioV7LL0dJzV4TdQJ-0

### 📂 Estructura de Carpetas y Archivo

El sistema está compuesto por tres principales estructuras de código:
```
## Estructura del Proyecto Front

/ Public # Contiene archivos estáticos accesibles públicamente
│── icons/ # Íconos del proyecto
│── favicon.ico # Ícono de la aplicación
│── next.svg, vercel.svg # Archivos SVG usados en la interfaz
│
│── src/ # Carpeta principal con el código fuente de la aplicación
│ │── app/ # Lógica de la aplicación y páginas en Next.js
│ │ │── pages/ # Directorio de páginas
│ │ │ │── company/ # Vista relacionada con empresas
│ │ │ │── persons/ # Vista relacionada con personas
│ │ │ │── api/ # Endpoints de la API (Next.js API routes)
│ │
│ │── domain/ # Lógica de negocio y entidades del dominio (Clean Architecture)
│ │ │── models/ # Definición de modelos de datos
│ │ │── repositories/ # Interfaces y clases para acceder a los datos
│ │ │── usecases/ # Casos de uso con reglas de negocio
│ │
│ │── infrastructure/ # Implementaciones de la capa de dominio
│ │ │── data/ # Lógica de persistencia de datos
│ │ │── ioc/ # Inversión de control (gestión de dependencias)
│ │ │── network/ # Configuración de comunicación con APIs externas
│ │ │── lib/ # Código utilitario y herramientas auxiliares
│ │
│ │── lib/ # Código utilitario y herramientas auxiliares
│ │ │── config/ # Archivos de configuración
│ │ │── interfaces/ # Definición de interfaces
│ │ │── types/ # Definición de tipos TypeScript
│ │ │── utils/ # Utilidades y funciones auxiliares
│ │
│ │── presentation/ # Capa enfocada en la UI
│ │ │── components/ # Componentes reutilizables organizados en Atomic Design
│ │ │ │── atoms/ # Componentes atómicos
│ │ │ │── molecules/ # Componentes moleculares
│ │ │ │── organisms/ # Componentes orgánicos
│ │ │ │── templates/ # Componentes esqueletos
│ │ │── hooks/ # hooks globales
│ │ │── store/ # estados globales (Redux)
│
│- .eslintrc.json # Configuración de ESLint
│- .gitignore # Archivos ignorados por Git
│- next-env.d.ts # Tipados global de Next.js
│- next.config.mjs # Configuración de Next.js
│- .env # Variables de entorno
│- package.json # Dependencias y configuración del proyecto
│- postcss.config.mjs # Configuración de PostCSS
│- README.md # Readme del proyecto
│- tailwind.config.ts # Configuración de Tailwind CSS
│- tsconfig.json # Configuración de TypeScript
│- types.d.ts # Definición global de tipos
│- yarn.lock # Bloqueo de dependencias con Yarn
```

```
## Estructura del Proyecto Back


│── dist/                      # Archivos compilados para producción
│── node_modules/              # Dependencias del proyecto
│── prisma/                    # Configuración y esquema de la base de datos Prisma
│── src/                       # Código fuente del proyecto
│   │── affiliation-flow/      # Módulo para gestionar flujos de afiliación
│   │── audit/                 # Módulo de auditoría
│   │── bull-board/            # Panel de control para monitoreo de colas
│   │── certificate/           # Módulo para gestión de certificados
│   │── company/               # Módulo de gestión de empresas
│   │── mass-processing/       # Módulo para procesamiento masivo de datos
│   │── notifications/         # Módulo de notificaciones
│   │── processing/            # Módulo de procesamiento de datos
│   │── request-audit/         # Auditoría de solicitudes
│   │── sap/                   # Integración con SAP
│   │── shared/                # Código compartido y utilidades
│   │── sus/                   # Módulo con funcionalidad específica del negocio
│   │── sus-configuration/     # Configuración específica del módulo SUS
│   │── user/                  # Gestión de usuarios
│   │── webhook/               # Manejo de webhooks
│   │── workflows/             # Definición de flujos de trabajo
│   │── app.controller.spec.ts # Pruebas del controlador principal
│   │── app.controller.ts      # Controlador principal
│   │── app.module.ts          # Módulo raíz de la aplicación
│   │── app.service.ts         # Servicio principal
│   │── app.service.spec.ts    # Pruebas del servicio principal
│   │── main.ts                # Punto de entrada de la aplicación
│── test/                      # Pruebas unitarias
│── utils/                     # Utilidades generales
│── certificate-templates/     # Plantillas de certificados
│── .dockerignore              # Ignorar archivos en Docker
│── .env                       # Variables de entorno
│── .eslintrc.js               # Configuración de ESLint
│── .gitignore                 # Archivos y carpetas ignoradas por Git
│── .prettierrc                # Configuración de Prettier
│── docker-compose.yml         # Configuración de Docker Compose
│── Dockerfile                 # Configuración para construir la imagen Docker
│── nest-cli.json              # Configuración del CLI de NestJS
│── package.json               # Dependencias y configuración del proyecto
│── README.md                  # Documentación del proyecto
│── tsconfig.build.json        # Configuración de TypeScript para la compilación
│── tsconfig.json              # Configuración principal de TypeScript
│── yarn.lock                  # Bloqueo de dependencias con Yarn
```

```

### 📌 **Patrones de Diseño y Modularización:**

### ** (Estructura de Next.js con Clean Architecture)**

- **Clean Architecture:**
  - Se observa una clara separación entre capas: `domain`, `infrastructure`, `application`, y `presentation`, lo que facilita la escalabilidad y el mantenimiento.
- **Repository Pattern:**
  - La carpeta `repositories/` dentro de `domain/` sugiere que se están utilizando repositorios para acceder a los datos, lo que ayuda a desacoplar la lógica de negocio de la persistencia de datos.
- **Use Case Pattern:**
  - La presencia de `usecases/` en `domain/` indica que se encapsulan reglas de negocio en casos de uso específicos, siguiendo principios de **Command Query Responsibility Segregation (CQRS)**.
- **Inversión de Control (IoC) & Dependency Injection (DI):**
  - La carpeta `ioc/` sugiere el uso de inyección de dependencias para desacoplar módulos y mejorar la testabilidad.
- **Atomic Design (UI Components en Presentation Layer):**
  - La carpeta `components/` dentro de `presentation/` indica que la interfaz de usuario se basa en un diseño modular y reutilizable.
- **API Layer (Next.js API Routes):**
  - La presencia de `api/` sugiere que se están utilizando las rutas de API de Next.js para manejar la comunicación backend.

---

### ** (Estructura de Nest.js con Módulos de Negocio)**

- **Domain-Driven Design (DDD):**
  - La separación en `audit/`, `certificate/`, `company/`, etc., indica que cada módulo está centrado en un **Bounded Context**, característica clave de DDD.
- **Layered Architecture (Arquitectura en Capas):**
  - `app.module.ts`, `app.controller.ts`, y `app.service.ts` siguen la estructura típica de Nest.js basada en módulos, controladores y servicios.
- **Repository Pattern:**
  - `prisma/` indica el uso de Prisma como ORM, lo que sugiere un patrón de repositorio para la abstracción de la capa de datos.
- **Dependency Injection (Nest.js Built-in DI):**
  - Nest.js ya utiliza inyección de dependencias de manera nativa en `services/` y `providers/`, promoviendo la modularidad.
- **Microservices Pattern (Potencial Uso):**
  - La separación de módulos sugiere que este sistema podría estar preparado para ser escalado en microservicios.

## 📊 Base de Datos

El proyecto cuenta con una base de datos propia,almacena información directamente que se encarga de la persistencia de los datos.


## 🔍 Calidad de Código con Sonar

El proyecto implementa SonarCloud para el análisis estático de código y la gestión de la calidad. Cada módulo (RIA, ALFHEIM y SAKAAR) tiene su propia configuración de Sonar.

### 📋 Configuración de Sonar

El archivo `sonar-project.properties` en la raíz del proyecto define la configuración para los tres módulos:

```properties
# Configuración general del proyecto
sonar.projectKey=ComfandiTD_sucursal-personas
sonar.organization=comfanditdcol

### 🎯 Métricas y Cobertura

Sonar analiza varios aspectos del código:

- **Cobertura de código**: Se mide mediante los reportes de lcov generados en las pruebas
- **Duplicación de código**: Identifica código duplicado que puede ser refactorizado
- **Vulnerabilidades**: Detecta posibles problemas de seguridad
- **Code Smells**: Identifica patrones de código que pueden ser mejorados
- **Bugs**: Detecta errores potenciales en el código

### 🔧 Integración con el Flujo de Desarrollo

1. **Pre-commit**: Se recomienda ejecutar análisis local antes de hacer commit
2. **CI/CD**: El análisis se ejecuta automáticamente en el pipeline de CI/CD
3. **Pull Requests**: Los resultados de Sonar se integran con las revisiones de PR

## 📥 Clonar el Repositorio

Si aún no tienes el código, clónalo con:

git clone <URL_DEL_REPOSITORIO>

# Levantar servicio

nest start gamma --watch

# Generar base de datos

npx prisma migrate dev --schema=./apps/gamma/prisma/schema.prisma

# generar recursos

nest g resource "nombre recurso"

# Despliegue Rann Docker

Para iniciar una instancia local, luego de instalar docker y docker-compose, usar el siguiente comando:
```bash
docker-compose up --build
```
``````

## 📦 Instalar Dependencias

Puedes usar **npm** o **yarn**:

```
# Con npm
npm install

# Con Yarn
yarn install

```

## 🛠️ Configurar Variables de Entorno titan

El proyecto usa variables de entorno almacenadas en un archivo **.env**. Si no tienes un `.env`, créalo en la raíz del proyecto y agrega las variables necesarias.

Ejemplo:

# Authentication Next Auth
KEYCLOAK_CLIENT_ID
KEYCLOAK_ISSUER
KEYCLOAK_END_SESSION
NEXTAUTH_URL
NEXTAUTH_SECRET
NEXTAUTH_KEYCLOAK_URL_PROVIDER
client_id
KEYCLOAK_REFRESH_TOKEN
NEXT_PUBLIC_MODIFY_DATA
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_NEXTAUTH_SECRET
 
#  Zones
EUPHORIA_APP_URL=
CALISTO_APP_URL=
SAKAAR_APP_URL=
NIDAVELLIR_APP_URL
VANAHEIM_APP_URL
VORMIR_APP_URL=
NEMEA_APP_URL=
CILENE_APP_URL=
 
# BACKEND
NEXT_PUBLIC_SCULPTOR_URL

# VALIDATIONS
NEXT_PUBLIC_MPAC_UR
NEXT_PUBLIC_SISE_UR
NEXT_PUBLIC_FOMENTO_URL
 
# Digital ID
NEXT_PUBLIC_CALLBACK_ADO=
NPM_TOKEN=

# Know Here
KNOWHERE_APP_URL

# Limbo
LIMBO_APP_URL

## 🛠️ Configurar Variables de Entorno lalande

El proyecto usa variables de entorno almacenadas en un archivo **.env**. Si no tienes un `.env`, créalo en la raíz del proyecto y agrega las variables necesarias.

Ejemplo:

NEXT_PUBLIC_KEYCLOAK_CLIENT_ID
NEXT_PUBLIC_KEYCLOAK_ISSUER
NEXT_PUBLIC_KEYCLOAK_REFRESH_TOKEN
NEXT_PUBLIC_KEYCLOAK_END_SESSION
NEXTAUTH_URL
NEXTAUTH_SECRET
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_RANN_API_URL

## 🛠️ Configurar Variables de Entorno utopia

El proyecto usa variables de entorno almacenadas en un archivo **.env**. Si no tienes un `.env`, créalo en la raíz del proyecto y agrega las variables necesarias.

Ejemplo:

# Authentication Next Auth
KEYCLOAK_CLIENT_ID
KEYCLOAK_ISSUER
KEYCLOAK_REFRESH_TOKEN
KEYCLOAK_END_SESSION
NEXTAUTH_URL
NEXTAUTH_SECRET
NEXT_PUBLIC_MODIFY_DATA
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_NEXTAUTH_SECRET
 
 
# API BUSINESS
NEXT_PUBLIC_BUSINESS_API_URL
NEXT_PUBLIC_RUES_API_URL
NEXT_PUBLIC_FOMENTO_API_URL


## 📚 Dependencias Clave front

El proyecto usa varias tecnologías importantes, entre ellas:

- **Next.js** (Framework React para SSR y SSG)
- **Redux Toolkit** (Manejo de estado global)
- **Formik & Yup** (Manejo y validación de formularios)
- **MUI & Tailwind CSS** (Componentes y estilos)
- **Inversify** (Inyección de dependencias para arquitectura limpia)
- **NextAuth.js** (Autenticación)

# 🔧 Instalación y Configuración del Proyecto back

## 📌 Requisitos Previos

Antes de instalar el proyecto, asegúrate de tener instalados:

- **Node.js** (Versión recomendada: 18+) → [Descargar Node](https://nodejs.org/)
- **Docker** (Opcional, si deseas ejecutar servicios como Keycloak o la base de datos en contenedores)
- **NestJS** - Framework backend
- **Prisma** - ORM para base de datos
- **Keycloak** - Autenticación y autorización
- **AWS SDK** - Integración con servicios de AWS
- **Passport.js** - Manejo de autenticación
- **RxJS** - Programación reactiva
- **ExcelJS** - Manejo de archivos Excel


# Configuración AWS / RANN

Instalar el cliente AWS y realizar la configuración de acceso:
```bash
aws configure
```

Para configurar el acceso se requiere completar la siguiente información en los pasos:
```c
AWS Access Key ID [****************F76k]: {ACCESS_KEY}
AWS Secret Access Key [****************5Mfq]: {SECRET_KEY}
Default region name [us-east-1]: {REGION}
Default output format [None]: <<press enter>>
```

Con la cuenta AWS configurada, generamos la imagen de docker de rann, en este caso se usa el nombre **app-mpac-service**
```bash
docker build -t app-mpac-service .
```

Una vez generada la imagen de docker la identificar con el tag generado en el servicio AWS ECR en este caso: **00000000001.dkr.ecr.us-east-1.amazonaws.com/app-mpac-service:latest**
```bash
docker tag app-mpac-service:latest 00000000001.dkr.ecr.us-east-1.amazonaws.com/app-mpac-service:latest
```

Ingresar al servicio AWS ECR con nuestra {REGION} y credenciales: {USERNAME} y {PASSWORD}
```bash
aws ecr get-login-password --region {REGION} | docker login --username {USERNAME} --password-stdin {PASSWORD}
```

Finalmente, luego de recibir el mensaje: "Login Succeeded" se realiza el push de la imagen.
```bash
docker push 00000000001.dkr.ecr.us-east-1.amazonaws.com/app-mpac-service:latest
```
