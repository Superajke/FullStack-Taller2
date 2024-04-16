# FullStack Taller 2

Programa CRUD con usuarios los cuales pueden ver y realizar la compra de productos, también tiene roles, Admin, User.

## Requisitos Previos

Antes de comenzar, asegúrate de haber instalado lo siguiente:
- Java JDK 11 o superior
- Maven 3.6 o superior (para el backend)
- Node.js 12.18 o superior (para el frontend)
- npm 6.14 o superior (para el frontend)
- MySQL server y para fácil manejo MySQL Workbench
## Instalación

Sigue estos pasos para configurar tu entorno de desarrollo local.

### Backend (Spring Boot)

1. Navega a la carpeta del backend:
```bash
cd crud
```
2. Construye y empaca el proyecto con Maven:
```bash
mvn clean install
```

4. Crea tu base de datos, y en la ruta crud/src/main/resources/application.properties edita este archivo y ponle las opciones de configuración de tu base de datos

5. Ejecuta la aplicación Spring Boot

La aplicación debería estar corriendo ahora en `http://localhost:3000`.

### Frontend (React)

1. Navega a la carpeta del frontend:
```bash
cd FrontEnd
```

2. Instala las dependencias del proyecto:
```bash
npm install
```

3. Inicia la aplicación React:
```bash
npm run dev
```
La aplicación debería estar corriendo ahora en `http://localhost:5173`.
