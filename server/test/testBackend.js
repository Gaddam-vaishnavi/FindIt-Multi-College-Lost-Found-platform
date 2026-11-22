const http = require('http');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');

const authRoutes = require('../routes/authRoutes');
const itemRoutes = require('../routes/itemRoutes');
const collegeRoutes = require('../routes/collegeRoutes');
const claimRoutes = require('../routes/claimRoutes');
const notificationRoutes = require('../routes/notificationRoutes');
const adminRoutes = require('../routes/adminRoutes');
const uploadRoutes = require('../routes/uploadRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/claims', claimRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
});

let server;
let BASE_URL;

const passed = [];
const failed = [];

function assert(condition, testName, details = '') {
    if (condition) {
        console.log(`  [PASS] ${testName}`);
        passed.push(testName);
    } else {
        console.error(`  [FAIL] ${testName} - ${details}`);
        failed.push({ testName, details });
    }
}

async function request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const headers = options.headers || {};
    if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(options.body);
    }
    const res = await fetch(url, { ...options, headers });
    let data;
    try {
        data = await res.json();
    } catch {
        data = null;
    }
    return { status: res.status, data };
}

async function runTests() {
    console.log('=== STARTING BACKEND INTEGRATION TESTS ===\n');
    await connectDB();

    server = http.createServer(app);
    await new Promise((resolve) => server.listen(0, resolve));
    const port = server.address().port;
    BASE_URL = `http://127.0.0.1:${port}`;
    console.log(`Test server running at ${BASE_URL}\n`);

    const timestamp = Date.now();
    const testStudentEmail = `student_${timestamp}@bvrit.ac.in`;
    const testStudent2Email = `student2_${timestamp}@northwood.edu`;
    const password = 'Password@123';

    let studentToken = '';
    let student2Token = '';
    let adminToken = '';
    let createdCollegeId = '';
    let createdLostItemId = '';
    let createdFoundItemId = '';
    let createdClaimId = '';
    let createdNotificationId = '';

    try {
        // --- AUTH TESTS ---
        console.log('--- 1. AUTHENTICATION & USER MANAGEMENT ---');
        
        // Register Student 1
        const regRes = await request('/api/auth/register', {
            method: 'POST',
            body: {
                fullName: 'Alice Test Student',
                email: testStudentEmail,
                password,
                confirmPassword: password,
                college: 'B V Raju Institute of Technology',
                studentId: `STU-${timestamp}`
            }
        });
        assert(regRes.status === 201 && regRes.data.user.email === testStudentEmail, 'Student registration successful');

        // Duplicate email rejection
        const dupRes = await request('/api/auth/register', {
            method: 'POST',
            body: {
                fullName: 'Alice Clone',
                email: testStudentEmail,
                password,
                confirmPassword: password,
                college: 'B V Raju Institute of Technology',
                studentId: `STU-DUP`
            }
        });
        assert(dupRes.status === 409, 'Duplicate registration rejected with 409');

        // Register Student 2
        await request('/api/auth/register', {
            method: 'POST',
            body: {
                fullName: 'Bob Test Student',
                email: testStudent2Email,
                password,
                confirmPassword: password,
                college: 'Northwood Institute of Technology',
                studentId: `STU2-${timestamp}`
            }
        });

        // Invalid credentials rejection
        const badLoginRes = await request('/api/auth/login', {
            method: 'POST',
            body: { email: testStudentEmail, password: 'WrongPassword' }
        });
        assert(badLoginRes.status === 401, 'Invalid password rejected with 401');

        // Login Student 1
        const login1 = await request('/api/auth/login', {
            method: 'POST',
            body: { email: testStudentEmail, password }
        });
        assert(login1.status === 200 && login1.data.token, 'Student 1 login successful and returned JWT');
        studentToken = login1.data.token;

        // Login Student 2
        const login2 = await request('/api/auth/login', {
            method: 'POST',
            body: { email: testStudent2Email, password }
        });
        student2Token = login2.data.token;

        // Login Admin
        const loginAdmin = await request('/api/auth/login', {
            method: 'POST',
            body: { email: 'admin@findit.edu', password: 'Admin@12345' }
        });
        assert(loginAdmin.status === 200 && loginAdmin.data.user.role === 'admin', 'Admin login successful with admin role');
        adminToken = loginAdmin.data.token;

        // GET /api/auth/me
        const meRes = await request('/api/auth/me', {
            headers: { Authorization: `Bearer ${studentToken}` }
        });
        assert(meRes.status === 200 && meRes.data.user.email === testStudentEmail && !meRes.data.user.password, 'GET /api/auth/me returned safe user without password');

        // Protected route with missing token
        const noAuthRes = await request('/api/auth/me');
        assert(noAuthRes.status === 401, 'Missing token rejected with 401');

        // Protected route with invalid token
        const badTokenRes = await request('/api/auth/me', {
            headers: { Authorization: 'Bearer invalid.token.value' }
        });
        assert(badTokenRes.status === 401, 'Malformed token rejected with 401');

        // Forgot password
        const forgotRes = await request('/api/auth/forgot-password', {
            method: 'POST',
            body: { email: testStudentEmail }
        });
        assert(forgotRes.status === 200, 'Forgot password returns 200');

        // --- COLLEGE TESTS ---
        console.log('\n--- 2. COLLEGE MANAGEMENT ---');

        // Public get colleges
        const collegesRes = await request('/api/colleges');
        assert(collegesRes.status === 200 && collegesRes.data.colleges.length > 0, 'GET /api/colleges retrieved active colleges');
        const firstCollegeId = collegesRes.data.colleges[0]._id;

        // Public get college by ID
        const singleCollegeRes = await request(`/api/colleges/${firstCollegeId}`);
        assert(singleCollegeRes.status === 200 && singleCollegeRes.data.college._id === firstCollegeId, 'GET /api/colleges/:id returned single college');

        // Student attempting to create college (must be blocked)
        const studentCreateColRes = await request('/api/colleges', {
            method: 'POST',
            headers: { Authorization: `Bearer ${studentToken}` },
            body: { name: 'Illegal Student College', code: 'ISC', location: 'Nowhere' }
        });
        assert(studentCreateColRes.status === 403, 'Student prevented from creating college (403)');

        // Admin creating college
        const uniqueCode = `COL_${timestamp.toString().slice(-4)}`;
        const adminCreateColRes = await request('/api/colleges', {
            method: 'POST',
            headers: { Authorization: `Bearer ${adminToken}` },
            body: {
                name: `Test Campus ${timestamp}`,
                code: uniqueCode,
                location: 'Hyderabad, India'
            }
        });
        assert(adminCreateColRes.status === 201 && adminCreateColRes.data.college.code === uniqueCode, 'Admin successfully created college');
        createdCollegeId = adminCreateColRes.data.college._id;

        // Admin updating college
        const updateColRes = await request(`/api/colleges/${createdCollegeId}`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${adminToken}` },
            body: { location: 'Updated Campus Location' }
        });
        assert(updateColRes.status === 200 && updateColRes.data.college.location === 'Updated Campus Location', 'Admin successfully updated college');

        // Admin deactivating college
        const statusColRes = await request(`/api/colleges/${createdCollegeId}/status`, {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${adminToken}` },
            body: { isActive: false }
        });
        assert(statusColRes.status === 200 && statusColRes.data.college.isActive === false, 'Admin successfully toggled college status');

        // --- ITEM TESTS ---
        console.log('\n--- 3. LOST AND FOUND ITEM MANAGEMENT ---');

        // Report lost item (Student 1)
        const createLostRes = await request('/api/items', {
            method: 'POST',
            headers: { Authorization: `Bearer ${studentToken}` },
            body: {
                title: 'Blue Spiral Notebook',
                description: 'Engineering chemistry notes with name written inside cover',
                category: 'Books & Stationery',
                type: 'lost',
                location: 'Library 1st floor reading table',
                date: new Date().toISOString()
            }
        });
        assert(createLostRes.status === 201 && createLostRes.data.item.college === 'B V Raju Institute of Technology', 'Reported lost item enforces user college');
        createdLostItemId = createLostRes.data.item._id;

        // Report found item without image — must be rejected (new validation)
        const noImageFoundRes = await request('/api/items', {
            method: 'POST',
            headers: { Authorization: `Bearer ${student2Token}` },
            body: {
                title: 'Casio Scientific Calculator fx-991EX',
                description: 'Found under desk in hall 102',
                category: 'Electronics',
                type: 'found',
                location: 'Seminar Hall 102',
                date: new Date().toISOString()
            }
        });
        assert(noImageFoundRes.status === 400, 'Found item without image rejected with 400');

        // Report found item (Student 2) — with image URL provided
        const createFoundRes = await request('/api/items', {
            method: 'POST',
            headers: { Authorization: `Bearer ${student2Token}` },
            body: {
                title: 'Casio Scientific Calculator fx-991EX',
                description: 'Found under desk in hall 102',
                category: 'Electronics',
                type: 'found',
                location: 'Seminar Hall 102',
                date: new Date().toISOString(),
                image: '/uploads/test-image.jpg'
            }
        });
        assert(createFoundRes.status === 201 && createFoundRes.data.item.type === 'found', 'Reported found item successfully (with image)');
        createdFoundItemId = createFoundRes.data.item._id;

        // Future date rejection
        const futureDateRes = await request('/api/items', {
            method: 'POST',
            headers: { Authorization: `Bearer ${studentToken}` },
            body: {
                title: 'Future Item',
                description: 'Item from the future',
                category: 'Electronics',
                type: 'lost',
                location: 'Main Gate',
                date: new Date(Date.now() + 86400000 * 2).toISOString()
            }
        });
        assert(futureDateRes.status === 400, 'Future item date rejected with 400');

        // Browse items with pagination
        const browseRes = await request('/api/items?page=1&limit=5');
        assert(browseRes.status === 200 && Array.isArray(browseRes.data.items) && browseRes.data.totalItems >= 2, 'GET /api/items supports pagination');

        // Verify public items do not expose reporter email or studentId
        const publicItem = browseRes.data.items.find(i => i.reportedBy);
        assert(
            !publicItem || (!publicItem.reportedBy.email && !publicItem.reportedBy.studentId),
            'Public GET /api/items does not expose reporter email or studentId'
        );

        // Search & filter
        const searchRes = await request('/api/items/search?keyword=Calculator&category=Electronics&type=found');
        assert(searchRes.status === 200 && searchRes.data.items.length >= 1 && searchRes.data.items[0].title.includes('Calculator'), 'GET /api/items/search filtered by keyword, category, and type');

        // Item details (public request without token)
        const detailsRes = await request(`/api/items/${createdLostItemId}`);
        assert(detailsRes.status === 200 && detailsRes.data.item.title === 'Blue Spiral Notebook', 'GET /api/items/:id retrieved item details');
        assert(
            !detailsRes.data.item.reportedBy.email && !detailsRes.data.item.reportedBy.studentId,
            'Public GET /api/items/:id does not expose reporter email or studentId'
        );

        // Item details (authorized owner request with token)
        const ownerDetailsRes = await request(`/api/items/${createdLostItemId}`, {
            headers: { Authorization: `Bearer ${studentToken}` }
        });
        assert(
            ownerDetailsRes.status === 200 && ownerDetailsRes.data.item.reportedBy.email === testStudentEmail,
            'Authorized owner GET /api/items/:id retrieves reporter email'
        );

        // Unauthorized student update attempt (Student 2 trying to update Student 1's item)
        const illegalUpdateRes = await request(`/api/items/${createdLostItemId}`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${student2Token}` },
            body: { title: 'Hacked Title' }
        });
        assert(illegalUpdateRes.status === 403, 'Unauthorized student update rejected with 403');

        // Owner updating own item
        const legalUpdateRes = await request(`/api/items/${createdLostItemId}`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${studentToken}` },
            body: { description: 'Updated notebook description: contains chemistry and physics notes.' }
        });
        assert(legalUpdateRes.status === 200 && legalUpdateRes.data.item.description.includes('chemistry and physics'), 'Item owner successfully updated item');

        // --- CLAIM WORKFLOW TESTS ---
        console.log('\n--- 4. CLAIM AND ITEM RECOVERY WORKFLOW ---');

        // Student 1 claims found item reported by Student 2
        const claimRes = await request('/api/claims', {
            method: 'POST',
            headers: { Authorization: `Bearer ${studentToken}` },
            body: {
                itemId: createdFoundItemId,
                identifyingInfo: 'Has my initials AV scratched faintly on the back cover and battery door.'
            }
        });
        assert(claimRes.status === 201 && claimRes.data.claim.status === 'pending', 'Submitted claim on found item');
        createdClaimId = claimRes.data.claim._id;

        // Prevent self-claim
        const selfClaimRes = await request('/api/claims', {
            method: 'POST',
            headers: { Authorization: `Bearer ${student2Token}` },
            body: {
                itemId: createdFoundItemId,
                identifyingInfo: 'Claiming my own found item'
            }
        });
        assert(selfClaimRes.status === 400, 'Self-claim on own report rejected with 400');

        // Prevent duplicate active claim
        const dupClaimRes = await request('/api/claims', {
            method: 'POST',
            headers: { Authorization: `Bearer ${studentToken}` },
            body: {
                itemId: createdFoundItemId,
                identifyingInfo: 'Duplicate claim attempt'
            }
        });
        assert(dupClaimRes.status === 409, 'Duplicate active claim rejected with 409');

        // Item status should now be 'claim pending'
        const checkItemStatus = await request(`/api/items/${createdFoundItemId}`);
        assert(checkItemStatus.data.item.status === 'claim pending', 'Item status changed to "claim pending"');

        // Get received claims for Student 2
        const receivedClaimsRes = await request('/api/claims/received', {
            headers: { Authorization: `Bearer ${student2Token}` }
        });
        assert(receivedClaimsRes.status === 200 && receivedClaimsRes.data.claims.length >= 1, 'GET /api/claims/received returned claims on user items');

        // Student 1 (non-reporter) trying to review claim (must be blocked)
        const illegalReviewRes = await request(`/api/claims/${createdClaimId}/review`, {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${studentToken}` },
            body: { status: 'approved' }
        });
        assert(illegalReviewRes.status === 403, 'Non-reporter student cannot review claim (403)');

        // Student 2 (reporter) approves the claim
        const approveClaimRes = await request(`/api/claims/${createdClaimId}/review`, {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${student2Token}` },
            body: {
                status: 'approved',
                reviewNotes: 'Initials verified. Please meet at library reception at 4pm.'
            }
        });
        assert(approveClaimRes.status === 200 && approveClaimRes.data.claim.status === 'approved', 'Reporter approved claim successfully');

        // Item status should now be 'claimed'
        const checkClaimedItem = await request(`/api/items/${createdFoundItemId}`);
        assert(checkClaimedItem.data.item.status === 'claimed', 'Item status updated to "claimed" after approval');

        // --- NOTIFICATION TESTS ---
        console.log('\n--- 5. NOTIFICATIONS ---');

        // ---- item_report notification tests ----
        // Admin (BVRIT college) should have received a notification for Student 1's lost item (also BVRIT)
        const adminNotifsRes = await request('/api/notifications', {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        assert(adminNotifsRes.status === 200, 'GET /api/notifications succeeded for admin');

        const adminNotifs = adminNotifsRes.data.notifications || [];
        const lostItemNotif = adminNotifs.find(
            (n) => n.type === 'item_report' && n.title && n.title.includes('Lost')
        );
        assert(
            !!lostItemNotif,
            'Admin received item_report notification for Lost item from same college'
        );
        assert(
            lostItemNotif && lostItemNotif.description && lostItemNotif.description.includes('Blue Spiral Notebook'),
            'Admin item_report notification contains the lost item name'
        );

        // Admin (BVRIT) should NOT have received a notification for Student 2's found item (Northwood)
        const foundItemNotifForAdmin = adminNotifs.find(
            (n) => n.type === 'item_report' && n.title && n.title.includes('Found') && n.description && n.description.includes('Casio Scientific Calculator')
        );
        assert(
            !foundItemNotifForAdmin,
            'Admin of BVRIT did NOT receive item_report notification for Found item from a different college (Northwood)'
        );

        // Student 1 should NOT have received any item_report notifications (students are never notified about new reports)
        const studentNotifsBefore = await request('/api/notifications', {
            headers: { Authorization: `Bearer ${studentToken}` }
        });
        const studentItemReportNotifs = (studentNotifsBefore.data.notifications || []).filter(
            (n) => n.type === 'item_report'
        );
        assert(
            studentItemReportNotifs.length === 0,
            'Student does not receive item_report notifications'
        );
        // ---- end item_report notification tests ----

        // Student 1 should have received a notification for claim approval
        const notifsRes = await request('/api/notifications', {
            headers: { Authorization: `Bearer ${studentToken}` }
        });
        assert(notifsRes.status === 200 && notifsRes.data.notifications.length >= 1, 'GET /api/notifications retrieved user notifications');
        createdNotificationId = notifsRes.data.notifications[0]._id;

        // Unread count
        const unreadRes = await request('/api/notifications/unread-count', {
            headers: { Authorization: `Bearer ${studentToken}` }
        });
        assert(unreadRes.status === 200 && typeof unreadRes.data.unreadCount === 'number', 'GET /api/notifications/unread-count returned number');

        // Mark single notification read
        const markOneRes = await request(`/api/notifications/${createdNotificationId}/read`, {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${studentToken}` }
        });
        assert(markOneRes.status === 200 && markOneRes.data.notification.isRead === true, 'Marked single notification as read');

        // Mark all notifications read
        const markAllRes = await request('/api/notifications/read-all', {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${studentToken}` }
        });
        assert(markAllRes.status === 200, 'Marked all notifications as read');

        // --- ADMIN DASHBOARD TESTS ---
        console.log('\n--- 6. ADMIN DASHBOARD & AUTHORIZATION ---');

        // Ordinary student blocked from admin dashboard
        const studentAdminRes = await request('/api/admin/dashboard', {
            headers: { Authorization: `Bearer ${studentToken}` }
        });
        assert(studentAdminRes.status === 403, 'Ordinary student blocked from admin dashboard (403)');

        // Admin accessing dashboard stats
        const adminDashboardRes = await request('/api/admin/dashboard', {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        assert(
            adminDashboardRes.status === 200 &&
            adminDashboardRes.data.stats.totalUsers >= 2 &&
            adminDashboardRes.data.stats.totalColleges >= 1,
            'Admin successfully retrieved platform statistics'
        );

        // Admin user management
        const adminUsersRes = await request('/api/admin/users', {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        assert(adminUsersRes.status === 200 && adminUsersRes.data.users.length >= 2, 'Admin retrieved user directory');

        // Admin item management
        const adminItemsRes = await request('/api/admin/items', {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        assert(adminItemsRes.status === 200 && adminItemsRes.data.items.length >= 2, 'Admin retrieved item listings');

        // Admin claim management
        const adminClaimsRes = await request('/api/admin/claims', {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        assert(adminClaimsRes.status === 200 && adminClaimsRes.data.claims.length >= 1, 'Admin retrieved claim records');

        // Clean up test items
        await request(`/api/items/${createdLostItemId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${studentToken}` }
        });
        assert(true, 'Test lost item cleaned up successfully');

    } catch (err) {
        console.error('Test execution error:', err);
    } finally {
        if (server) {
            server.close();
        }
        console.log('\n=== TEST SUMMARY ===');
        console.log(`Passed: ${passed.length}`);
        console.log(`Failed: ${failed.length}`);
        if (failed.length > 0) {
            console.error('Failed Tests:', JSON.stringify(failed, null, 2));
            process.exit(1);
        } else {
            console.log('ALL TESTS PASSED SUCCESSFULLY!\n');
            process.exit(0);
        }
    }
}

runTests();
