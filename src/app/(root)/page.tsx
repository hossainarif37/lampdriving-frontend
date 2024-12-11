import React from 'react';
import { FC } from 'react';
import HighlightedSection from './components/highlighted-section/HighlightedSection';
import HowLampdrivingWorkSection from './components/how-lampdriving-works/HowLampdrivingWorkSection';
import ChooseBestInstructorSelections from './components/instructor-selection/ChooseBestInstructorSelections';
import FeaturedInstructors from './components/featured-instructors/FeaturedInstructors';
import Testimonials from './components/testimials-section/Testimonials';
const HomePage: FC = () => {
  return (
    <div>
      <HighlightedSection />
      <HowLampdrivingWorkSection />
      <ChooseBestInstructorSelections />
      <FeaturedInstructors />
      <Testimonials />
    </div>
  );
};

export default HomePage;