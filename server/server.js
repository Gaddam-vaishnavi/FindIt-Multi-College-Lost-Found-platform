
const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const itemRoutes = require('./routes/itemRoutes');
const collegeRoutes = require('./routes/collegeRoutes');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/colleges', collegeRoutes);

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
