import React from 'react';
import { FC } from 'react';
import ChooseBestInstructorSelections from './components/instructor-selection/ChooseBestInstructorSelections';
import FeaturedInstructors from './components/featured-instructors/FeaturedInstructors';
import Testimonials from './components/testimonials/Testimonials';
import AboutUs from './components/about-us-section/AboutUs';
import Banner from './components/banner/Banner';
import FAQ from './components/faq/FAQ';
import HowLampDrivingWork from './components/how-lampdriving-works/HowLampDrivingWork';
import MissionVisionSection from './about/components/MissionVisionSection';
import AboutStats from './about/components/AboutStats/AboutStats';
import Pricing from './components/pricing/Pricing';

const HomePage: FC = () => {
  return (
    <div>
      <Banner />
      {/* <Old_HowLampDrivingWork /> */}
      <HowLampDrivingWork />
      {/* <Benefits /> */}
      {/* <ChooseBestInstructorSelections /> */}
      <FeaturedInstructors />
      <MissionVisionSection />
      <AboutUs />
      <Pricing />
      <Testimonials />
      <AboutStats />
      <FAQ />
    </div>
  );
};

export default HomePage;