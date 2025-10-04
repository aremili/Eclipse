import "dotenv/config";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { auth } from "./lib/auth";

const app = express();

// Use Morgan for detailed HTTP request logging
app.use(morgan("combined")); // Use "combined" for Apache-style logs or "dev" for concise logs
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

app.get("/api/me", async (req, res) => {
	const session = await auth.api.getSession({
		headers: fromNodeHeaders(req.headers),
	});
	return res.json(session);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
