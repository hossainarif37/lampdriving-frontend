export type User = {
    email: string;
    name: string;
    _id: string;
}

export type authSliceState = {
    isAuthenticate: boolean;
    isAuthLoading: boolean;
    user: User | null;
}