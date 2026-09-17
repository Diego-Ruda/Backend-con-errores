# E-commerce API académico

API REST de ejemplo para un e-commerce pequeño. Está construida con Node.js, Express y Mongoose usando JavaScript CommonJS.

## Requisitos

- Node.js 18 o superior
- MongoDB 6 o superior, local o remoto
- npm

## Instalación

```bash
npm install
```

Copiar `.env.ejemplo` como `.env` y ajustar la URI de MongoDB:

```bash
cp .env.ejemplo .env
```

En Windows PowerShell:

```powershell
Copy-Item .env.ejemplo .env
```

## Ejecución

Para poblar la base con datos de prueba:

```bash
npm run seed
```

Para ejecutar en modo desarrollo:

```bash
npm run dev
```

Para ejecutar con Node:

```bash
npm start
```

La API queda disponible por defecto en `http://localhost:3000`.

## Endpoints

Todos los endpoints devuelven JSON.

| Método | Ruta                     | Descripción                      |
| ------ | ------------------------ | -------------------------------- |
| GET    | `/health`                | Estado del servicio              |
| GET    | `/api/products`          | Lista productos                  |
| POST   | `/api/products`          | Crea un producto                 |
| GET    | `/api/products/:id`      | Obtiene un producto              |
| PATCH  | `/api/products/:id`      | Actualiza un producto            |
| DELETE | `/api/products/:id`      | Elimina un producto              |
| GET    | `/api/users`             | Lista usuarios sin password      |
| POST   | `/api/users`             | Registra un usuario              |
| GET    | `/api/users/:id`         | Obtiene un usuario               |
| GET    | `/api/orders`            | Lista órdenes                    |
| POST   | `/api/orders`            | Crea una orden y descuenta stock |
| GET    | `/api/orders/:id`        | Obtiene una orden                |
| PATCH  | `/api/orders/:id/cancel` | Cancela una orden pendiente      |

### Filtros de productos

`GET /api/products?page=1&limit=10&category=audio&search=auriculares`

### Crear producto

```json
{
  "name": "Mouse Orbit",
  "description": "Mouse inalámbrico ergonómico",
  "category": "perifericos",
  "price": 35.9,
  "stock": 20
}
```

### Registrar usuario

```json
{
  "name": "Carla Díaz",
  "email": "carla@example.com",
  "password": "clave123"
}
```

### Crear orden

Se debe usar el ID de un usuario y el ID de un producto existente.

```json
{
  "userId": "675000000000000000000001",
  "items": [
    {
      "productId": "675000000000000000000002",
      "quantity": 2,
      "price": 89.99
    }
  ]
}
```

## Respuestas y errores

Las respuestas exitosas usan el formato `{ "success": true, "data": ... }`. Los errores usan `{ "success": false, "message": "..." }`.

Los errores de validación de Mongoose y los errores inesperados se procesan mediante el middleware global de errores.

## Estructura

```text
src/
  app.js
  server.js
  config/
  controllers/
  middlewares/
  models/
  routes/
seed.js
.env.ejemplo
ARCHITECTURE.md
```
