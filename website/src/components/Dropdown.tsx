/**
 * Prologue Comments
 *
 * Name of code artifact: Dropdown Component
 * Brief description: This code defines a Dropdown component for a React application using TypeScript and react-router-dom.
 * Programmer's name: Thomas Nguyen
 * Date the code was created: 12/01/2023
 * Brief description of each revision & author:
 *     - Initial implementation. (Thomas Nguyen @ 12/01/23)
 * Pre-conditions: 
 *     - `react`, `react-router-dom`, and `typescript` modules must be installed.
 * Post-conditions:
 *     - Renders a dropdown component with specified label and columns.
 * Error and exception condition values: 
 *     - None. Errors would be raised by React if required props are not provided.
 * Side effects: 
 *     - Renders a dropdown component in the DOM.
 * Invariants: None
 * Any known faults: None
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Type definitions for the DropDown component's props
interface DropdownProps {
    label: string;
    leftColumn: {
        title?: string;
        items: string[];
    };
    rightColumn?: {
        title?: string;
        items: string[];
    };
}

const Dropdown: React.FC<DropdownProps> = ({ label, leftColumn, rightColumn }) => {
    // State to manage the visibility of the dropdown
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block text-left text-white font-bold font-inter"
            onMouseOver={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {/* Link that wraps the button */}
            <Link to={`/${label.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-flex items-center px-4 py-2 hover:text-custom-gray focus:outline-none transition-colors duration-500">
                {/* Button that toggles the dropdown's visibility on hover */}
                <button
                    onMouseOver={() => setIsOpen(true)}
                    className="focus:outline-none"
                >
                    {label} <span className="ml-2">▼</span>
                </button>
            </Link>

            {/* The buffered container for the dropdown */}
            <div
                onMouseOver={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className={`absolute ${isOpen ? "opacity-100 visible transition-all transform translate-y-0" : "opacity-0 invisible transition-all transform translate-y-4"} duration-300 ease-in-out pt-4 left-[-16px] leading-10`}
            >
                {/* The actual dropdown content */}
                <div className="bg-white shadow-lg rounded-md border border-gray-200 p-3 flex whitespace-nowrap">
                    {/* Left column of the dropdown */}
                    <div className="p-4">
                        {leftColumn.title && (<div className="font-bold text-custom-gray mb-2">{leftColumn.title}</div>)}
                        {leftColumn.items.map(item => (
                            <Link key={item} to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="font-jarkarta text-gray-600 block hover:text-custom-blue">
                                {item}
                            </Link>
                        ))}
                    </div>
                    {/* Right column of the dropdown */}
                    {rightColumn && (
                        <div className="p-4">
                            {rightColumn.title && (<div className="font-bold text-custom-gray mb-2">{rightColumn.title}</div>)}
                            {rightColumn.items.map(item => (
                                <Link key={item} to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="font-jarkarta text-gray-600 block hover:text-custom-blue">
                                    {item}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
