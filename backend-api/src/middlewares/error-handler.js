module.exports = (error, _, res, next) => {
  res.status(error.status || 500);
  const _error = {
    status: error.status,
    error,
  };
  if (process.env.NODE_ENV !== "production") {
    _error["stack"] = error.stack;
  }
  res.json(_error);
  next();
};
