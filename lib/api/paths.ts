// lib/api/paths.ts
export const AUTH_API = {
  //기사 (MOVER)
  MOVER_SIGNIN: "/auth/mover/signin",
  MOVER_SIGNUP: "/auth/mover/signup",
  MOVER_ME: "/auth/mover/me",
  MOVER_REFRESH: "/auth/customer/refresh-token",
  MOVER_LOGOUT: "/auth/mover/logout", 

  //일반고객 (CUSTOMER)
  CUSTOMER_SIGNIN: "/auth/customer/signin",
  CUSTOMER_SIGNUP: "/auth/customer/signup",
  CUSTOMER_ME: "/auth/customer/me",
  CUSTOMER_REFRESH: "/auth/customer/refresh-token",
  CUSTOMER_LOGOUT: "/auth/customer/logout",
};
