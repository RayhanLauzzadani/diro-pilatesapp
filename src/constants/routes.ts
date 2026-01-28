export const ROUTES = {
    HOME: "/",
    STUDIOS: "/studios",
    STUDIO_DETAIL: (id: string) => `/studio/${id}`,
    BOOKING: (id: number) => `/booking/${id}`,
    LOGIN: "/login",
    SIGNUP: "/signup",
    ABOUT: "/about",
} as const;

export const NAV_LINKS = [
    { href: ROUTES.HOME, label: "Home" },
    { href: ROUTES.STUDIOS, label: "Studios" },
    { href: ROUTES.ABOUT, label: "About" },
] as const;
