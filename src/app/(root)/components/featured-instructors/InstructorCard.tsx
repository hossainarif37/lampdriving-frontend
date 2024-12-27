import Image from 'next/image';
import { FC } from 'react';
import myImg from "@/assets/home-page-image/test-image.webp";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Car, Clock, ExternalLink, Star } from 'lucide-react';
import Link from 'next/link';

const InstructorCard: FC = () => {
    return (
        <Card className="w-full bg-gradient-to-b from-primary/0 to-indigo/5 border-none">
            <CardContent className="p-6 overflow-hidden">
                <div className="flex items-start gap-4 md:gap-6">
                    {/* Profile Image with Gradient Border */}
                    <div className="relative group flex flex-col">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo/50 to-primary/50 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-300" />
                        <Image
                            src={myImg}
                            height={130}
                            width={130}
                            alt=""
                            className="relative rounded-full object-cover border-2 shadow-sm"
                        />
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 lg:space-y-4 space-y-1">
                        <div className="lg:flex justify-between items-start space-y-1">
                            <div className='space-y-1'>
                                <h3 className="text-xl font-semibold text-secondary">
                                    Hridoy Ahmed
                                </h3>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <Star className="h-4 w-4 fill-primary text-primary" />
                                    <span className="text-sm font-medium text-secondary">4.5/5</span>
                                </div>
                            </div>
                            <div className="lg:text-right text-gradient">
                                <span className="text-2xl font-bold">$50</span>
                                <span className="text-sm">/hr</span>
                            </div>
                        </div>

                        <div className="lg:flex gap-4 text-sm text-accent space-y-1">
                            <div className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4 text-primary" />
                                <span>3 years experience</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Car className="h-4 w-4 text-primary" />
                                <span>Manual</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="flex md:gap-3 gap-2 py-2 lg:pt-0 md:justify-end justify-center">

                    {/* View Profile Button */}
                    <Link href="instructors/instructor-details" >
                        <Button
                            size='lg'
                            className="border text-xs lg:text-sm font-medium text-secondary bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2 transition-colors duration-200"

                        >
                        <ExternalLink className="w-4 h-4" />
                        View Profile
                        </Button>
                    </Link>
                    <Button
                        size="lg"
                        className=" gradient-color text-xs lg:text-sm"
                    >
                        Book Online Now
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default InstructorCard;
