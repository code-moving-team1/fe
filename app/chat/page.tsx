// app/chat/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { getDisplayNickname } from "@/utils/getDisplayNickname";

export default function ChatPage() {
  // const [nickname, setNickname] = useState(
  //   () => `user-${Math.floor(Math.random() * 9999)}`
  // );
  const [nickname, setNickname] = useState("");
  const [joined, setJoined] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<any[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgs]);

  // 페이지 들어오면 닉네임을 한 번 가져와 세팅(로그인 상태면 '(고객)/(기사) 이름')
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const display = await getDisplayNickname();
        if (!cancelled) setNickname(display);
      } catch {
        if (!cancelled) setNickname(`user-${Math.floor(Math.random() * 9999)}`);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!joined) return;

    const s = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}/chat`, {
      path: "/socket.io",
      transports: ["websocket", "polling"],
      withCredentials: false,
      auth: { nickname: nickname.trim() },
      forceNew: true,
    });

    socketRef.current = s;

    s.on("chat:history", (list) => setMsgs(list));
    s.on("chat:system", (m) =>
      setMsgs((prev) => [...prev, { ...m, system: true }]),
    );
    s.on("chat:message", (m) => setMsgs((prev) => [...prev, m]));
    s.on("connect_error", (err) =>
      setMsgs((prev) => [
        ...prev,
        {
          text: `연결 오류: ${err?.message ?? "unknown"}`,
          ts: Date.now(),
          system: true,
        },
      ]),
    );

    return () => {
      s.disconnect();
      socketRef.current = null;
    };
  }, [joined, nickname]);

  const send = () => {
    const text = input.trim();
    if (!text || !socketRef.current) return;
    socketRef.current.emit("chat:message", { text });
    setInput("");
  };

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-4 text-2xl font-semibold">공개 채팅</h1>

      {!joined ? (
        <div className="space-y-3">
          <label className="block text-sm font-medium">닉네임</label>
          <input
            className="w-full rounded border px-3 py-2"
            value={nickname}
            maxLength={20}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력하세요"
          />
          <button
            className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
            onClick={() => setJoined(true)}
            disabled={!nickname.trim()}
          >
            입장
          </button>
        </div>
      ) : (
        <>
          <div
            ref={listRef}
            className="h-[60vh] w-full space-y-2 overflow-y-auto rounded border bg-white p-3"
          >
            {msgs.map((m: any, idx: number) =>
              m.system ? (
                <div
                  key={`s-${idx}`}
                  className="text-center text-xs text-gray-500"
                >
                  {new Date(m.ts).toLocaleTimeString()} · {m.text}
                </div>
              ) : (
                <div key={`${m.id}-${m.ts}`} className="text-sm">
                  <span className="mr-2 font-semibold">{m.nickname}</span>
                  <span className="text-gray-800">{m.text}</span>
                  <span className="ml-2 align-middle text-[10px] text-gray-400">
                    {new Date(m.ts).toLocaleTimeString()}
                  </span>
                </div>
              ),
            )}
          </div>

          <form
            className="mt-3 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              className="flex-1 rounded border px-3 py-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="메시지를 입력하고 Enter"
              maxLength={500}
            />
            <button className="rounded bg-black px-4 py-2 text-white">
              보내기
            </button>
          </form>
        </>
      )}
    </div>
  );
}
