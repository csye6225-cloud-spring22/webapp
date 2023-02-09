import { describe, it, expect } from "vitest";
import hash_pwd from "../util/hash_pwd";

describe("Password Hash", () => {
  it("Hashing the password", async () => {
    const password = "password";

    const hashedPwd = await hash_pwd.toHash(password);

    expect(hashedPwd).not.toBe(password);
  });
});

describe("Password Hash and Compare", () => {
  it("Hashing it and comparing it", async () => {
    const password = "password";

    const hashedPwd = await hash_pwd.toHash(password);

    const matchedPwd = await hash_pwd.comparePassword(
      password,
      hashedPwd
    );

    expect(hashedPwd).not.toBe(matchedPwd);
  });
});

