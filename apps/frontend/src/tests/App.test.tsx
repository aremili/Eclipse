import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import App from '../App';
import { useSession } from '../lib/auth';

// Mock the auth module
vi.mock('../lib/auth', () => {
    return {
        useSession: vi.fn(() => ({ data: null, isPending: false, error: null })),
        authClient: {
            signIn: {
                email: vi.fn()
            },
            signUp: {
                email: vi.fn()
            },
            signOut: vi.fn()
        },
        signOut: vi.fn()
    };
});

// Mock child components
vi.mock('../pages/Dashboard', () => ({
    Dashboard: () => <div>Dashboard Page</div>
}));

vi.mock('../pages/LoginPage', () => ({
    LoginPage: () => <div>Login Page</div>
}));

describe('App', () => {
    it('redirects to login when not authenticated', async () => {
        (useSession as Mock).mockReturnValue({
            data: null,
            isPending: false,
            error: null
        });

        render(<App />);

        await waitFor(() => {
            expect(screen.getByText('Login Page')).toBeTruthy();
        });
    });

    it('shows dashboard when authenticated', async () => {
        (useSession as Mock).mockReturnValue({
            data: {
                user: { id: '1', name: 'Test User', email: 'test@example.com' },
                session: { id: '1', token: 'token', userId: '1', expiresAt: new Date(), ipAddress: null, userAgent: null }
            },
            isPending: false,
            error: null
        });

        render(<App />);

        await waitFor(() => {
            expect(screen.getByText('Dashboard Page')).toBeTruthy();
        });
    });

    it('shows loading state when session is pending', async () => {
        (useSession as Mock).mockReturnValue({
            data: null,
            isPending: true,
            error: null
        });

        render(<App />);

        await waitFor(() => {
             expect(screen.getByText('Loading...')).toBeTruthy();
        });
    });
});
