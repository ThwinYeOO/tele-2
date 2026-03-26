import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from './auth.js';

export type AuthedRequest = Request & {
  auth?: { userId: string; role: string; email: string; name: string };
};

export function authRequired(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.header('authorization');
  const token = header?.startsWith('Bearer ') ? header.slice('Bearer '.length) : undefined;
  if (!token) return res.status(401).json({ error: 'Missing token' });

  try {
    const decoded = verifyToken(token);
    req.auth = { userId: decoded.sub, role: decoded.role, email: decoded.email, name: decoded.name };
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export function requireRole(roles: string[]) {
  return (req: AuthedRequest, res: Response, next: NextFunction) => {
    if (!req.auth) return res.status(401).json({ error: 'Missing auth' });
    if (!roles.includes(req.auth.role)) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}

