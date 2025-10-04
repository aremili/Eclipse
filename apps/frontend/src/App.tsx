import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { useSession } from "./lib/auth";
import { Dashboard } from "./pages/Dashboard";
import { LoginPage } from "./pages/LoginPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Navigate to="/dashboard" replace />} />
					<Route path="login" element={<LoginPage />} />
					<Route
						path="dashboard"
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { data: session, isPending } = useSession();

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (!session) {
		return <Navigate to="/login" replace />;
	}

	return <>{children}</>;
}

export default App;
