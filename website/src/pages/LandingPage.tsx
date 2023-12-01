import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import HeroHeader from '../components/HeroHeader';

const LandingPage: React.FC = () => {
    return (
        <div>
            <NavBar
                logo="logo"
            />
            <HeroHeader
                id="HeroHeader"
                title='Title'
                subtitle="subtitle"
                images={["fakeimage1", "fakeimage2"]}
                buttonText=""
                opacity="opacity-50"
                leftTitle="left title"
                leftSubtitle=""
            />
            <Footer
                copyrightText='text'
                logo="logo"
            />
        </div>
    )
}

export default LandingPage;