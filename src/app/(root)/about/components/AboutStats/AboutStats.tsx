import { FC } from 'react';
import { Users, Clock, MapPin, GraduationCap } from 'lucide-react';
import StatItem from './StatItem';
import bgImg from "@/assets/about-page-image/facts-counter-v1-1.jpg";

const AboutStats: FC = () => {
    return (
        <div className="relative w-full md:py-36 py-32 px-4 bg-no-repeat bg-cover -z-10" style={{ backgroundImage: `url(${bgImg.src})` }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-primary opacity-95 z-0" />

            {/* Content */}
            <div className="relative z-10 max-w-8xl mx-auto grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                <StatItem
                    icon={<Clock className="w-8 h-8 text-emerald-400 relative z-10" />}
                    endValue={16}
                    label="Years Of Driving Education school"
                    category="Experience"
                />
                <StatItem
                    icon={<Users className="w-8 h-8 text-emerald-400 relative z-10" />}
                    endValue={18}
                    label="Peoples Trained By Our Institute"
                    category="Leaners"
                />
                <StatItem
                    icon={<MapPin className="w-8 h-8 text-emerald-400 relative z-10" />}
                    endValue={34}
                    label="Accessible Locations Nationwide"
                    category="Service Areas"
                />
                <StatItem
                    icon={<GraduationCap className="w-8 h-8 text-emerald-400 relative z-10" />}
                    endValue={290}
                    label="Skilled And Certified Instructors"
                    category="Instructors"
                />
            </div>
        </div>
    );
};

export default AboutStats;
