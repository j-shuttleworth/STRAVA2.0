import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-orange-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold flex items-center">
          <Activity className="w-6 h-6 mr-2" />
          Strava Activity Viewer
        </Link>
        <Link to="/" className="text-white hover:text-orange-200">
          Home
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;