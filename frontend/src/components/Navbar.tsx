import { Link } from 'react-router-dom';
import { Button } from '@radix-ui/react-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, logout } from '../redux/authSlice';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">BlogApp</Link>
      <div className="space-x-4">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <Button onClick={() => dispatch(logout())} variant="destructive">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;