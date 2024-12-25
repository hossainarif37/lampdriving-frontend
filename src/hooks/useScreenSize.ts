import { useState, useEffect } from 'react';

const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });
    const [device, setDevice] = useState('');

    useEffect(() => {
        if (typeof window === 'undefined') return; // Ensure this runs only on client

        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (screenSize.width < 768) {
            setDevice('mobile');
        } else if (screenSize.width < 1024) {
            setDevice('tablet');
        } else {
            setDevice('desktop');
        }
    }, [screenSize]);

    return device;
}

export default useScreenSize;
