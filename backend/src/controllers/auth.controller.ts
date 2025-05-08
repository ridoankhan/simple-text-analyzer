import { Request, Response } from 'express';

export const loginSuccess = (req: Request, res: Response) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'User authenticated successfully',
      user: req.user,
    });
  } else {
    res.status(401).json({ success: false, message: 'User not authenticated' });
  }
};

export const logout = (req: Request, res: Response) => {
  req.logout(() => {
    res.redirect('/');
  });
};