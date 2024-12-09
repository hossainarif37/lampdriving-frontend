import { Button } from '@/components/ui/button';
import React from 'react';
import { FC } from 'react';

const HomePage: FC = () => {
  return (
    <div className='wrapper text-primary'>
      HomePage
      <Button>Button</Button>
      <p className='text-secondary text'>This is the home page</p>
      <div className="min-h-[30vh] bg-secondary">
        <h3 className='text-[48px] font-bold text-textCol text-center'>Our Range of Services</h3>
      </div>
    </div>
  );
};

export default HomePage;