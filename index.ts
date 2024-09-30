import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import { adminRouter } from './routes/adminRoutes';
import { patientRouter } from './routes/patientRoutes';
import sequelize  from './config/connection';

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to the database
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

// Setup view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/public')))

declare module "express-session" {
    interface SessionData {
        admin: string;
    }
}

// Session setup
app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true
}));

// Routes
app.use('/', adminRouter);
app.use('/patients', patientRouter);


// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
