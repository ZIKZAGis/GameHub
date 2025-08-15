import { SignJWT, jwtVerify, JWTPayload } from "jose";

const secretKey = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "dev_secret";
const encoder = new TextEncoder()

export async function signJwt(
    payload: JWTPayload,
    options?: {exp?: string}
): Promise<string> {
    return await new SignJWT(payload)
        .setProtectedHeader({alg: "HS256", typ: "JWT"})
        .setIssuedAt()
        .setExpirationTime(options?.exp ?? "7d")
        .sign(encoder.encode(secretKey))
}

export async function verifyJwt<T = JWTPayload>(token: string): Promise<T | null> {
    try {
        const {payload} = await jwtVerify(token, encoder.encode(secretKey))
        return payload as T
    } catch {
        return null
    }
}