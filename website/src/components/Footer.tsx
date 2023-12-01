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