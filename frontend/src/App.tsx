import { Routes, Route } from 'react-router-dom';
import { Home, Login, Register, Dashboard, BlogPost } from './pages';
import { Navbar } from './components';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post/:id" element={<BlogPost />} />
      </Routes>
    </div>
  );
};

export default App;