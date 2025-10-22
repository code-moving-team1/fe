// lib/socket/socket.ts
import { io, Socket } from "socket.io-client";
// import Cookies from "js-cookie";


let socket: Socket | null = null;

export function getSocket(): Socket {
  if (socket) return socket;

  // accessToken 쿠키에서 읽기
  // const token = Cookies.get("accessToken");
  // console.log("socket.ts - token : ", token);
  // socket = io(process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:4000", {
  socket = io("http://localhost:4000", {
    path: "/socket.io", // 기본값
    transports: ["websocket", "polling"],
    withCredentials: true,
    // query: token ? { token } : {},
    reconnection: true,
    reconnectionDelayMax: 5000,
  });

  // ✅ 디버그 로그: 인증/연결 문제 즉시 확인
  socket.on("connect", () => {
    console.log("[SOCKET CONNECTED]", socket?.id);
  });
  socket.on("connect_error", (err) => {
    console.error("[SOCKET CONNECT ERROR]", err?.message, err);
  });
  socket.on("disconnect", (reason) => {
    console.warn("[SOCKET DISCONNECT]", reason);
  });

  return socket;
}
