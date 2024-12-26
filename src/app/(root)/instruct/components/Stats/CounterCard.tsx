'use client';
import { FC, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

// Animates a number counting up when the element comes into view
function CountUpNumber({ end, duration = 1500 }: { end: number; duration?: number }) {
    const [count, setCount] = useState(0);
    const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

    useEffect(() => {
        if (inView) {
            const startTime = performance.now();
            const updateCount = (currentTime: number) => {
                const progress = Math.min((currentTime - startTime) / duration, 1);
                setCount(Math.floor(end * progress));
                if (progress < 1) requestAnimationFrame(updateCount);
            };
            requestAnimationFrame(updateCount);
        }
    }, [end, duration, inView]);

    return (
        <span ref={ref} className="tabular-nums">
            {count.toLocaleString()}
        </span>
    );
}

// Displays a card with an icon, animated number, and label
interface IStatCardProps {
    icon: React.ReactNode;
    count: number;
    label: string;
    suffix?: string;
    backgroundColor?: string;
}

const CounterCard: FC<IStatCardProps> = ({
    icon,
    count,
    label,
    suffix = '',
    backgroundColor = 'bg-slate-900',
}) => {
    return (
        <div className={`${backgroundColor} border-slate-800`}>
            <div className="p-6">
                <div className="flex items-center gap-4">
                    {icon}
                    <div>
                        <div className="text-2xl font-bold text-white">
                            <CountUpNumber end={count} />
                            {suffix}
                        </div>
                        <div className="text-sm text-gray-400">{label}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CounterCard;
