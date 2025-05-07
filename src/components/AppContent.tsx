import * as React from 'react';
import { memo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useProfileContext } from '../context/ProfileContext';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import UserSearch from './UserSearch';
import UserProfile from '../pages/UserProfile';

const LoadingSpinner = () => (
  <div className="loading-spinner">Loading...</div>
);

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = memo(({ children }) => {
  const { profile, loading } = useProfileContext();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!profile) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
});

ProtectedRoute.displayName = 'ProtectedRoute';

const AppContent: React.FC = () => {
  const { profile, loading } = useProfileContext();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <>
      <UserSearch />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/" 
          element={<Navigate to={profile ? "/profile" : "/login"} replace />} 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route path="/user/:walletAddress" element={<UserProfile />} />
      </Routes>
    </>
  );
};

export default memo(AppContent); 