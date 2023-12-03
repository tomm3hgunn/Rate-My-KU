/**
 * Prologue Comments
 *
 * Name of code artifact: NavBar Component
 * Brief description: This code defines a NavBar component for a React application using TypeScript and react-router-dom.
 * Programmer's name: Thomas Nguyen
 * Date the code was created: 12/01/2023
 * Brief description of each revision & author:
 *     - Initial implementation. (Thomas Nguyen @ 12/01/23)
 * Pre-conditions: 
 *     - `react`, `react-router-dom`, and `typescript` modules must be installed.
 * Post-conditions:
 *     - Renders a NavBar component with specified logo and navigation links.
 * Error and exception condition values: 
 *     - None. Errors would be raised by React if required props are not provided.
 * Side effects: 
 *     - Renders a NavBar component in the DOM.
 *     - Adds and removes a scroll event listener to the window.
 * Invariants: None
 * Any known faults: None
 */

import React, { useEffect, useState } from 'react';
import SimpleButton from './SimpleButton';
import Dropdown from './Dropdown';
import MobileDropdown from './MobileDropdown';
import { Link } from 'react-router-dom';

interface NavBarProps {
    logo: string;
}

const NavBar: React.FC<NavBarProps> = ({ logo }) => {
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleScroll = () => {
        const offset = window.scrollY;
        setHasScrolled(offset > 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // This function toggles the dropdown visibility based on its label
    const toggleDropdown = (label: string) => {
        if (openDropdown === label) {
            setOpenDropdown(null); // closes the dropdown if the same button is clicked
        } else {
            setOpenDropdown(label); // opens the clicked dropdown and closes any other
        }
    };

    const feature_left_column = {
        title: 'Title',
        items: [
            "item1",
            "item2",
        ]
    }
    const feature_right_column = {
        title: 'Title',
        items: [
            "item1",
            "item2",
        ]
    }

    return (
        <div className={`fixed top-0 z-30 w-full text-white font-inter font-bold ${hasScrolled && 'shadow-md'}`}>
            {/* Upper bar */}
            <div className='bg-custom-blue text-sm hidden lg:block'>
                <div className='container mx-auto px-4'>
                    <ul className="flex justify-end list-none m-0 py-3">
                        {/* List of li for Support, Contact Us */}
                        <li className='inline-block align-middle'>
                            <Link
                                to="/support" // Update the path as needed
                                onClick={(e: React.MouseEvent) => { /* your click handler */ }}
                                className='text-white py-2 px-3 transition-colors duration-500' // Add hover and transition effects as needed
                            >
                                Support
                            </Link>
                        </li>
                        <li className='inline-block align-middle'>
                            <Link
                                to="/contact-us" // Update the path as needed
                                onClick={(e: React.MouseEvent) => { /* your click handler */ }}
                                className='text-white py-2 px-3 transition-colors duration-500' // Add hover and transition effects as needed
                            >
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Navigation bar */}
            <nav className={`${hasScrolled ? '!bg-custom-black' : 'bg-transparent'} ${isMobileMenuOpen ? "!bg-custom-black" : "bg-transparent"} transition duration-500 ease-in-out`}>
                <div className='container mx-auto px-4 lg:px-20 py-6'>
                    <div className='flex flex-wrap items-center justify-between'>
                        <div className='shrink-0'>
                            <Link to="/">
                                <picture>
                                    <source srcSet={logo} type="image/webp" />
                                    <img src={logo} alt="logo" className='max-h-5 sm:max-h-10' />
                                </picture>
                            </Link>

                        </div>

                        <div className='hidden lg:flex'>
                            <menu className='flex justify-end'>
                                <ul className="list-none m-0 p-0">
                                    <li className='inline-block px-4'>
                                        <Link
                                            to="/"
                                            onClick={(e: React.MouseEvent) => { /* your click handler */ }}
                                            className='text-white py-2 px-3 hover:text-custom-gray transition-colors duration-500' // Add hover and transition effects as needed
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <Dropdown
                                        label="Features"
                                        leftColumn={feature_left_column}
                                        rightColumn={feature_right_column}
                                    />
                                    <li className='inline-block px-4'>
                                        <SimpleButton
                                            // simple button that says schedule a demo with bg color as custom blue and test as white
                                            bgColor='bg-custom-blue'
                                            textColor='white'
                                            label='Request a Demo'
                                            withArrow={false}
                                            size="small"
                                            onClick={() => { }}
                                        />

                                    </li>
                                </ul>
                            </menu>
                        </div>
                        {/* Hamburger button */}
                        <div className='block lg:hidden'>
                            <button
                                className='flex items-center px-3 py-2 border rounded text-custom-gray border-custom-gray hover:text-custom-blue hover:border-custom-blue'
                                onClick={toggleMobileMenu}
                            >
                                <svg
                                    className='fill-current h-3 w-3'
                                    viewBox='0 0 20 20'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <title>Menu</title>
                                    <path
                                        d='M0 0h20v20H0V0zm2 3h16v2H2V3zm0 5h16v2H2V8zm0 5h16v2H2v-2z'
                                        fillRule='evenodd'
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {/* Breaking bar */}
                </div>
                {isMobileMenuOpen && <div className='w-full border-b border-gray-600 mx-auto' style={{ maxWidth: '90%' }}></div>}
            </nav>

            {/* Mobile menu */}
            <div
                className={`absolute top-full left-0 w-full bg-custom-black px-4 transition-opacity duration-500 ease-in-out ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                style={{ maxHeight: '100vh', overflowY: 'auto' }} // Added inline styles for max-height and overflow-y
            >
                <ul className="flex flex-col items-start py-5">
                    <li className='w-full text-left'>

                        <Link
                            to="/"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className='block py-2 px-4 text-white transition-colors duration-500'
                        >
                            Home
                        </Link>
                    </li>
                    <MobileDropdown
                        label="Features"
                        leftColumn={feature_left_column}
                        rightColumn={feature_right_column}
                        isOpen={openDropdown === "Features"} // You pass a prop to check if the dropdown should be open
                        toggleDropdown={() => toggleDropdown("Features")} // You pass the toggle function
                    />
                    <li className='text-center py-2'>
                        <SimpleButton
                            bgColor='bg-custom-blue'
                            textColor='white'
                            label='Request a Demo'
                            withArrow={false}
                            size="small"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NavBar;
