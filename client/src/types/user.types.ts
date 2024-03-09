export interface iUser {
  id: number;
  username: string;
  email: string;
  password: string;
}

export type iLoginUser = Pick<iUser, "email" | "password">;

export type iRegisterUser = Omit<iUser, "id">;
