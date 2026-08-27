import React from 'react';
import Hero from '../components/Hero.jsx';
import Features from '../components/Features.jsx';
import AboutSection from '../components/AboutSection.jsx';
import Stats from '../components/Stats.jsx';
import EventsPreview from '../components/EventsPreview.jsx';
import Testimonials from '../components/Testimonials.jsx';

const Home = () => (
  <>
    <Hero />
    <Features />
    <AboutSection />
    <Stats />
    <EventsPreview />
    <Testimonials />
  </>
);

export default Home;
