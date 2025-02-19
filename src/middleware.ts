import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

const COMMON_PROTECTED_ROUTES = /^\/dashboard\/(profile|settings)/;
const AUTH_ROUTES = /^\/(?:login|register|instructor-registration|forgot-password)$/;

const ROUTE_PERMISSIONS = {
    learner: /^\/dashboard\/learner/,
    instructor: /^\/dashboard\/instructor/,
    admin: /^\/dashboard\/admin/
} as const;

const HOME_URL = '/';
const LOGIN_URL = '/login';

type UserRole = keyof typeof ROUTE_PERMISSIONS;

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/register', '/instructor-registration', '/forgot-password']
};

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const accessToken = req.cookies.get('access-token')?.value;
    const refreshToken = req.cookies.get('refresh-token')?.value;

    const redirectLogin = () => NextResponse.redirect(new URL(LOGIN_URL, req.url));
    const redirectHome = () => NextResponse.redirect(new URL(HOME_URL, req.url));

    // Allow unauthenticated access to auth routes
    if (AUTH_ROUTES.test(pathname)) {
        if (!accessToken && !refreshToken) {
            return NextResponse.next();
        }
        return redirectHome();
    }

    // Check if both tokens are missing
    if (!accessToken && !refreshToken) {
        return redirectLogin();
    }

    try {
        let decodedToken: { role: UserRole, isEmailVerified: boolean } | undefined;

        // Try to decode access token first
        if (accessToken) {
            try {
                decodedToken = jwtDecode<{ role: UserRole, isEmailVerified: boolean }>(accessToken);
            } catch {
                // If access token is invalid, try refresh token
                if (refreshToken) {
                    decodedToken = jwtDecode<{ role: UserRole, isEmailVerified: boolean }>(refreshToken);
                } else {
                    throw new Error('No valid token');
                }
            }
        } else if (refreshToken) {
            // If no access token, try refresh token
            decodedToken = jwtDecode<{ role: UserRole, isEmailVerified: boolean }>(refreshToken);
        }

        if (!decodedToken) {
            return redirectLogin();
        }

        const { role, isEmailVerified } = decodedToken;

        if (isEmailVerified === false) {
            return NextResponse.redirect(new URL('/verify-email', req.url));
        }

        // Check if it's a common protected route
        if (COMMON_PROTECTED_ROUTES.test(pathname)) {
            return NextResponse.next();
        }

        // Check role-specific access
        const hasAccess = ROUTE_PERMISSIONS[role].test(pathname);
        return hasAccess ? NextResponse.next() : redirectHome();

    } catch {
        return redirectLogin();
    }
}