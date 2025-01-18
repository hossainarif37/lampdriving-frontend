'use client'

import { useGoToTop } from '@/hooks/useGoToTop';
import useWindowScroll from '@/hooks/useWindowScroll';
import { ArrowUp } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const TopNavigator = () => {
    const isScroll = useWindowScroll(10);
    const scrollToTop = useGoToTop();
    const showButton = isScroll && window.scrollY > 0;

    return (
        <div className={`fixed bottom-10 right-6 z-50 transition-all duration-300 ${showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
            }`}>
            <div className="flex flex-col gap-3 p-2 bg-secondary rounded-full shadow">
                <ArrowUp
                    className="text-xl text-white cursor-pointer"
                    onClick={scrollToTop}
                />
            </div>
        </div>
    );
};

export default TopNavigator;