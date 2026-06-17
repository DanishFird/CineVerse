import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
