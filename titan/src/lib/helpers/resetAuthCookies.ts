export const resetAuthCookies = () => {
  document.cookie =
    "next-auth.callback-url=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie =
    "next-auth.csrf-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie =
    "next-auth.session-token.0=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie =
    "next-auth.session-token.1=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
