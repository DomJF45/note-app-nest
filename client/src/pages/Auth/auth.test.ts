import { expect, suite, test } from "vitest";
import { PASS_REGEX, USERNAME_REGEX } from "./constants";

suite("password validation", () => {
  test("password passes regex", () => {
    const password = "Password123!";
    expect(PASS_REGEX.test(password)).toBe(true);
  });
  test("password without capital letter", () => {
    const password = "password123!";
    expect(PASS_REGEX.test(password)).toBe(false);
  });
  test("password without lowercase letter", () => {
    const password = "PASSWORD123!";
    expect(PASS_REGEX.test(password)).toBe(false);
  });
  test("password without number", () => {
    const password = "Password!";
    expect(PASS_REGEX.test(password)).toBe(false);
  });
  test("password without special char", () => {
    const password = "Password123";
    expect(PASS_REGEX.test(password)).toBe(false);
  });
  test("password below min charlength", () => {
    const password = "Pass";
    expect(PASS_REGEX.test(password)).toBe(false);
  });
});

suite("username validation", () => {
  test("username passes regex", () => {
    const username = "Johndoe97";
    expect(USERNAME_REGEX.test(username)).toBe(true);
  });
  test("username with space", () => {
    const username = "John doe 97";
    expect(USERNAME_REGEX.test(username)).toBe(false);
  });
  test("username with special char", () => {
    const username = "Johndoe97!";
    expect(USERNAME_REGEX.test(username)).toBe(false);
  });
  test("username with special char AND space", () => {
    const username = "John Doe 97 !!!";
    expect(USERNAME_REGEX.test(username)).toBe(false);
  });
});
