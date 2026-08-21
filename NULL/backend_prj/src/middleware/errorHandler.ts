import { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (req: Request, res: Response, _next: NextFunction) => 
{
  res.status(404).json({
     message: `Route not found: ${req.method} ${req.originalUrl}` 
    });
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => 
{
  console.error('Unhandled error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  return res.status(statusCode).json({ message,...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};