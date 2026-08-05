import { Server } from 'socket.io';
import type { Server as HTTPServer } from 'http';

let io: Server;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://brew-and-go-frontend.vercel.app',
];

export function initSocket(server: HTTPServer) {
  io = new Server(server, {
    cors: { origin: allowedOrigins },
  });

  io.on('connection', (socket) => {
    socket.on('join', (payload: { userId?: string; role?: string }) => {
  console.log('Join recibido:', payload);
  if (payload.userId) {
    socket.join(`user:${payload.userId}`);
  }
  if (payload.role === 'ADMIN' || payload.role === 'EMPLEADO') {
    socket.join('staff');
    console.log(`Socket ${socket.id} unido a staff`);
  } else {
    console.log(`Socket ${socket.id} NO se unió a staff. Rol recibido: "${payload.role}"`);
  }
});
  });

  return io;
}

export function getIO() {
  if (!io) {
    throw new Error('Socket.io no fue inicializado');
  }
  return io;
}