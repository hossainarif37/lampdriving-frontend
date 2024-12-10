import React from 'react';
import { FC } from 'react';
const HomePage: FC = () => {
  return (
    <div className=' text-primary'>
        <HighlightedSection/>
        <HowLampdrivingWorkSection/>
      <ChooseBestInstructorSelections />
      <FeaturedInstructors />
    </div>
  );
};

export default HomePage;