import type { Role } from "@prisma/client";
import { SignJWT } from "jose";
import { AUTH_TOKEN_TTL_SECONDS } from "@/lib/constants";

const encoder = new TextEncoder();

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET no está configurado");
  }

  return encoder.encode(secret);
}

export async function createAuthToken(payload: {
  sub: string;
  email: string;
  role: Role;
}) {
  return new SignJWT({
    email: payload.email,
    role: payload.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${AUTH_TOKEN_TTL_SECONDS}s`)
    .sign(getJwtSecret());
}
