export function resolveSessionCookieDomain(baseUrl = process.env.NEXT_PUBLIC_BASE_URL) {
  if (!baseUrl) {
    return undefined;
  }

  try {
    const hostname = new URL(baseUrl).hostname.toLowerCase();

    if (hostname === "localhost" || /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
      return undefined;
    }

    return hostname.startsWith("www.") ? hostname.slice(4) : hostname;
  } catch {
    return undefined;
  }
}
