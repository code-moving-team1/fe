// lib/socket/socket.ts
import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";

let socket: Socket | null = null;

function getToken(): string | undefined {
  // 쿠키 우선, 없다면 로컬스토리지(프로젝트 정책에 맞춰 한쪽만 써도 OK)
  return Cookies.get("accessToken") || undefined;
}

export function getSocket(): Socket {
  if (socket) return socket;

  socket = io("http://localhost:4000", {
    path: "/socket.io", // 기본값
    // transports: ["websocket", "polling"],
    transports: ["websocket"],
    withCredentials: true,
    // query: token ? { token } : {},
    // reconnection: true,
    // reconnectionDelayMax: 5000,
    auth: { token: getToken() }, // ✅ 최초 연결 시 토큰 탑재
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    randomizationFactor: 0.5,
  });

  // 재연결 시도 직전에 최신 토큰 주입
  socket.io.on("reconnect_attempt", () => {
    if (!socket) return;
    socket.auth = { token: getToken() }; // ✅ 매 시도마다 최신 토큰
  });

  // 첫 연결 실패 시에도 다음 시도 전에 최신 토큰 갱신
  socket.on("connect_error", (_err) => {
    if (!socket) return;
    socket.auth = { token: getToken() }; // ✅ 최신 토큰으로 교체
    // socket.connect(); // 자동 재시도라 보통 불필요
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

export function refreshSocketAuth() {
  if (!socket) return;
  socket.auth = { token: getToken() };
  if (socket.disconnected) socket.connect();
}
