// lib/auth/index.ts
import api from "../api/axiosClient";
import { AUTH_API } from "../api/paths";

export const moverSignIn = async (email: string, password: string) => {
  const res = await api.post(AUTH_API.MOVER_SIGNIN, { email, password });
  return res.data;
};

export const moverGetMe = async () => {
  const res = await api.get(AUTH_API.MOVER_ME);
  return res.data;
};

export const moverLogout = async () => {
  const res = await api.post(AUTH_API.MOVER_LOGOUT);
  return res.data;
};

export const customerSignIn = async (email: string, password: string) => {
  const res = await api.post(AUTH_API.CUSTOMER_SIGNIN, { email, password });
  return res.data;
};

export const customerGetMe = async () => {
  const res = await api.get(AUTH_API.CUSTOMER_ME);
  return res.data;
};

export const customerLogout = async () => {
  const res = await api.post(AUTH_API.CUSTOMER_LOGOUT);
  return res.data;
};
