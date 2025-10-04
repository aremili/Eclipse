import { useSession } from "../lib/auth";

export function Dashboard() {
	const { data: session } = useSession();

	return (
		<div className="page-content container">
			<div
				style={{
					border: "4px dashed var(--color-border)",
					borderRadius: "var(--radius-lg)",
					padding: "var(--space-8)",
				}}
			>
				<h1 style={{ marginBottom: "var(--space-4)" }}>Welcome to Dashboard</h1>
				<p style={{ color: "var(--color-text-secondary)" }}>
					You are logged in as: <strong>{session?.user.email}</strong>
				</p>
			</div>
		</div>
	);
}
