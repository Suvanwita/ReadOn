import Cookies from "js-cookie";

export const getToken = (): string | undefined => {
  if (typeof window === "undefined") return undefined;
  return Cookies.get("token");
};

export const setToken = (token: string) => {
  // 2 days to match backend jwt expiry; adjust as you prefer
  Cookies.set("token", token, { expires: 2, sameSite: "lax" });
};

export const removeToken = () => {
  Cookies.remove("token");
};

// Lightweight JWT parser (no verification) to read payload
export function parseJwt<T = any>(token: string): T {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload) as T;
}
