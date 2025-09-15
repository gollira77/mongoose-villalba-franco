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
  "password": "123456",
  "trainer": "64f..."  // Opcional, ID de un trainer asignado
}
```
- **Repuesta exitosa (201 Created):**

```json
{
  "message": "Usuario registrado correctamente",
  "user": {
    "id": "64f...",
    "name": "Franco",
    "email": "franco@test.com",
    "trainer": "64f..."  // ID del trainer asignado
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
    "email": "franco@test.com",
    "trainer": "64f..."  // ID del trainer asignado
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
  "trainer": {
    "id": "64f...",
    "name": "Juan",
    "email": "juan@test.com",
    "specialty": "Fuerza"
  },
  "createdAt": "...",
  "updatedAt": "..."
}
```

- **Aclaración:**
Requiere token válido.
Si el token está ausente o inválido → 401 Acceso denegado

### Actualizar usuario

- **Método:** `/PUT`
- **Ruta:** `/id`

ejemplo de ruta: http://localhost:3000/api/users/68c74a5e09036fec7cb9232f

- **Headers:**
Authorization: Bearer <JWT token>

- **Body JSON (opcional, solo los campos a actualizar):**

```json
{
  "name": "Franco Updated",
  "email": "franco2@test.com",
  "password": "newpassword",
  "trainer": "64f..."  // ID del nuevo trainer
}
```
- **Repuesta exitosa (200 OK):**

```json
{
  "message": "Usuario actualizado correctamente",
  "user": {
    "id": "68c74a5e09036fec7cb9232f",
    "name": "Franco Updated",
    "email": "franco2@test.com",
    "trainer": "64f..."
  }
}
```

- **Errores de validación (400 Bad Request):**

```json
{
  "errors": [
    { "msg": "ID de usuario inválido", "param": "id", "location": "params" },
    { "msg": "Email inválido", "param": "email", "location": "body" }
  ]
}
```

- **Errores de validación (400 Bad Request):**
```json
{
  "message": "Usuario no encontrado"
}
```

### Eliminar usuario 

- **Método:** `/DETELE`
- **Ruta:** `/id`

ejemplo de ruta: http://localhost:3000/api/users/68c74a5e09036fec7cb9232f

- **Headers:**
Authorization: Bearer <JWT token>

- **Repuesta exitosa (200 OK):**

```json
{
  "message": "Usuario eliminado permanentemente"
}
```

- **Errores de validación (400 Bad Request):**

```json
{
  "errors": [
    { "msg": "ID de usuario inválido", "param": "id", "location": "params" }
  ]
}
```

- **Usuario no encontrado (404):**
```json
{
  "message": "Usuario no encontrado"
}

```

---

## Endpoints de Workouts

Base URL: `http://localhost:3000/api/workouts`

Todos los endpoints requieren token JWT del usuario en el header

```http
Authorization: Bearer <JWT token>
```

### Crear un workout

- **Método:** `POST`
- **Ruta:** `/`
- **Descripción:** Crea un nuevo workout para el usuario autenticado.
- **Body JSON:**
```json
{
  "title": "Rutina de pecho",
  "description": "Entrenamiento de fuerza para pecho y tríceps",
  "duration": 45
}

```
- **Repuesta exitosa (201 Created):**

```json
{
  "message": "Workout creado correctamente",
  "workout": {
    "_id": "68c9f8d3a8b2c12345678901",
    "title": "Rutina de pecho",
    "description": "Entrenamiento de fuerza para pecho y tríceps",
    "duration": 45,
    "user": "68c74a5e09036fec7cb9232f",
    "createdAt": "2025-09-14T20:00:00.000Z",
    "updatedAt": "2025-09-14T20:00:00.000Z"
  }
}
```

- **Errores de validación (400 Bad Request):**

```json
{
  "message": "Errores de validación",
  "errors": [
    { "msg": "El título es obligatorio", "param": "title", "location": "body" },
    { "msg": "La duración es obligatoria", "param": "duration", "location": "body" }
  ]
}
```

### Obtener todos los workouts del usuario autenticado

- **Método:** `GET`
- **Ruta:** `/`
- **Descripción:** Devuelve todos los workouts del usuario autenticado.
- **Respuesta exictosa (200 OK)**
```json
[
  {
    "_id": "68c9f8d3a8b2c12345678901",
    "title": "Rutina de pecho",
    "description": "Entrenamiento de fuerza para pecho y tríceps",
    "duration": 45,
    "user": "68c74a5e09036fec7cb9232f",
    "createdAt": "2025-09-14T20:00:00.000Z",
    "updatedAt": "2025-09-14T20:00:00.000Z"
  },
  {
    "_id": "68c9f8d3a8b2c12345678902",
    "title": "Cardio intenso",
    "description": "Sesión de cardio HIIT de 30 minutos",
    "duration": 30,
    "user": "68c74a5e09036fec7cb9232f",
    "createdAt": "2025-09-14T21:00:00.000Z",
    "updatedAt": "2025-09-14T21:00:00.000Z"
  }
]
```

### Obtener un workout por ID

- **Método:** `GET`
- **Ruta:** `/id`
Por Ejemplo: `http://localhost:3000/api/workouts/68c77dc5c61d88cf3c08a046`
- **Descripción:** Devuelve un workout específico del usuario autenticado.
- **Respuesta exictosa (200 OK)**
```json
{
  "_id": "68c9f8d3a8b2c12345678901",
  "title": "Rutina de pecho",
  "description": "Entrenamiento de fuerza para pecho y tríceps",
  "duration": 45,
  "user": "68c74a5e09036fec7cb9232f",
  "createdAt": "2025-09-14T20:00:00.000Z",
  "updatedAt": "2025-09-14T20:00:00.000Z"
}
```

- **Workout no encontrado (404 Not Found):**

```json
{
  "message": "Workout no encontrado"
}
```

### Actualizar un workout

- **Método:** `PUT`
- **Ruta:** `/id`
Por Ejemplo: `http://localhost:3000/api/workouts/68c77dc5c61d88cf3c08a046`
- **Descripción:** Actualiza un workout del usuario autenticado (solo los campos que envíes).
- **Body JSON (opcional):**
```json
{
  "title": "Rutina de pecho y hombros",
  "description": "Pecho + hombros en superseries",
  "duration": 50
}
```

- **Repuesta exitosa (200 OK):**

```json
{
  "message": "Workout actualizado correctamente",
  "workout": {
    "_id": "68c9f8d3a8b2c12345678901",
    "title": "Rutina de pecho y hombros",
    "description": "Pecho + hombros en superseries",
    "duration": 50,
    "user": "68c74a5e09036fec7cb9232f",
    "createdAt": "2025-09-14T20:00:00.000Z",
    "updatedAt": "2025-09-14T21:30:00.000Z"
  }
}

```

- **Errores de validación (400 Bad Request):**

```json
{
  "message": "Errores de validación",
  "errors": [
    { "msg": "El título debe tener al menos 3 caracteres", "param": "title", "location": "body" }
  ]
}
```

- **Errores de validación (404 not found):**

```json
{
  "message": "Workout no encontrado"
}
```

### Eliminar un workout

- **Método:** `DETELE`
- **Ruta:** `/id`
Por Ejemplo: `http://localhost:3000/api/workouts/68c77dc5c61d88cf3c08a046`
- **Descripción:** Elimina un workout del usuario autenticado.
- **Respuesta exictosa (200 OK):**
```json
{
  "message": "Workout eliminado correctamente"
}

```

- **Workout no encontrado (404 Not Found):**
```json
{
  "message": "Workout no encontrado"
}
```

## Endpoints de Trainers

Base URL: `http://localhost:3000/api/trainers`

---

### Crear un trainer

- **Método:** `POST`
- **Ruta:** `/`
- **Descripción:** Crea un nuevo entrenador en la base de datos.
- **Body JSON:**
```json
{
  "name": "Juan",
  "email": "juan@test.com",
  "specialty": "Fuerza"
}
```

- **Respuesta exitosa (201 Created):**

```json
{
  "message": "Entrenador creado correctamente",
  "trainer": {
    "id": "64f...",
    "name": "Juan",
    "email": "juan@test.com",
    "specialty": "Fuerza"
  }
}
```

- **Errores (500 Internal Server Error):**

```json
{
  "message": "Error al crear entrenador",
  "error": "Detalle del error"
}

```

### Obtener todos los trainers

- **Método:** `GET`
- **Ruta:** `/`
- **Descripción:** Devuelve todos los entrenadores registrados.
- **Respuesta exitosa (200 OK):**

```json
[
  {
    "id": "64f...",
    "name": "Juan",
    "email": "juan@test.com",
    "specialty": "Fuerza"
  },
  {
    "id": "64f...",
    "name": "Maria",
    "email": "maria@test.com",
    "specialty": "Cardio"
  }
]
```

### Obtener un trainer por ID

- **Método:** `GET`
- **Ruta:** `/id`
- **Descripción:** Devuelve un entrenador específico.
- **Respuesta exitosa (200 OK):**
```json
{
  "id": "64f...",
  "name": "Juan",
  "email": "juan@test.com",
  "specialty": "Fuerza"
}
```

- **Trainer no encontrado (404):**
```json
{
  "message": "Entrenador no encontrado"
}
```

### Actualizar trainer

- **Método:** `PUT`
- **Ruta:** `/id`
- **Body JSON (campos opcionales a actualizar):**
```json
{
  "name": "Juan Updated",
  "email": "juan2@test.com",
  "specialty": "Fuerza y Cardio"
}

```

- **Respuesta exitosa (200 OK):**
```json
{
  "message": "Entrenador actualizado correctamente",
  "trainer": {
    "id": "64f...",
    "name": "Juan Updated",
    "email": "juan2@test.com",
    "specialty": "Fuerza y Cardio"
  }
}
```

- **Trainer no encontrado (404):**
```json
{
  "message": "Entrenador no encontrado"
}

```

### Eliminar trainer

- **Método:** `DETELE`
- **Ruta:** `/id`
- **Respuesta exitosa (200 OK):**
```json
{
  "message": "Entrenador eliminado correctamente"
}

```

- **Trainer no encontrado (404):**
```json
{
  "message": "Entrenador no encontrado"
}
```

### Asignar un usuario a un trainer (relación N:M)

- **Método:** `POST`
- **Ruta:** `/trainerId/addUser/userId`
- **Descripción:** Agrega un usuario a la lista de usuarios entrenados por este trainer.
- **Respuesta exitosa (200 OK):**
```json
{
  "message": "Usuario agregado al entrenador correctamente",
  "trainer": {
    "id": "64f...",
    "name": "Juan",
    "users": ["68c...", "68d..."]
  }
}

```

- **Trainer no encontrado (404):**
```json
{
  "message": "Trainer o usuario no encontrado"
}

```







