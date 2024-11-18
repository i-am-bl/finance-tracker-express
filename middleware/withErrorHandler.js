/*
 * Middleware for wrapping controllers in try catch blocks.
 */
export const withErrorHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
