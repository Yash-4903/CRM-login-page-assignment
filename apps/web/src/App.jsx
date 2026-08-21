import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { useToast } from './hooks/useToast';
import { setUnauthorizedHandler, clearToken, getToken } from './lib/api';
import useAuth from './hooks/useAuth';
import ToastContainer, { ToastProvider } from './components/ToastContainer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

function SessionGuard() {
  const { error: errorToast } = useToast();
  const { dispatch } = useAuth();

  useEffect(() => {
    setUnauthorizedHandler(() => {
      if (!getToken()) return;
      clearToken();
      dispatch({ type: 'LOGOUT' });
      errorToast('Your session has expired. Please login again.', 'Session expired');
    });
  }, [dispatch, errorToast]);

  return null;
}

function AppRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          isLoading ? (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gray-200 border-t-primary rounded-full animate-spin" />
            </div>
          ) : isAuthenticated ? (
            <DashboardPage />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/" element={<Navigate to={isAuthenticated || isLoading ? '/dashboard' : '/login'} replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <SessionGuard />
          <AppRoutes />
        </BrowserRouter>
        <ToastContainer />
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;