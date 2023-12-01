import React from 'react';

interface MobileDropdownProps {
    label: string;
    leftColumn: {
        title?: string;
        items: string[];
    };
    rightColumn?: {
        title?: string;
        items: string[];
    };
    isOpen: boolean;
    toggleDropdown: () => void;
}

const MobileDropdown: React.FC<MobileDropdownProps> = ({ label, leftColumn, rightColumn, isOpen, toggleDropdown }) => {

    return (
        <div className="inline-block text-left text-white font-bold font-inter w-full">
            {/* Button that toggles the dropdown's visibility on click */}
            <button
                onClick={toggleDropdown}
                className="w-full flex justify-between items-center px-4 py-2 text-white transition-colors duration-500"
                aria-expanded={isOpen}
            >
                {label} <span className="ml-2">{isOpen ? '▲' : '▼'}</span>
            </button>

            {/* Content that is toggled on click */}
            {isOpen && (
                <div className="bg-white text-gray-600 shadow-lg rounded-md border border-gray-200 p-3 flex flex-col w-full">
                    {/* Left column of the dropdown */}
                    <div className="p-4">
                        {leftColumn.title && (<div className="font-bold text-custom-gray mb-2">{leftColumn.title}</div>)}
                        {leftColumn.items.map(item => (
                            <a key={item} href={`#${item}`} className="block hover:text-custom-blue">
                                {item}
                            </a>
                        ))}
                    </div>
                    {/* Right column of the dropdown */}
                    {rightColumn && (
                        <div className="p-4">
                            {rightColumn.title && (<div className="font-bold text-custom-gray mb-2">{rightColumn.title}</div>)}
                            {rightColumn.items.map(item => (
                                <a key={item} href={`#${item}`} className="block hover:text-custom-blue">
                                    {item}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MobileDropdown;
