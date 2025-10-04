import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { signOut, useSession } from "../lib/auth";

export function Layout() {
	const { data: session } = useSession();
	const navigate = useNavigate();

	const handleSignOut = async () => {
		await signOut();
		navigate("/login");
	};

	return (
		<div>
			{/* Navigation using Radix NavigationMenu primitive */}
			<NavigationMenu.Root className="nav-root">
				<div className="nav-container">
					{/* Logo Section */}
					<Link to="/" className="nav-logo-link">
						<div className="nav-logo">A</div>
						<span className="nav-logo-text">Website</span>
					</Link>

					{/* Navigation Menu */}
					<NavigationMenu.List className="NavigationMenuList">
						<NavigationMenu.Item>
							<div className="nav-actions">
								{session ? (
									<>
										<span className="nav-user-email">{session.user.email}</span>
										<button
											type="button"
											onClick={handleSignOut}
											className="button button-danger"
										>
											Sign Out
										</button>
									</>
								) : (
									<Link to="/login" className="button button-primary">
										Login
									</Link>
								)}
							</div>
						</NavigationMenu.Item>
					</NavigationMenu.List>
				</div>
			</NavigationMenu.Root>

			{/* Main Content Area */}
			<main>
				<Outlet />
			</main>
		</div>
	);
}
