'use client'

import { FC, useEffect, useRef, useState } from 'react'

interface StatItemProps {
    icon: React.ReactNode
    endValue: number
    label: string
    duration?: number
    category: string
}

const StatItem: FC<StatItemProps> = ({ icon, endValue, label, category, duration = 1500 }) => {
    const [count, setCount] = useState(0)
    const countRef = useRef(0)
    const [isVisible, setIsVisible] = useState(false)
    const elementRef = useRef<HTMLDivElement>(null)

    // IntersectionObserver to track visibility of the element
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) setIsVisible(true)
            },
            { threshold: 0.1 }
        )

        const currentElement = elementRef.current
        if (currentElement) observer.observe(currentElement)

        return () => {
            if (currentElement) observer.unobserve(currentElement)
        }
    }, [])

    // Count animation when the element becomes visible
    useEffect(() => {
        if (!isVisible) return

        const startTime = Date.now()

        const updateCount = () => {
            const progress = Math.min((Date.now() - startTime) / duration, 1)
            const nextCount = Math.floor(progress * endValue)

            if (nextCount !== countRef.current) {
                countRef.current = nextCount
                setCount(nextCount)
            }

            if (progress < 1) requestAnimationFrame(updateCount)
        }

        requestAnimationFrame(updateCount)
    }, [endValue, duration, isVisible])

    return (
        <div className='wrapper flex items-center gap-4'>
            <div className="relative block [writing-mode:vertical-lr] rotate-180 text-light font-bold uppercase">
                <h6>{category}</h6>
            </div>
            <div ref={elementRef} className="flex flex-col items-start md:justify-center min-w-60 text-center border-l border-l-[#3b536b] pl-7">
                <div className="md:text-[4.9rem] text-[3.9rem] font-bold tracking-wide -mt-8"
                    style={{
                        WebkitTextStroke: '1px rgb(226 232 240)',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    {count}{endValue === 25 ? '+' : endValue === 2000 ? '+' : ''}
                </div>
                <p className="text-slate-200 font-light tracking-wide mb-3 text-left">{label}</p>
                <div className="rounded-full bg-teal-800/30 p-4 relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/20 to-transparent" />
                    {icon}
                </div>
            </div>
        </div>
    )
};

export default StatItem;
