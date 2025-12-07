import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import { app } from "../app";

// Mock the auth library to avoid DB connections
vi.mock("../lib/auth", () => ({
  auth: {
    handler: vi.fn((req, res) => {
      res.status(200).send("Auth Handler");
    }),
    api: {
        signInEmail: vi.fn(),
        signUpEmail: vi.fn()
    }
  },
}));

// We also need to mock better-auth/node toNodeHandler
vi.mock("better-auth/node", () => ({
  toNodeHandler: (authObj) => (req, res, next) => {
    // Mimic the behavior of handling the request
    res.status(200).json({ message: "Auth endpoint hit" });
  }
}));

describe("Server App", () => {
  it("GET / should return 200 OK", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("OK");
  });

  it("POST /api/auth/signin should be handled by better-auth", async () => {
    const res = await request(app).post("/api/auth/signin");
    // Since we mocked toNodeHandler, we expect the response we defined in the mock
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Auth endpoint hit" });
  });
});
