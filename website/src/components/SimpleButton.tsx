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
