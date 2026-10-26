// Base URL of the Webbriks support backend (live chat, AI assistant, tickets). It is public, so there is no
// secret here; NEXT_PUBLIC_APP_URL only overrides it for local testing. The backend allows this site's origin
// through its TRUSTED_ORIGINS setting.
export const API_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://server.webbriks.com";
