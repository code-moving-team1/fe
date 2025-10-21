// hooks/useNotifications.ts
"use client";

import { useEffect, useState, useCallback } from "react";
import { getSocket } from "@/lib/socket/socket";
import {
  fetchUnreadCount,
  fetchNotifications,
  markRead,
  markAllRead,
  type NotificationItem,
} from "@/lib/api/notifications";

export function useNotifications() {
  const [unread, setUnread] = useState(0);
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadInitial = useCallback(async () => {
    setLoading(true);
    try {
      const [cnt, list] = await Promise.all([
        fetchUnreadCount(),
        fetchNotifications(1, 10),
      ]);
      setUnread(cnt);
      setItems(list.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  useEffect(() => {
    const s = getSocket();

    s.on("notification:new", (payload) => {
      // 실시간 수신 → 맨 위에 추가 + 뱃지 +1
      setItems((prev) => [payload, ...prev].slice(0, 10));
      setUnread((c) => c + 1);
    });

    s.on("notification:unreadCount", ({ count }) => {
      setUnread(count);
    });

    return () => {
      s.off("notification:new");
      s.off("notification:unreadCount");
    };
  }, []);

  const onClickItem = async (n: NotificationItem) => {
    // 읽음 처리 후 링크 이동
    try {
      await markRead(n.id);
      setUnread((c) => Math.max(0, c - (n.isRead ? 0 : 1)));
      setItems((prev) =>
        prev.map((x) => (x.id === n.id ? { ...x, isRead: true } : x))
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

  return { unread, items, loading, onClickItem, onMarkAllRead, reload: loadInitial };
}
