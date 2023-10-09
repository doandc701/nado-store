const generateStorageKey = (key: string) => {
  let environmentKey = import.meta.env.VITE_APP_KEY_CONSTANT;
  return environmentKey ? `${environmentKey}_${key}` : key;
};

export { generateStorageKey };
