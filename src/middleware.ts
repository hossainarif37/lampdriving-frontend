import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

const ROUTE_PERMISSIONS = {
    learner: /^\/dashboard\/learner/,
    instructor: /^\/dashboard\/instructor/,
    admin: /^\/dashboard\/admin/
} as const;

const HOME_URL = '/';

type UserRole = keyof typeof ROUTE_PERMISSIONS;

export const config = {
    matcher: '/dashboard/:path*'
}

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const accessToken = req.cookies.get('access-token')?.value;

    const redirectHome = () => NextResponse.redirect(new URL(HOME_URL, req.url));

    if (!accessToken) {
        return redirectHome();
    }

    try {
        const { role } = jwtDecode<{ role: UserRole }>(accessToken);

        const hasAccess = ROUTE_PERMISSIONS[role].test(pathname);

        return hasAccess ? NextResponse.next() : redirectHome();
    } catch {
        return redirectHome();
    }
}