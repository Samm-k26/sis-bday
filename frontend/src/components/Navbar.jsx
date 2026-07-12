import { Gift } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <a href="#" className="logo">
          <Gift className="icon" size={24} />
          <span>Komal's Day</span>
        </a>
        <div className="nav-links">
          <a href="#timeline" className="nav-link">Journey</a>
          <a href="#reasons" className="nav-link">Why You</a>
          <a href="#gallery" className="nav-link">Gallery</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
