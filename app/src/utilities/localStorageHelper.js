export const get = key => {
  const value = localStorage.getItem(key) || 'en';
  window.i18n.locale = value;
  return value;
};

export const set = (key, value) => {
  window.i18n.locale = value;
  localStorage.setItem(key, value);
};

