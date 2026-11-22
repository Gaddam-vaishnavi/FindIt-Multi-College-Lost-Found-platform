const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const collegeRoutes = require('./routes/collegeRoutes');
const claimRoutes = require('./routes/claimRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// Middleware
const isProduction = process.env.NODE_ENV === 'production';
const configuredClientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, '') : null;
const extraOrigins = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(o => o.trim().replace(/\/$/, ''))
    .filter(Boolean);

const devOrigins = [
    configuredClientUrl,
    ...extraOrigins,
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173'
].filter(Boolean);

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. tests, curl, mobile clients, server-to-server)
        if (!origin) return callback(null, true);

        const normalizedOrigin = origin.replace(/\/$/, '');

        if (isProduction) {
            const productionAllowed = [
                configuredClientUrl,
                ...extraOrigins
            ].filter(Boolean);

            if (productionAllowed.includes(normalizedOrigin)) {
                return callback(null, true);
            }
            return callback(new Error('CORS policy: This origin is not allowed in production.'));
        }

        // Local development: allow localhost ports and configured client origins
        if (
            devOrigins.includes(normalizedOrigin) ||
            /^http:\/\/localhost(:\d+)?$/.test(normalizedOrigin) ||
            /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(normalizedOrigin)
        ) {
            return callback(null, true);
        }

        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static image uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/claims', claimRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to FindIt Backend API!');
});

// Health check route
app.get('/health', (req, res) => {
    res.json({
        status: 'success',
        message: 'FindIt server is running'
    });
});

// 404 Route Handler
app.use((req, res, next) => {
    res.status(404).json({
        message: `Route ${req.originalUrl} not found`
    });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Unhandled server error:', err.message);
    const statusCode = err.statusCode || (res.statusCode >= 400 ? res.statusCode : 500);
    res.status(statusCode).json({
        message: err.message || 'Internal server error'
    });
});

// Start server after database connection
const startServer = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`FindIt server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Server startup failed:', error.message);
        process.exit(1);
    }
};

startServer();
