import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check for the auth token in localStorage
  const isAuthenticated = !!localStorage.getItem('authToken');

  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child components (e.g., DashboardPage)
  return children;
};

export default ProtectedRoute;