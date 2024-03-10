/*
 * Shared user types file so that user types aren't contained in either pages/ or components/ since both need access
 */

// user interface
export interface iUser {
  id: number;
  username: string;
  email: string;
  password: string;
}

// type for user login
export type iLoginUser = Pick<iUser, "email" | "password">;
// type for user registration
export type iRegisterUser = Omit<iUser, "id">;
