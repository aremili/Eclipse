import * as Label from "@radix-ui/react-label";
import { type FormEvent, useEffect, useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp, useSession } from "../lib/auth";
import { getErrorMessage } from "../lib/errors";

export function LoginPage() {
	const [isSignUp, setIsSignUp] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { data: session, isPending } = useSession();

	// Generate unique IDs for accessibility
	const nameId = useId();
	const emailId = useId();
	const passwordId = useId();

	// Redirect if already logged in
	useEffect(() => {
		if (session && !isPending) {
			navigate("/dashboard", { replace: true });
		}
	}, [session, isPending, navigate]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			if (isSignUp) {
				const result = await signUp.email({
					email,
					password,
					name,
				});

				if (result.error) {
					throw new Error(result.error.message);
				}
			} else {
				const result = await signIn.email({
					email,
					password,
				});

				if (result.error) {
					throw new Error(result.error.message);
				}
			}
		} catch (err) {
			setError(getErrorMessage(err));
		} finally {
			setLoading(false);
		}
	};

	// Show loading state while checking session
	if (isPending) {
		return (
			<div
				className="page-content"
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<div
			className="page-content"
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<div style={{ maxWidth: "28rem", width: "100%" }}>
				<h1 style={{ textAlign: "center", marginBottom: "var(--space-8)" }}>
					{isSignUp ? "Create your account" : "Sign in to your account"}
				</h1>

				<form onSubmit={handleSubmit}>
					{/* Name field for signup - using Radix Label */}
					{isSignUp && (
						<div className="form-field">
							<Label.Root htmlFor="name" className="form-label">
								Full Name
							</Label.Root>
							<input
								id={nameId}
								type="text"
								required={isSignUp}
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="form-input"
								placeholder="John Doe"
							/>
						</div>
					)}

					{/* Email field - using Radix Label */}
					<div className="form-field">
						<Label.Root htmlFor="email" className="form-label">
							Email Address
						</Label.Root>
						<input
							id={emailId}
							type="email"
							autoComplete="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="form-input"
							placeholder="you@example.com"
						/>
					</div>

					{/* Password field - using Radix Label */}
					<div className="form-field">
						<Label.Root htmlFor="password" className="form-label">
							Password
						</Label.Root>
						<input
							id={passwordId}
							type="password"
							autoComplete="current-password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="form-input"
							placeholder="••••••••"
						/>
					</div>

					{/* Error message */}
					{error && (
						<div className="error-container">
							<p className="error-text">{error}</p>
						</div>
					)}

					{/* Submit button */}
					<button
						type="submit"
						disabled={loading}
						className="button button-primary button-full"
						style={{ marginBottom: "var(--space-4)" }}
					>
						{loading ? "Processing..." : isSignUp ? "Sign up" : "Sign in"}
					</button>

					{/* Toggle between sign in/up */}
					<div style={{ textAlign: "center" }}>
						<button
							type="button"
							onClick={() => setIsSignUp(!isSignUp)}
							style={{
								background: "none",
								border: "none",
								color: "var(--color-primary)",
								fontSize: "0.875rem",
								cursor: "pointer",
								textDecoration: "underline",
							}}
						>
							{isSignUp
								? "Already have an account? Sign in"
								: "Don't have an account? Sign up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
