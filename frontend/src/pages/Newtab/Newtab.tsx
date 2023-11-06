// NewTab.tsx
import React, { useState } from 'react';
import LandingPage from './LandingPage';
import Login from './Login';
import NavBar from './components/NavBar';

const NewTab: React.FC = () => {
    const [showLogin, setShowLogin] = useState<boolean>(false);

    // Define a function to toggle the login display
    const handleLoginClick = () => {
        setShowLogin(true);
    };

    // Define a function to handle successful login
    const handleLoginSuccess = () => {
        // Logic after successful login, for now, we'll just console.log
        console.log('Login successful');
    };

    // Define a function to go back to the landing page
    const handleBackToLanding = () => {
        setShowLogin(false);
    };

    return (
        <div className="App">
            {/* Pass handleLoginClick to NavBar */}
            <NavBar onLoginClick={handleLoginClick} />
            {showLogin ? (
                <Login 
                    onLoginSuccess={handleLoginSuccess}
                    onBackToLanding={handleBackToLanding}
                />
            ) : (
                <LandingPage />
            )}
        </div>
    );
};

export default NewTab;
