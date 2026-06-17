import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Dashboard from '../pages/Dashboard';
import MovieCatalog from '../pages/MovieCatalog';
import MovieDetail from '../pages/MovieDetail';
import BookingPage from '../pages/BookingPage';
import AdminDashboard from '../pages/AdminDashboard';
import TheatreOwnerDashboard from '../pages/TheatreOwnerDashboard';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />
      <Route path="/movies" element={
        <ProtectedRoute><MovieCatalog /></ProtectedRoute>
      } />
      <Route path="/movies/:id" element={
        <ProtectedRoute><MovieDetail /></ProtectedRoute>
      } />
      <Route path="/booking/:showId" element={
        <ProtectedRoute><BookingPage /></ProtectedRoute>
      } />
      <Route path="/admin" element={
        <ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>
      } />
      <Route path="/theatre-owner" element={
        <ProtectedRoute role="THEATRE_OWNER"><TheatreOwnerDashboard /></ProtectedRoute>
      } />
    </Routes>
  );
}
