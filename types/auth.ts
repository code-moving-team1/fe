// types/auth.ts
export interface CustomerMe {
  id: number;
  email: string;
  phone: string;
  region: string;
  nickname?: string;
}

export interface MoverMe {
  id: number;
  email: string;
  phone: string;
  nickname: string;
  career: string;
  introduction: string;
  description: string;
}

export type MeResponse = CustomerMe | MoverMe;
