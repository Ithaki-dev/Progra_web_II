# Workshop 4 - Sistema de Autenticación

## Cambios Implementados

### 🔐 Sistema de Autenticación con JWT

Se ha implementado un sistema completo de autenticación basado en tokens JWT que incluye:

#### Estructura del Servidor

```
server/
├── controllers/
│   ├── authController.js       # Lógica de registro y login
│   ├── courseController.js     # Controlador de cursos
│   └── professorController.js  # Controlador de profesores
├── middlewares/
│   └── authMiddleware.js       # Middleware de validación de tokens
├── models/
│   ├── user.js                 # Modelo de usuario
│   ├── course.js               # Modelo de curso
│   └── profesor.js             # Modelo de profesor
├── routes/
│   ├── authRoutes.js           # Rutas de autenticación
│   ├── courseRoutes.js         # Rutas de cursos (protegidas)
│   └── professorRoutes.js      # Rutas de profesores (protegidas)
└── index.js                    # Configuración principal
```

### 📋 Endpoints Disponibles

#### Autenticación (Sin protección)
- **POST** `/auth/register` - Registro de nuevos usuarios
  ```json
  {
    "name": "Juan",
    "lastName": "Pérez",
    "email": "juan@example.com",
    "password": "123456"
  }
  ```

- **POST** `/auth/token` - Login y obtención de token
  ```json
  {
    "email": "juan@example.com",
    "password": "123456"
  }
  ```

#### Cursos (Requieren autenticación)
- **GET** `/courses` - Listar cursos
- **GET** `/courses?id={id}` - Obtener curso específico
- **POST** `/courses` - Crear curso
- **PUT** `/courses?id={id}` - Actualizar curso
- **DELETE** `/courses?id={id}` - Eliminar curso

#### Profesores (Requieren autenticación)
- **GET** `/professors` - Listar profesores
- **GET** `/professors?id={id}` - Obtener profesor específico
- **POST** `/professors` - Crear profesor
- **PUT** `/professors?id={id}` - Actualizar profesor
- **DELETE** `/professors?id={id}` - Eliminar profesor

### 🔑 Uso de Autenticación

#### En el Cliente

1. **Registro de Usuario**
   - Accede a `register.html`
   - Completa el formulario con: nombre, apellido, email y contraseña
   - El usuario se crea en la base de datos con la contraseña hasheada

2. **Login**
   - Accede a `login.html`
   - Ingresa email y contraseña
   - Al hacer login exitoso:
     - El token JWT se guarda en `sessionStorage`
     - La información del usuario se guarda en `sessionStorage`
     - Se redirige a `index.html`

3. **Uso de APIs Protegidas**
   - Todos los formularios ahora incluyen automáticamente el token
   - El helper `auth-helper.js` maneja la autenticación
   - Si el token expira o es inválido, se redirige al login

#### Headers de Autenticación

Todas las peticiones a APIs protegidas deben incluir:
```javascript
headers: {
  'Authorization': 'Bearer YOUR_TOKEN_HERE',
  'Content-Type': 'application/json'
}
```

### 🛠️ Archivos del Cliente

```
client/
├── auth-helper.js            # Funciones helper de autenticación
├── register.html             # Formulario de registro
├── login.html                # Formulario de login
├── index.html                # Página principal (muestra estado de auth)
├── create-course.html        # Crear curso (protegido)
├── list-courses.html         # Listar cursos (protegido)
├── create-profesor.html      # Crear profesor (protegido)
└── list-profesores.html      # Listar profesores (protegido)
```

### 🔧 Configuración

#### Dependencias Instaladas
```bash
npm install jsonwebtoken bcryptjs
```

- **jsonwebtoken**: Generación y validación de tokens JWT
- **bcryptjs**: Hash seguro de contraseñas

#### Secret Key
La clave secreta para firmar tokens está definida en `authController.js`:
```javascript
const JWT_SECRET = 'utn-secret-key-2024';
```

⚠️ **Importante**: En producción, esta clave debe estar en variables de entorno.

### 🚀 Cómo Ejecutar

1. **Iniciar el servidor**:
   ```bash
   cd server
   npm run dev
   ```

2. **Abrir el cliente**:
   - Abre `client/index.html` en tu navegador
   - O usa un servidor local:
     ```bash
     cd client
     python -m http.server 8000
     # Luego accede a http://localhost:8000
     ```

3. **Flujo de uso**:
   - Registra un usuario en `/register.html`
   - Inicia sesión en `/login.html`
   - Accede a las funcionalidades protegidas

### 🔒 Seguridad Implementada

1. **Passwords Hasheados**: Las contraseñas se almacenan hasheadas con bcrypt (10 rounds)
2. **Tokens JWT**: Los tokens expiran en 24 horas
3. **Validación de Tokens**: Middleware verifica tokens en cada petición
4. **Session Storage**: Tokens guardados en sessionStorage (se borran al cerrar el navegador)
5. **Manejo de Errores**: Redirección automática al login si hay errores de autenticación

### 📝 Notas Importantes

- Los tokens se almacenan en **sessionStorage** (no localStorage) por seguridad
- Al cerrar el navegador, la sesión se pierde
- Todos los endpoints de cursos y profesores requieren autenticación
- Los errores 401 redirigen automáticamente al login

### 🎯 Mejoras Futuras Sugeridas

1. Agregar refresh tokens
2. Implementar roles y permisos
3. Agregar verificación de email
4. Implementar recuperación de contraseña
5. Mejorar validación de contraseñas (complejidad mínima)
6. Agregar rate limiting para prevenir ataques
7. Mover secret key a variables de entorno
