type AppStorage<T> = {
  [key: string]: T | undefined;
};

const WEB_STORAGE_APP_KEY = 'articles.ts';

export const getStorage = <T>(): AppStorage<T> =>
  JSON.parse(localStorage[WEB_STORAGE_APP_KEY] || '{}');

export const setStorage = <T>(value: AppStorage<T>) => {
  localStorage.setItem(WEB_STORAGE_APP_KEY, JSON.stringify(value));
};

export const setItem = <T>(key: string, value: T) => {
  setStorage({ ...getStorage(), [key]: value });
};

export default {
  getStorage,
  setStorage,
  setItem,
};
