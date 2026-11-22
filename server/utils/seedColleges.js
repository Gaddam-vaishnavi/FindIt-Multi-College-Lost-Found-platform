const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const College = require('../models/College');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');

const initialColleges = [
    {
        name: 'B V Raju Institute of Technology',
        code: 'BVRIT',
        location: 'Narsapur, Telangana',
        emailDomain: 'bvrit.ac.in',
        description: 'Premier engineering campus in Narsapur',
        isActive: true
    },
    {
        name: 'Northwood Institute of Technology',
        code: 'NIT',
        location: 'Hyderabad, Telangana',
        emailDomain: 'northwood.edu',
        description: 'Technology and science institute',
        isActive: true
    },
    {
        name: 'Greenfield State University',
        code: 'GSU',
        location: 'Bengaluru, Karnataka',
        emailDomain: 'greenfield.edu',
        description: 'State university campus',
        isActive: true
    },
    {
        name: 'St. Xavier College of Arts & Science',
        code: 'SXC',
        location: 'Mumbai, Maharashtra',
        emailDomain: 'stxavier.edu',
        description: 'Arts, science, and commerce college',
        isActive: true
    },
    {
        name: 'Riverside Engineering College',
        code: 'REC',
        location: 'Pune, Maharashtra',
        emailDomain: 'riverside.edu',
        description: 'Engineering and research institution',
        isActive: true
    }
];

const seedData = async () => {
    try {
        await connectDB();

        for (const col of initialColleges) {
            const existing = await College.findOne({
                $or: [{ name: col.name }, { code: col.code }]
            });
            if (!existing) {
                await College.create(col);
                console.log(`Created college: ${col.name}`);
            }
        }

        // Check if an admin user exists; if not, create a default admin
        const adminUser = await User.findOne({ role: 'admin' });
        if (!adminUser) {
            const hashedPassword = await bcrypt.hash('Admin@12345', 10);
            await User.create({
                fullName: 'Campus Administrator',
                email: 'admin@findit.edu',
                password: hashedPassword,
                college: 'B V Raju Institute of Technology',
                studentId: 'ADMIN-001',
                role: 'admin'
            });
            console.log('Created default admin account: admin@findit.edu / Admin@12345');
        } else {
            console.log('Admin account already exists:', adminUser.email);
        }

        console.log('Data check & seed completed.');
        process.exit(0);
    } catch (err) {
        console.error('Seed error:', err.message);
        process.exit(1);
    }
};

seedData();
