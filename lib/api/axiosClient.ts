// lib/api/axiosClient.ts
import { useAuthStore } from "@/contexts/authStore";
import axios from "axios";
import { AUTH_API } from "./paths";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api",
  withCredentials: true, //refresh token 쿠키 포함
  headers: {
    "Content-Type": "application/json",
  },
});

//@TODO any 타입지정
let isRefreshing = false; // 지금 토큰 갱신중인지
// 이미 갱신 요청이 진행중이면 다른 요청들은 그 Promise를 기다리도록
// 여러 api 요청이 401 unauthorized 에러코드 맞아도 refresh 요청은 한번만 보내도록
let refreshPromise: Promise<any> | null = null;

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config as any;
    //401이면 토큰만료일것으로 판단하고 refresh 실행
    if (error.response?.status === 401 && !originalRequest._retry) {
      //같은 요청을 무한반복하지 않도록 플래그
      originalRequest._retry = true;

      //zustand에서 현재 로그인 상태 userType 가져옴
      const { userType, logout } = useAuthStore.getState();
      // 로그인 상태없으면 그냥 로그아웃 처리
      if (!userType) {
        logout();
        return Promise.reject(error);
      }

      //customer냐 mover냐에 따라 refreshToken 요청
      const refreshUrl =
        userType === "customer"
          ? AUTH_API.CUSTOMER_REFRESH
          : AUTH_API.MOVER_REFRESH;

      try {
        //refresh중이 아니면 새로 /refresh-token 요청 보냄
        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${refreshUrl}`,
            {},
            { withCredentials: true },
          );
          await refreshPromise;
          isRefreshing = false;
          refreshPromise = null;
        } else {
          //이미 refresh중이면 refreshPromise 기다려서 결과 공유
          await refreshPromise;
        }
        //refresh 성공시 원래요청 다시 실행 해서 중단없이 api 성공한것처럼 ㄱㄱ함
        return api(originalRequest); // 재시도
      } catch (e) {
        //refresh도 실패하면 로그아웃처리 완전히 세션종료
        logout();
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
