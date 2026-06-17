import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem('cineverse_user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('cineverse_user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    const userInfo = {
      id: userData.id || Date.now(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
    };
    setUser(userInfo);
    localStorage.setItem('cineverse_user', JSON.stringify(userInfo));
    localStorage.setItem('token', userData.token || 'static-dev-token');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cineverse_user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
