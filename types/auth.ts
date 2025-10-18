// types/auth.ts
export interface CustomerMe {
  id: number;
  email: string;
  phone: string;
  region: string;
  nickname?: string;
  name?: string;
}

export interface MoverMe {
  id: number;
  email: string;
  phone: string;
  nickname: string;
  career: string;
  introduction: string;
  description: string;
  name?: string;
}

export type MeResponse = CustomerMe | MoverMe;
