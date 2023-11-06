import React from 'react';
import './NavBar.css'; // You can define styles specific to the navbar here

// NavBar.tsx
const NavBar: React.FC<{ onLoginClick: () => void }> = ({ onLoginClick }) => {
    return (
        <nav>
            {/* Other nav items... */}
            <button onClick={onLoginClick}>Login</button>
        </nav>
    );
};

export default NavBar;
