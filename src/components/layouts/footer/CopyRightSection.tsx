import { FC } from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
const CopyRightSection: FC = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div>
            <div className='pb-4 md:px-0'>
                <p className='border-b border-gray-600 mb-4'></p>
                <div className='md:flex space-y-3 md:space-y-0 justify-between wrapper text-textCol text-sm'>
                    <p>&copy; {currentYear} All Rights Reserved. Developed By Lamp driving school</p>
                    <div className='flex gap-2'>
                        <a href="#facebook" aria-label='Facebook'><Facebook className='hover:text-primary inline mx-2 text-2xl hover:scale-105' /></a>
                        <a href="#instagram" aria-label='Instagram'><Instagram className='hover:text-primary inline mx-2 text-2xl hover:scale-105' /></a>
                        <a href="#youtube" aria-label='YouTube'><Youtube className='hover:text-primary inline ml-2 text-2xl hover:scale-105' /></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CopyRightSection;