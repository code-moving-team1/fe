// lib/api/moveRequest.ts
import api from "./axiosClient";

export interface MoveRequestItem {
  destination: string;
  departure: string;
  id: number;
  customerName: string;
  description: string;
  departureRegion: string;
  destinationRegion: string;
  moveDate: string;
  serviceType: string;
  status: string;
}

export interface MoveRequestResponse {
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  data: MoveRequestItem[];
}

export interface MoveRequestFilter {
  page?: number;
  pageSize?: number;
  sort?: { field: string; order: "asc" | "desc" };
  status?: string[];
  regions?: string[];
  departureRegions?: string[];
  destinationRegions?: string[];
  serviceTypes?: string[];
  dateFrom?: string;
  dateTo?: string;
}

export async function fetchMoveRequests(
  filters: MoveRequestFilter,
): Promise<MoveRequestResponse> {
  const res = await api.post("/move-requests/search", filters);
  return res.data;
}
