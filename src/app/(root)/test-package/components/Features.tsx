import { cn } from '@/lib/utils';
import { Car, Shield, Clock, Calendar } from 'lucide-react';

const features = [
    {
        icon: Car,
        title: "Modern Vehicles",
        description: "Latest model cars with dual controls for maximum safety",
        color: "from-blue-500 to-cyan-400",
    },
    {
        icon: Shield,
        title: "Licensed Instructors",
        description: "Experienced and certified driving instructors",
        color: "from-purple-500 to-pink-400",
    },
    {
        icon: Clock,
        title: "Flexible Timing",
        description: "Choose your preferred time slots",
        color: "from-orange-500 to-amber-400",
    },
    {
        icon: Calendar,
        title: "Easy Booking",
        description: "Simple online booking system",
        color: "from-green-500 to-emerald-400",
    },
]
import { FC } from 'react';

const Features: FC = () => {
    return (
        <div className="wrapper grid md:grid-cols-2 lg:grid-cols-4 sm:max-w-xl md:max-w-6xl lg:wrapper gap-8 ">
            {features.map((feature, index) => (
                <div key={index} className="text-left p-4 border rounded-md shadow-md">
                    <div className={
                        `w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-r ${feature.color}`
                    }>
                        <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2 text-secondary">{feature.title}</h3>
                    <p className="text-accent text-sm">{feature.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Features;