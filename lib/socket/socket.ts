// lib/socket/socket.ts
import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (socket) return socket;

  // accessToken 쿠키에서 읽기
  const token = Cookies.get("accessToken");
  socket = io(process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:4000/api", {
    path: "/socket.io", // 기본값
    transports: ["websocket"],
    withCredentials: true,
    query: token ? { token } : {},
  });

  return socket;
}
