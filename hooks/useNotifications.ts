// hooks/useNotifications.ts
"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  fetchUnreadCount,
  fetchNotifications,
  markRead,
  markAllRead,
  type NotificationItem,
} from "@/lib/api/notifications";
import { connectSocket } from "@/lib/socket/socket";

type UseNotificationsOptions = {
  enabled?: boolean; // 로그인 여부
  panelOpen?: boolean; // 알림 패널 오픈 여부
};

export function useNotifications(opts: UseNotificationsOptions = {}) {
  const { enabled = true, panelOpen = false } = opts;

  const [unread, setUnread] = useState(0);
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [loadingUnread, setLoadingUnread] = useState(false);
  const [loadingList, setLoadingList] = useState(false);

  const socketRef = useRef<any>(null);

  // --- API helpers (401은 조용히 무시)
  const safeFetchUnread = useCallback(async () => {
    if (!enabled) return;
    setLoadingUnread(true);
    try {
      const cnt = await fetchUnreadCount();
      setUnread(cnt ?? 0);
    } catch (e: any) {
      if (e?.response?.status !== 401) console.warn("unread error", e);
      setUnread(0);
    } finally {
      setLoadingUnread(false);
    }
  }, [enabled]);

  const safeFetchList = useCallback(async () => {
    if (!enabled || !panelOpen) return;
    setLoadingList(true);
    try {
      const list = await fetchNotifications(1, 10);
      setItems(list?.data ?? []);
    } catch (e: any) {
      if (e?.response?.status !== 401) console.warn("list error", e);
      setItems([]);
    } finally {
      setLoadingList(false);
    }
  }, [enabled, panelOpen]);

  // --- 초기/변경 시점: 로그인 되면 unread만 우선 로드
  useEffect(() => {
    if (!enabled) {
      // 비로그인으로 전환되면 상태 초기화
      setUnread(0);
      setItems([]);
      return;
    }
    // 로그인: 뱃지용 unread 로드
    safeFetchUnread();
  }, [enabled, safeFetchUnread]);

  // --- 패널을 열 때만 목록 로드
  useEffect(() => {
    if (panelOpen && enabled) {
      safeFetchList();
    }
  }, [panelOpen, enabled, safeFetchList]);

  // --- 소켓: 로그인시에만 연결
  useEffect(() => {
    if (!enabled) {
      // 비로그인: 기존 소켓 정리
      if (socketRef.current) {
        try {
          socketRef.current.off("notification:new");
          socketRef.current.off("notification:unreadCount");
          socketRef.current.disconnect?.();
        } catch {}
        socketRef.current = null;
      }
      return;
    }

    let mounted = true;

    (async () => {
      try {
        const s = await connectSocket();
        if (!mounted) return;

        socketRef.current = s;

        s.on("notification:new", (payload: NotificationItem) => {
          // 패널 안 열려 있어도 최신 10개 캐시 유지
          setItems((prev) => [payload, ...prev].slice(0, 10));
          setUnread((c) => c + (payload?.isRead ? 0 : 1));
        });

        s.on("notification:unreadCount", ({ count }: { count: number }) => {
          setUnread(count ?? 0);
        });
      } catch (e) {
        console.warn("socket connect failed in useNotifications", e);
      }
    })();

    return () => {
      mounted = false;
      if (socketRef.current) {
        try {
          socketRef.current.off("notification:new");
          socketRef.current.off("notification:unreadCount");
          socketRef.current.disconnect?.();
        } catch {}
        socketRef.current = null;
      }
    };
  }, [enabled]);

  const onClickItem = async (n: NotificationItem) => {
    try {
      await markRead(n.id);
      setUnread((c) => Math.max(0, c - (n.isRead ? 0 : 1)));
      setItems((prev) =>
        prev.map((x) => (x.id === n.id ? { ...x, isRead: true } : x)),
      );
    } catch {}
    if (n.link) window.location.href = n.link;
  };

  const onMarkAllRead = async () => {
    try {
      const updated = await markAllRead();
      if (updated > 0) {
        setUnread(0);
        setItems((prev) => prev.map((x) => ({ ...x, isRead: true })));
      }
    } catch {}
  };

  const reload = useCallback(() => {
    if (!enabled) return;
    // 패널 열림 상태에 맞춰 다시 로드
    safeFetchUnread();
    if (panelOpen) safeFetchList();
  }, [enabled, panelOpen, safeFetchUnread, safeFetchList]);

  return {
    unread,
    items,
    loading: loadingUnread || loadingList,
    onClickItem,
    onMarkAllRead,
    reload,
  };
}
