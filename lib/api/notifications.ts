// lib/api/notifications.ts
import clientApi from "./axiosClient.client";

export type NotificationType =
  | "NEW_QUOTE_RECEIVED"
  | "MOVE_REQUEST_DECIDED"
  | "D_DAY_ALARM"
  | "DIRECT_QUOTE_REQ_DENIED"
  | "QUOTE_ACCEPTED"
  | "QUOTE_REJECTED"
  | "REVIEW_RECEIVED"
  | "ETC";

export type NotificationItem = {
  id: number;
  type: NotificationType;
  content: string;
  link?: string | null;
  isRead?: boolean;
  createdAt: string;
};

export async function fetchUnreadCount() {
  const { data } = await clientApi.get<{ count: number }>(
    "/notifications/unread-count",
  );
  return data.count;
}

export async function fetchNotifications(page = 1, pageSize = 10) {
  const { data } = await clientApi.get<{
    meta: { page: number; pageSize: number; total: number; totalPages: number };
    data: NotificationItem[];
  }>("/notifications", { params: { page, pageSize } });
  return data;
}

export async function markRead(id: number) {
  await clientApi.patch(`/notifications/${id}/read`);
}

export async function markAllRead() {
  const { data } = await clientApi.patch<{ updated: number }>(
    "/notifications/mark-all-read",
  );
  return data.updated;
}
