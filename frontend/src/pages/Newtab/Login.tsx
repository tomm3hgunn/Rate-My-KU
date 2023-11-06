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
