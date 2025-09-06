/**
 * Safely reads a value from sessionStorage.
 * Returns a fallback when not in a browser or when storage is unavailable.
 */

const getSessionStorageValue = (key: string): string => {
  if (typeof window === "undefined" || !("sessionStorage" in window)) {
    return "";
  }
  try {
    return window.sessionStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
};

export default getSessionStorageValue;
