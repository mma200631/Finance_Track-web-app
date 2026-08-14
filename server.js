
import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import route from './src/route.js';
import { testConnection } from './src/model/db.js';
import session from "express-session";
import flash from "./src/middleware/flash.js";
const app = express();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'development';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SESSION_SECRET = process.env.SESSION_SECRET;

// Set up sessions
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // Session expires after 1 hour of inactivity
}));

// Make the logged-in Finance Track user available to all EJS pages
app.use((req, res, next) => {
    res.locals.financeUser = req.session.financeUser;
    next();
});

// Use flash message middleware
app.use(flash);



// Serve static files
app.use(express.static(path.join(__dirname, 'public')));


// Set EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Read form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Log requests in development
app.use((req, res, next) => {
    if (NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }
    next();
});

// Routes
app.use(route);

// 404 handler
app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

// Start server
app.listen(PORT, async () => {
    try {
        await testConnection();
        console.log(`Server running at http://localhost:${PORT}`);
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
});