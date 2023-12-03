/**
 * Prologue Comments
 *
 * Name of code artifact: LandingPage Component
 * Brief description: This code defines a LandingPage component for a React application using TypeScript. It includes NavBar, HeroHeader, and Footer components.
 * Programmer's name: Thomas Nguyen & Wyatt Parsons
 * Date the code was created: 12/01/2023
 * Brief description of each revision & author:
 *     - Initial implementation. (Thomas Nguyen @ 12/01/23)
 *     - Changed content to match Rate My KU. (Wyatt Parsons @ 12/03/23)
 * Pre-conditions: 
 *     - `react` and `typescript` modules must be installed.
 *     - NavBar, HeroHeader, and Footer components must be defined and correctly imported.
 * Post-conditions:
 *     - Renders a LandingPage component with NavBar, HeroHeader, and Footer.
 * Error and exception condition values: 
 *     - None. Errors would be raised by React if required props are not provided.
 * Side effects: 
 *     - Renders a LandingPage component in the DOM.
 * Invariants: None
 * Any known faults: None
 */

import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import HeroHeader from '../components/HeroHeader';
import logo from '../assets/images/logo.png';
import background1 from '../assets/images/background1.jpg';
import background2 from '../assets/images/background1.jpg'; // change to background2
 
const LandingPage: React.FC = () => {
    return (
        <div>
            <NavBar
                logo={logo}
            />
            <HeroHeader
                id="HeroHeader"
                title='Rate My KU'
                subtitle="Empowering Your Course Choices with Real-Time Professor Insights"
                images={[background1, background2]}
                buttonText=""
                opacity="opacity-50"
                leftTitle=""
                leftSubtitle=""
            />
            <Footer
                copyrightText='text'
                logo={logo}
            />
        </div>
    )
}

export default LandingPage;