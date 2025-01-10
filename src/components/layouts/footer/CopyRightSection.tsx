"use client"
import { FC } from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
const CopyRightSection: FC = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div className='py-5 border-t border-gray-700 md:px-0 '>
            <div className='md:flex space-y-3 md:space-y-0 justify-between wrapper text-light/60 text-sm'>
                <p>&copy; {currentYear} All Rights Reserved. Developed By Organic soft</p>
                <div className='flex gap-2'>
                    <a href="#facebook" aria-label='Facebook'><Facebook className='hover:text-secondary inline mx-2 text-2xl hover:scale-105' /></a>
                    <a href="#instagram" aria-label='Instagram'><Instagram className='hover:text-secondary inline mx-2 text-2xl hover:scale-105' /></a>
                    <a href="#youtube" aria-label='YouTube'><Youtube className='hover:text-secondary inline ml-2 text-2xl hover:scale-105' /></a>
                </div>
            </div>
        </div>
    );
};

export default CopyRightSection;