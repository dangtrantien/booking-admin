import { redirect } from 'react-router-dom';

// ==================================================

const ProtectedRoute = () => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    return redirect('/login');
  }
};

export default ProtectedRoute;
