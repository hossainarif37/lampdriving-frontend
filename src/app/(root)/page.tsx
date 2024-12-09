import { Button } from '@/components/ui/button';
import React from 'react';
import { FC } from 'react';
import SectionHeading from './components/shared/section-heading/SectionHeading';

const HomePage: FC = () => {
  return (
    <div className='wrapper text-primary'>
      HomePage
      <Button>Button</Button>
      <p className='text-secondary text'>This is the home page</p>
      <div className="min-h-[30vh] bg-secondary">
        <SectionHeading classname='items-start py-6 px-3' variant='secondary' heading="Services">
        Our Range of Services
        </SectionHeading>
      </div>

      <SectionHeading classname='items-center py-6' heading="Services">
        Our Range of Services
        </SectionHeading>
    </div>
  );
};

export default HomePage;