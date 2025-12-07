import "dotenv/config";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { auth } from "./lib/auth";

export const app = express();

// Use Morgan for detailed HTTP request logging
app.use(morgan("combined")); // Use "combined" for Apache-style logs
app.use(
	cors({
		origin: process.env.CORS_ORIGIN || "",
		methods: ["GET", "POST", "PUT", "DELETE"],
		// allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	}),
);

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());

app.get("/", (_req, res) => {
	res.status(200).send("OK");
});
