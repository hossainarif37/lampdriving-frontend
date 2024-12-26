import { useRef, useEffect, Dispatch, useState } from 'react';

import MenuLinks from './MenuLinks';
import MenuSearch from '../dashboard-nav/MenuSearch';
import { Button } from '@/components/ui/button';
import { AlignJustify } from 'lucide-react';


const MobileMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const mobileMenuRef = useRef<HTMLDivElement>(null);

    // mobile menu toggle handler
    const handleMenuToggler = () => {
        setIsMenuOpen(pre => !pre);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    return (
        <div ref={mobileMenuRef}>
            <Button
                onClick={handleMenuToggler}
                size={"icon"}
                className={`rounded-[4px] text-3xl gap-2`}>
                <AlignJustify className='text-3xl' />
            </Button>
            <div className={`w-80 left-0 top-[74px] absolute px-3 bg-white min-h-screen py-2 duration-300 origin-left ${isMenuOpen ? 'transform scale-x-100 opacity-100 translate-y-0'
                : 'transform scale-x-95 opacity-0 -translate-x-2 pointer-events-none'}`}>
                <MenuSearch />
                <MenuLinks />
            </div>
        </div>
    );
};

export default MobileMenu;