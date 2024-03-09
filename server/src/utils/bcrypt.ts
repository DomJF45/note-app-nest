import * as bcrypt from 'bcrypt';

export function hashPassword(rawPass: string): string {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(rawPass, SALT);
}

export function comparePass(password: string, hashedPass: string): boolean {
  return bcrypt.compareSync(password, hashedPass);
}
