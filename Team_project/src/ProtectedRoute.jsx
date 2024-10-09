import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
  // Check if user is logged in (you can customize the logic as needed)
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default ProtectedRoute;
