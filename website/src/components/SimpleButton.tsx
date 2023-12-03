/**
 * Prologue Comments
 *
 * Name of code artifact: SimpleButton Component
 * Brief description: This code defines a SimpleButton component for a React application using TypeScript.
 * Programmer's name: Thomas Nguyen
 * Date the code was created: 12/01/2023
 * Brief description of each revision & author:
 *     - Initial implementation. (Thomas Nguyen @ 12/01/23)
 * Pre-conditions: 
 *     - `react` and `typescript` modules must be installed.
 * Post-conditions:
 *     - Renders a SimpleButton component with specified properties.
 * Error and exception condition values: 
 *     - None. Errors would be raised by React if required props are not provided.
 * Side effects: 
 *     - Renders a SimpleButton component in the DOM.
 * Invariants: None
 * Any known faults: None
 */

import React from 'react';
import { ReactComponent as RightArrow } from '../assets/svgs/rightArrow.svg';

interface SimpleButtonProps {
    label: string;
    textColor: string;
    bgColor: string;
    withArrow: boolean;
    onClick: () => void;
    size: 'small' | 'medium' | 'large';
}

const sizeClasses = {
    small: 'py-3 px-4 h-10 text-sm',
    medium: 'py-3 px-6 h-12 text-base',
    large: 'py-3 px-10 h-16 text-lg',
};

const SimpleButton: React.FC<SimpleButtonProps> = ({ bgColor, textColor, label, withArrow, onClick, size }) => (
    <button
        className={`font-jarkarta flex items-center justify-center gap-3 ${bgColor} text-${textColor} font-bold rounded-full hover:outline-none hover:ring hover:ring-opacity-50 ${sizeClasses[size]}`}
        onClick={onClick}
    >
        <span className='whitespace-nowrap'>{label}</span>
        {withArrow && <RightArrow className='w-5 h-5' />}
    </button>
);

export default SimpleButton;
