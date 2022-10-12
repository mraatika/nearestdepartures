const logger = {
  debug: (...msg: unknown[]) => {
    if (import.meta.env.MODE === 'development') {
      console.debug(...msg);
    }
  },
  error: (...msg: unknown[]) => {
    if (import.meta.env.MODE === 'development') {
      console.error(...msg);
    }
  },
};

export default logger;
