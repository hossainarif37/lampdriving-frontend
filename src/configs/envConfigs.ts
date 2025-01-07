export const envConfigs = {
    apiUrl: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}${process.env.NEXT_PUBLIC_API_VERSION}`,
    stripeClientKey: process.env.NEXT_PUBLIC_STRIPE_CLIENT_KEY,
    stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
}