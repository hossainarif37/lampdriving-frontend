import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

const COMMON_PROTECTED_ROUTES = /^\/dashboard\/(profile|settings)/;
const AUTH_ROUTES = /^\/(?:login|register|instructor-registration)$/;

const ROUTE_PERMISSIONS = {
    learner: /^\/dashboard\/learner/,
    instructor: /^\/dashboard\/instructor/,
    admin: /^\/dashboard\/admin/
} as const;

const HOME_URL = '/';
const LOGIN_URL = '/login';

type UserRole = keyof typeof ROUTE_PERMISSIONS;

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/register', '/instructor-registration']
};

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const accessToken = req.cookies.get('access-token')?.value;

    const redirectLogin = () => NextResponse.redirect(new URL(LOGIN_URL, req.url));
    const redirectHome = () => NextResponse.redirect(new URL(HOME_URL, req.url));

    // Check for authentication
    if (!accessToken) {
        if (AUTH_ROUTES.test(pathname)) {
            return NextResponse.next();
        }
        return redirectLogin();
    }

    try {
        const { role } = jwtDecode<{ role: UserRole }>(accessToken);

        if (AUTH_ROUTES.test(pathname)) {
            return redirectHome();
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