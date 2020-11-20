import React from 'react';
import Hero from '../components/Hero';
import Banner from "../components/Banner";
import {Link} from 'react-router-dom';
import Services from '../components/Services';
import FeaturedRooms from '../components/FeaturedRooms';

export const Home = () => {
    return (
        <React.Fragment>
            <Hero>
                <Banner title="home of the audio experts" subtitle="we are the go-to for all alexa and google home services">
                    <Link to="/rooms" className="btn-primary">
                        our services
                    </Link>
                </Banner>
            </Hero>
            <Services />
            <FeaturedRooms />
        </React.Fragment>
    );
}

export default Home;