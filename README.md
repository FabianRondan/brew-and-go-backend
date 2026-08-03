# brew&go — API Backend

API REST para una plataforma de pedidos online de cafetería/restaurante, con gestión de catálogo, pedidos, reservas de mesa y roles de usuario.

Proyecto desarrollado como parte de mi portfolio para demostrar buenas prácticas de arquitectura backend con TypeScript.

## Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express
- **Base de datos:** PostgreSQL (hosteado en Neon)
- **ORM:** Prisma
- **Autenticación:** JWT + bcrypt
- **Ejecución en desarrollo:** tsx

## Arquitectura

El proyecto sigue una arquitectura por capas, separando responsabilidades:

\`\`\`
src/
├── config/        # Configuración de servicios externos (conexión a Prisma)
├── controllers/    # Reciben la petición HTTP y devuelven la respuesta
├── middlewares/     # Autenticación y autorización por rol
├── routes/          # Definición de endpoints
├── services/         # Lógica de negocio
└── types/            # Tipos e interfaces compartidas
\`\`\`

## Funcionalidades implementadas

- [x] Registro y login de usuarios con JWT
- [x] Contraseñas hasheadas con bcrypt
- [x] Sistema de roles (CLIENTE, EMPLEADO, ADMIN)
- [x] Middleware de autenticación y autorización por rol
- [x] CRUD de categorías (público en lectura, protegido en escritura)
- [x] CRUD de productos con variantes (soft delete)
- [ ] Gestión de pedidos con estados
- [ ] Reservas de mesa
- [ ] Notificaciones en tiempo real (Socket.io)
- [ ] Integración de pagos (Stripe)

## Modelo de datos

El schema completo está en [`prisma/schema.prisma`](./prisma/schema.prisma). Entidades principales: `User`, `Category`, `Product`, `ProductVariant`, `Order`, `OrderItem`, `Table`, `Reservation`.

## Instalación local

\`\`\`bash
npm install
npx prisma generate
npm run dev
\`\`\`

Crear un archivo `.env` en la raíz con:

\`\`\`
PORT=4000
DATABASE_URL="tu-connection-string-de-postgresql"
JWT_SECRET="tu-secreto"
JWT_REFRESH_SECRET="otro-secreto"
NODE_ENV=development
\`\`\`

## Autor

Nelson Fabian Rondán (Shaggy) — Desarrollador Oracle APEX/PL/SQL, Node.js