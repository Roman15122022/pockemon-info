export type JsonStorageService = {
  read: <TValue>(key: string, fallback: TValue, normalize: (value: unknown) => TValue) => TValue;
  write: <TValue>(key: string, value: TValue) => void;
  remove: (key: string) => void;
};

export const localStorageService: JsonStorageService = {
  read: (key, fallback, normalize) => {
    if (typeof window === 'undefined') {
      return fallback;
    }

    try {
      const rawValue = window.localStorage.getItem(key);

      if (!rawValue) {
        return fallback;
      }

      return normalize(JSON.parse(rawValue));
    } catch {
      window.localStorage.removeItem(key);
      return fallback;
    }
  },
  write: (key, value) => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage can be unavailable in restricted browser modes. UI state still works in memory.
    }
  },
  remove: (key) => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.removeItem(key);
  },
};
