import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ["websocket", "polling"],
});

export function connectSocket() {
  if (!socket.connected) {
    socket.connect();
  }
}

export function disconnectSocket() {
  if (socket.connected) {
    socket.disconnect();
  }
}