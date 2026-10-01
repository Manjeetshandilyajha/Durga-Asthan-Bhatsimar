export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || 'सर्वर में समस्या आएल अछि',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
