/**
 * Prologue Comments
 *
 * Name of code artifact: Footer Component
 * Brief description: This code defines a Footer component for a React application using TypeScript.
 * Programmer's name: Thomas Nguyen
 * Date the code was created: 12/01/2023
 * Brief description of each revision & author:
 *     - Initial implementation. (Thomas Nguyen @ 12/01/23)
 * Pre-conditions: 
 *     - `react` and `typescript` modules must be installed.
 * Post-conditions:
 *     - Renders a footer component with specified copyright text.
 * Error and exception condition values: 
 *     - None. Errors would be raised by React if required props are not provided.
 * Side effects: 
 *     - Renders a footer component in the DOM.
 * Invariants: None
 * Any known faults: None
 */
import React from "react";
interface FooterProps {
    copyrightText: string;
    logo: string;
}

const Footer: React.FC<FooterProps> = ({ copyrightText }) => {
    return (
        <footer className="bg-[#313131]">
            <div className="flex flex-col justify-between items-center max-w-7xl mx-auto py-4">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-5 my-4">
                    </div>
                </div>
                <div className="flex">
                    <a href="https://enterprise-kc.com/privacy-policy.html" className="text-gray-600 dark:text-gray-400 font-inter">
                        Privacy Policy
                    </a>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-inter">
                    {copyrightText}
                </p>
            </div>
        </footer>
    );
};

export default Footer;