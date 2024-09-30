import { Request, Response } from 'express';
import bcrypt from "bcryptjs";
import { admin } from "../models/admin";


// Render login page
export const loginPage = (req: Request, res: Response) => {
    res.render('login', { error: null });
};

export const loginHandler = async (req: Request, res: Response) =>
{
    const { email, password } = req.body;

    const adminModel: any = await admin.findOne({ where: { email } });

    if (adminModel === null) {
        return res.render('login', { error: 'Invalid credentials' });
    }

    if (adminModel && bcrypt.compareSync(password, adminModel.password)) {
        (req.session as any).admin = {
            id: adminModel.id,
            name: adminModel.name,
            email: adminModel.email
        };
        return res.redirect('/dashboard');
    }

    res.render('login', { error: 'Invalid credentials' });
};

export const logout = (req: Request, res: Response) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};