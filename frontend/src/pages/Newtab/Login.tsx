/**
 * Prologue Comments
 *
 * Name of code artifact: Login Component for RateMyKU Extension
 * Brief description: This component presents a user interface for authentication, 
 *                    handling user login inputs, validation, and managing login state.
 * Programmer's name(s): Thomas Nguyen
 * Date the code was created: 11/05/2023
 * Brief description of each revision & author:
 *    - Implemented the initial UI and state management for login. (Thomas Nguyen @ 11/05/2023)
 *    - Introduced error handling and form validation. (Thomas Nguyen @ 11/05/2023)
 *    - Added back navigation to the landing page. (Thomas Nguyen @ 11/05/2023)
 * Pre-conditions:
 *    - The component expects two functions passed as props: one for successful login,
 *      and one to handle the transition back to the landing page.
 * Post-conditions:
 *    - Provides feedback to the user if login input is invalid.
 *    - On successful login, triggers a function that can be used to transition to another view.
 * Error and exception condition values:
 *    - Sets an error state if the login form is submitted with empty fields.
 * Side effects:
 *    - None identified; the component maintains its own state and invokes prop functions.
 * Invariants:
 *    - User input is validated on every submission attempt.
 * Any known faults:
 *    - No backend authentication logic implemented; placeholder assumes successful login.
 */


// Login.tsx
import React, { useState, FormEvent } from 'react';
import './Login.css'; // Ensure this CSS file contains the styling for your form

const Login: React.FC<{
    onLoginSuccess: () => void,
    onBackToLanding: () => void
}> = ({ onLoginSuccess, onBackToLanding }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null); // Clear any existing errors

        if (!username || !password) {
            setError('Username and password are required');
            return;
        }

        // Placeholder for actual login logic
        console.log('Logging in with:', username, password);

        // Here you would usually call an authentication service
        // If successful, you might trigger onLoginSuccess
        // For demonstration, let's assume login is always successful
        onLoginSuccess();
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <div className="login-inputs">
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="login-inputs">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <div className="login-error">{error}</div>}
                <div className="login-actions">
                    <button type="submit" className="login-button">Sign In</button>
                    {/* Add a button to go back to the landing page */}
                    <button type="button" onClick={onBackToLanding} className="back-button">
                        Back to Landing
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
