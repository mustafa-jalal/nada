import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.admin) {
        console.log(req.session.admin);
        next();
    } else {
        res.redirect('/login');
    }
};
