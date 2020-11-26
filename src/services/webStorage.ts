type AppStorage<T> = {
  [key: string]: T | undefined;
};

const WEB_STORAGE_APP_KEY = 'articles.ts';

export const getStorage = <T>(): AppStorage<T> =>
  JSON.parse(localStorage[WEB_STORAGE_APP_KEY] || '{}');

export const setStorage = <T>(value: AppStorage<T>) => {
  localStorage.setItem(WEB_STORAGE_APP_KEY, JSON.stringify(value));
};

export const getItem = <T>(key: string): T | undefined => {
  const data = getStorage<T>();
  return Object.prototype.hasOwnProperty.call(data, key)
    ? data[key]
    : undefined;
};

export const setItem = <T>(key: string, value: T) => {
  setStorage({ ...getStorage(), [key]: value });
};

export const deleteItem = (key: string) => {
  const data = getStorage();
  delete data[key];
  setStorage(data);
};

export default {
  getStorage,
  setStorage,
  getItem,
  setItem,
  deleteItem
};
