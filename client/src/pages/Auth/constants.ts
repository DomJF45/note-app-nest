// password requirements
export const PASS_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/gm;

// username requirements
export const USERNAME_REGEX = /^[a-zA-Z0-9]{3,28}$/;
