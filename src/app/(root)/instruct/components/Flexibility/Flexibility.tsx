import { FC } from 'react';
import FlexibilityCard from './FlexibilityCard';
import { ArrowRight, CalendarRange, Cog, TrendingUp } from 'lucide-react';
import SectionHeading from '@/app/(root)/components/shared/section-heading/SectionHeading';
import { Button } from '@/components/ui/button';


const features = [
    {
        title: "Work when you want",
        description: "Work and where you want by setting your availability & areas of service",
        icon: <CalendarRange className='w-14 h-14' />
    },
    {
        title: "Get a steady flow of learners",
        description: "Increase your earnings by reaching a broad learner base",
        icon: <TrendingUp className='w-14 h-14' />
    },
    {
        title: "Automate your admin",
        description: "We handle all the bookings, payments, notifications, & more",
        icon: <Cog className='w-14 h-14' />
    }
];
const Flexibility: FC = () => {
    return (
        <section className='py-14 bg-gradient-to-b from-primary/0 to-primary/10 md:space-y-14 space-y-10'>
            <SectionHeading title='Flexibility, independence & growth' subtitle='Set your own schedule & lesson price, instruct on your terms.' />
            <div className='wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-6'>
                {
                    features.map((feature, index) => (
                        <FlexibilityCard key={index} feature={feature} />
                    ))
                }
            </div>

            <div className='mt-7 md:my-10 text-center'>
                <Button className='gradient-color'>Join Now <ArrowRight className="w-5 h-5" /></Button>
            </div>
        </section>
    );
};

export default Flexibility;