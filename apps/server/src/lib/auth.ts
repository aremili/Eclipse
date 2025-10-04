import { type BetterAuthOptions, betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "../db";

export const auth = betterAuth<BetterAuthOptions>({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	trustedOrigins: [process.env.CORS_ORIGIN || "http://localhost:5173"],
	emailAndPassword: {
		enabled: true,
	},
	advanced: {
		defaultCookieAttributes: {
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			httpOnly: true,
		},
	},
});
console.log("better-auth initialized");
