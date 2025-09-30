# CRUD Personas - Frontend

Una aplicación web frontend para la gestión de personas con operaciones CRUD (Crear, Leer, Actualizar, Eliminar). Incluye autenticación de usuarios y una interfaz moderna construida con React y TypeScript.

## 🚀 Características

- **Gestión de Personas**: Crear, ver, editar y eliminar registros de personas
- **Autenticación**: Sistema de login y registro de usuarios
- **Interfaz Moderna**: Diseño responsivo con Chakra UI
- **Validación**: Validación de formularios con Zod
- **Pruebas**: Suite de pruebas con Vitest y Testing Library
- **Mocking**: Simulación de API con MSW para desarrollo y pruebas

## 🛠️ Tecnologías Utilizadas

### Core
- **React**: 18.2.0 - Biblioteca para interfaces de usuario
- **TypeScript**: 5.4.5 - JavaScript con tipado estático
- **Vite**: 5.4.20 - Herramienta de construcción rápida

### Routing & State
- **React Router DOM**: 6.22.3 - Enrutamiento para aplicaciones React

### UI & Styling
- **Chakra UI**: 3.27.0 - Componentes de interfaz accesibles
- **Framer Motion**: 12.23.18 - Animaciones
- **Emotion**: 11.14.0 - CSS-in-JS

### API & Data
- **Zodios**: 10.9.6 - Cliente API tipado con Zod
- **Zod**: Validación de esquemas
- **React DatePicker**: 8.7.0 - Selector de fechas

### Testing
- **Vitest**: 1.6.1 - Framework de pruebas
- **Testing Library**: 16.0.0 - Utilidades de pruebas
- **MSW**: 2.3.1 - Mock Service Worker

## 📋 Prerrequisitos

- **Node.js**: Versión 18 o superior
- **npm**: Gestor de paquetes (viene con Node.js)

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd react-vite-ts-crud-personas
```

2. Instala las dependencias:
```bash
npm install
```

## 🚀 Ejecución del Proyecto

### Desarrollo
Para ejecutar la aplicación en modo desarrollo:
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5000`

### Construcción para Producción
Para construir la aplicación para producción:
```bash
npm run build
```

### Vista Previa de Producción
Para previsualizar la build de producción:
```bash
npm run preview
```


## 🌐 Endpoints de API

La aplicación se comunica con un backend REST API. Los endpoints principales son:

### Autenticación
- `POST /api/v1/auth/register` - Registro de nuevo usuario
- `POST /api/v1/auth/login` - Inicio de sesión

### Personas
- `GET /api/v1/persons` - Obtener todas las personas
- `POST /api/v1/persons` - Crear nueva persona
- `PUT /api/v1/persons/:id` - Actualizar persona existente
- `DELETE /api/v1/persons/:id` - Eliminar persona

**Nota**: La aplicación utiliza un proxy configurado en Vite para redirigir las peticiones `/api/*` al servidor backend corriendo en `http://localhost:3000`, evitando problemas de CORS durante el desarrollo.

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── api/           # Funciones de API
│   ├── components/    # Componentes reutilizables
│   ├── context/       # Contextos de React
│   ├── hooks/         # Hooks personalizados
│   ├── lib/           # Utilidades y configuraciones
│   ├── models/        # Interfaces y tipos
│   ├── pages/         # Páginas de la aplicación
│   └── services/      # Servicios
├── tests/             # Archivos de pruebas
└── ...
```

## 🔐 Autenticación

La aplicación incluye un sistema de autenticación basado en JWT. Los tokens se almacenan en localStorage y se incluyen automáticamente en las peticiones a la API.

## 🎨 Características de la UI

- **Responsive**: Diseño adaptativo para diferentes tamaños de pantalla
- **Accesible**: Componentes de Chakra UI con soporte para accesibilidad
- **Confirmaciones**: Diálogos de confirmación para acciones destructivas
- **Validación**: Mensajes de error en tiempo real para formularios

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la build de producción
- `npm test` - Ejecuta las pruebas
- `npm run test:ui` - Ejecuta pruebas con interfaz gráfica


## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
