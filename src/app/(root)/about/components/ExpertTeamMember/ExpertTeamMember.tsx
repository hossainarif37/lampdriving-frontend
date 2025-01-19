import { FC } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TeamMemberCard from './TeamMemberCard';

const teamMembers = [
    {
        name: 'Sime Khan',
        role: 'DRIVING TUTOR',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        description: 'Righteous indignation and dislike men who are so beguiled...'
    },
    {
        name: 'Glenn Davidso',
        role: 'FOUNDER',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        description: 'Righteous indignation and dislike men who are so beguiled...'
    },
    {
        name: 'Michel Kyle',
        role: 'INSTRUCTOR',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        description: 'Righteous indignation and dislike men who are so beguiled...'
    },
    {
        name: 'Sarah Wilson',
        role: 'INSTRUCTOR',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        description: 'Righteous indignation and dislike men who are so beguiled...'
    },
    {
        name: 'John Smith',
        role: 'DRIVING TUTOR',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        description: 'Righteous indignation and dislike men who are so beguiled...'
    },
    {
        name: 'Emma Davis',
        role: 'INSTRUCTOR',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        description: 'Righteous indignation and dislike men who are so beguiled...'
    }
];

const ExpertTeamMember: FC = () => {
    return (
        <div className="py-20">
            <div className="max-w-7xl mx-auto">
                <div className=" mb-12 flex flex-col justify-center items-center gap-3">
                    <h3 className="w-[115px] bg-green-500 py-[7px] px-[15px] text-sm font-bold rounded-[4px] ml-2 relative before:absolute before:w-[5px] uppercase before:min-h-full before:bg-green-500 text-light before:top-0 before:rounded-[4px] before:-ml-6">
                        Out Team
                    </h3>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                        Our Experienced Team
                    </h2>
                </div>

                <div className="relative ">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                            skipSnaps: false,
                            slidesToScroll: 1,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="">
                            {teamMembers.map((member, index) => (
                                <CarouselItem key={index} className=" md:basis-1/2 lg:basis-1/3 ">
                                    <TeamMemberCard
                                        name={member.name}
                                        role={member.role}
                                        image={member.image}
                                        description={member.description}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="flex justify-center md:mt-16 mt-10 space-x-4">
                            <CarouselPrevious
                                className="static translate-y-0 w-12 h-12 rounded-md hover:bg-primary hover:text-white border-none border"
                            />
                            <CarouselNext
                                className="static translate-y-0 w-12 h-12 rounded-md hover:bg-primary hover:text-white border-none border"
                            />
                        </div>
                    </Carousel>
                </div>

                {/*========= CTA Button section ========= */}
                <div className="relative md:mt-12 mt-6 text-center wrapper">
                    {/* Horizontal border */}
                    <hr className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-full z-0" />

                    {/* Centered button */}
                    <Button
                        variant="outline"
                        className="bg-light hover:bg-light h-12 rounded-3xl relative z-10"
                    >
                        <span className="text-gray-600 mr-2 md:block hidden">30+ Friendly Faces Eager to Help!</span>
                        <ChevronRight />
                        <span className="font-bold text-secondary">View All</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ExpertTeamMember;