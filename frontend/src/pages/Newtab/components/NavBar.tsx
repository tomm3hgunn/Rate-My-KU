/**
 * Prologue Comments
 *
 * Name of code artifact: Navigation Bar Component for RateMyKU Extension
 * Brief description: This component renders the navigation bar, providing a login button 
 *                    and potentially other navigation-related features.
 * Programmer's name(s): Thomas Nguyen
 * Date the code was created: 11/05/2023
 * Brief description of each revision & author:
 *    - Initial creation of the navigation bar with a login button. (Thomas Nguyen @ 11/05/2023)
 *    - (Future revisions and authors would be listed here)
 * Pre-conditions:
 *    - An onLoginClick function is passed as a prop for the login button.
 * Post-conditions:
 *    - Clicking the login button triggers the onLoginClick function.
 * Error and exception condition values:
 *    - None; this is a presentational component with no logic that could produce runtime errors.
 * Side effects:
 *    - None identified; this component only communicates with its parent through the onLoginClick function.
 * Invariants:
 *    - The NavBar is stateless and relies on parent components for any dynamic behavior.
 * Any known faults:
 *    - None; this component is designed to be simple and fault-tolerant.
 */

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
