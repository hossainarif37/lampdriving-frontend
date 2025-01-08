import React from 'react';
import { FC } from 'react';
import ChooseBestInstructorSelections from './components/instructor-selection/ChooseBestInstructorSelections';
import FeaturedInstructors from './components/featured-instructors/FeaturedInstructors';
import Testimonials from './components/testimonials/Testimonials';
import AboutUs from './components/about-us-section/AboutUs';
import Banner from './components/banner/Banner';
import FAQ from './components/faq/FAQ';
import HowLampDrivingWork from './components/how-lampdriving-works/HowLampDrivingWork';

const HomePage: FC = () => {
  return (
    <div>
      <Banner />
      {/* <Old_HowLampDrivingWork /> */}
      <HowLampDrivingWork />
      {/* <Benefits /> */}
      {/* <ChooseBestInstructorSelections /> */}
      <FeaturedInstructors />
      <AboutUs />
      <Testimonials />
      <FAQ />
    </div>
  );
};

export default HomePage;