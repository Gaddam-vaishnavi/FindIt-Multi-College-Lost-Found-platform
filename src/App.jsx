import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ReportLostItem from './pages/ReportLostItem';
import ReportFoundItem from './pages/ReportFoundItem';
import BrowseItems from './pages/BrowseItems';
import ItemDetails from './pages/ItemDetails';
import Notifications from './pages/Notifications';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/report-lost" element={<ReportLostItem />} />
      <Route path="/report-found" element={<ReportFoundItem />} />
      <Route path="/explore" element={<BrowseItems />} />
      <Route path="/items/:id" element={<ItemDetails />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;