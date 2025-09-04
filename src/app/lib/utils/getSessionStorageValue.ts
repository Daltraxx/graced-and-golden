const getSessionStorageValue = (key: string): string => {
  if (typeof window !== "undefined" && window.sessionStorage) {
    return sessionStorage.getItem(key) || "";
  }
  return "";
};

export default getSessionStorageValue;