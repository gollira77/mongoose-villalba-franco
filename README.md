# API REST con Node.js + Express + Mongoose

## Endpoints de Users 

Base URL: `http://localhost:3000/api/users`

---

### Registro de usuario

- **Método:** `POST`
- **Ruta:** `/register`
- **Descripción:** Crea un nuevo usuario en la base de datos.
- **Body JSON:**
```json
{
  "name": "Franco",
  "email": "franco@test.com",
  "password": "123456"
}
```
- **Repuesta exitosa (201 Created):**

```json
{
  "message": "Usuario registrado correctamente",
  "user": {
    "id": "64f...",
    "name": "Franco",
    "email": "franco@test.com"
  }
}
```

- **Aclaración:**

La contraseña se guarda encriptada usando bcrypt y no se devuelve en ninguna respuesta.

No se puede registrar un email duplicado.

Si algún campo no cumple las validaciones, se devuelve 400 Bad Request:

```json
{
  "errors": [
    { "msg": "El nombre es obligatorio", "param": "name", "location": "body" },
    { "msg": "Email inválido", "param": "email", "location": "body" }
  ]
}
```



### Login de usuario

- **Método:** `/POST`
- **Ruta:** `/login`
- **Descripción:** Permite iniciar sesión y devuelve un token JWT.
- **Body JSON:**

```json
{
  "email": "franco@test.com",
  "password": "123456"
}
```

- **Repuesta exitosa (200 OK):**

```json
{
  "message": "Login exitoso",
  "token": "<JWT token aquí>",
  "user": {
    "id": "64f...",
    "name": "Franco",
    "email": "franco@test.com"
  }
}
```

- **Aclaración:**

El token se usa para acceder a rutas protegidas.

Expira en 1 hora por defecto.

Si algún campo no cumple las validaciones → 400 Bad Request.

### Obtener perfil (protegido)

- **Método:** `/GET`
- **Ruta:** `/profile`
- **Descripción:** Devuelve los datos del usuario autenticado.
- **Headers:**
Authorization: Bearer <JWT token>

- **Repuesta exitosa (200 OK):**

```json
{
  "_id": "64f...",
  "name": "Franco",
  "email": "franco@test.com",
  "createdAt": "...",
  "updatedAt": "..."
}
```

- **Aclaración:**
Requiere token válido.
Si el token está ausente o inválido → 401 Acceso denegado

