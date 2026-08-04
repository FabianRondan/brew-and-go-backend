# brew&go — Backend

API REST para brew&go, una plataforma de pedidos online y reservas para cafetería/restaurante. Construida con Node.js, TypeScript, Express y Prisma sobre PostgreSQL.

Proyecto de portfolio enfocado en demostrar buenas prácticas de arquitectura backend: separación por capas, autenticación con roles, transacciones de base de datos, y reglas de negocio del lado del servidor.

## Stack

- **Node.js** + **TypeScript**
- **Express** como framework HTTP
- **PostgreSQL** (hosteado en Neon) como base de datos
- **Prisma** como ORM
- **JWT** + **bcrypt** para autenticación
- **tsx** para ejecución en desarrollo

## Arquitectura

El proyecto sigue una arquitectura por capas, separando responsabilidades:

src/
├── config/ # Configuración de servicios externos (conexión a Prisma)
├── controllers/ # Reciben la petición HTTP y devuelven la respuesta
├── middlewares/ # Autenticación y autorización por rol
├── routes/ # Definición de endpoints
├── services/ # Lógica de negocio
└── types/ # Tipos e interfaces compartidas

Cada capa tiene una única responsabilidad: las rutas definen el endpoint, los controllers validan la entrada y traducen la respuesta HTTP, y los services contienen toda la lógica de negocio real, sin conocer nada de Express.

## Modelo de datos

El schema completo está en [`prisma/schema.prisma`](./prisma/schema.prisma).

**Entidades:** `User`, `Category`, `Product`, `ProductVariant`, `Order`, `OrderItem`, `Table`, `Reservation`.

**Decisiones de diseño relevantes:**
- Los productos usan *soft delete* (`active: false`) en vez de borrado físico, para no romper el historial de pedidos que ya los referencian.
- El precio de cada `OrderItem` se congela en el momento de la compra, independientemente de si el precio del producto cambia después.
- Las reservas validan solapamiento de horario por mesa antes de confirmarse.

## Endpoints principales

| Método | Ruta | Descripción | Acceso |
|---|---|---|---|
| POST | `/api/auth/register` | Registro de usuario | Público |
| POST | `/api/auth/login` | Inicio de sesión | Público |
| GET | `/api/auth/me` | Datos del usuario autenticado | Autenticado |
| GET | `/api/products` | Listar productos | Público |
| POST | `/api/products` | Crear producto | ADMIN |
| POST | `/api/products/:id/variants` | Agregar variante a un producto | ADMIN |
| GET | `/api/categories` | Listar categorías | Público |
| POST | `/api/categories` | Crear categoría | ADMIN |
| POST | `/api/orders` | Crear pedido | Autenticado |
| GET | `/api/orders/me` | Pedidos del usuario autenticado | Autenticado |
| GET | `/api/orders` | Todos los pedidos | ADMIN / EMPLEADO |
| PATCH | `/api/orders/:id/status` | Cambiar estado de un pedido | ADMIN / EMPLEADO |
| GET | `/api/tables` | Listar mesas | Público |
| POST | `/api/reservations` | Crear reserva | Autenticado |
| GET | `/api/reservations/me` | Reservas del usuario autenticado | Autenticado |

## Seguridad y reglas de negocio destacadas

- El precio de un pedido **nunca** se recibe del cliente: siempre se recalcula en el servidor a partir del `productId`/`variantId`, dentro de una transacción de Prisma que también valida y descuenta stock.
- Autenticación con JWT y middleware de autorización por rol (`CLIENTE`, `EMPLEADO`, `ADMIN`), reutilizable en cualquier ruta con `authorize('ADMIN', 'EMPLEADO')`.
- Contraseñas hasheadas con bcrypt, nunca almacenadas en texto plano.

## Instalación local

```bash
npm install
npx prisma generate
npm run dev
```

Crear un archivo `.env` en la raíz con:

PORT=4000
DATABASE_URL="tu-connection-string-de-postgresql"
JWT_SECRET="tu-secreto"
JWT_REFRESH_SECRET="otro-secreto"
NODE_ENV=development

## Repositorio del frontend

[brew-and-go-frontend](https://github.com/FabianRondan/brew-and-go-frontend)

## Autor

Nelson Fabian Rondán (Shaggy) — Desarrollador Oracle APEX/PL/SQL, Node.js