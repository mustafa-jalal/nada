import { Router } from 'express';
import { logout, loginPage, loginHandler } from '../controllers/adminController';
import { isAuthenticated } from '../middlewares/authMiddleware';
import { index } from '../controllers/patientsController';

const adminRouter = Router();

// Login route
adminRouter.get('/login', loginPage);
adminRouter.post('/login', loginHandler);
adminRouter.get('/logout', logout);

// Dashboard route
adminRouter.get('/dashboard', isAuthenticated, index);

export { adminRouter };
