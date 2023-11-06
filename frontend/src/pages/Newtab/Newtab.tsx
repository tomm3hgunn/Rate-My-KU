/**
 * Prologue Comments
 *
 * Name of code artifact: NewTab Component for RateMyKU Extension
 * Brief description: This component serves as the main entry point for the RateMyKU Extension, 
 *                    toggling between the landing page and the login form based on user interaction.
 * Programmer's name(s): Thomas Nguyen
 * Date the code was created: 11/05/2023
 * Brief description of each revision & author:
 *    - Initial creation of the NewTab component to manage application states. Thomas Nguyen  @ 11/05/2023)
 * Pre-conditions:
 *    - NavBar component must have a trigger for login state.
 *    - LandingPage and Login components are created and properly exported.
 * Post-conditions:
 *    - Displays the LandingPage component initially.
 *    - Switches to the Login component when the login state is true.
 * Error and exception condition values:
 *    - None identified within this component scope.
 * Side effects:
 *    - Toggles the visual component between LandingPage and Login based on user interaction.
 * Invariants:
 *    - The state of the application remains consistent across re-renders.
 * Any known faults:
 *    - None at the moment of creation.
 */

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
