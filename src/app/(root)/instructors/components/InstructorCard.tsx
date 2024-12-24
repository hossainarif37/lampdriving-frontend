
import { Star, Car, Clock, ExternalLink, Calendar, ChevronRight } from "lucide-react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";


// Define the TypeScript interface for the instructor
interface Instructor {
    id: number;
    name: string;
    image: StaticImageData;
    rating: number;
    experience: string;
    pricePerHour: number;
    skills: string;
    totalRatings: number;
    totalLessons: number
}

// Define the props type for the component
interface InstructorCardProps {
    instructor: Instructor;
}

const InstructorCard: React.FC<InstructorCardProps> = ({ instructor }) => {
    const { name, image, rating, experience, pricePerHour, totalRatings,skills, totalLessons } = instructor;


    return (
        <div className="p-6 rounded-md space-y-8 bg-gradient-to-b from-primary/0 to-indigo/5">
            <div className="flex gap-8">
                {/* Profile Picture and Auto Badge */}
                <div className="rounded-full flex flex-col items-center gap-2">
                    <Image
                        src={image}
                        alt={`Profile of ${name}`}
                        height={120}
                        width={120}
                        className="rounded-full"
                    />
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium flex items-center gap-1">
                        <Car className="w-4 h-4" />
                        {skills}
                    </span>
                </div>

                {/* Profile Details */}
                <div className="space-y-2 text-sm text-accent">
                    {/* Name */}
                    <h4 className="text-xl font-semibold text-gradient">{name}</h4>

                    {/* Rating and Total Ratings */}
                    <div className="flex gap-2">
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-primary fill-current" />
                            <span>{rating}</span>
                        </div>
                        <span className="text-primary">•</span>
                        <span>{totalRatings} Ratings</span>
                    </div>

                    {/* Completed Lessons */}
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        {totalLessons} Completed lessons
                    </div>

                    {/* Experience */}
                    <div className="flex items-center font-semibold gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        <span className="text-gradient">{experience}</span>
                    </div>

                    {/* Price Per Hour */}
                    <div>
                        <h4 className="text-2xl font-bold text-gradient ">
                            ${pricePerHour}<span className="text-base">/hr</span>
                        </h4>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
                <div className="flex gap-2 max-w-lg mx-auto">
                    {/* View Profile Button */}
                    <Link href="instructors/instructor-details" className="border h-12 w-1/2 text-sm font-medium text-secondary bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2 transition-colors duration-200">
                        <ExternalLink className="w-4 h-4" />
                        View Profile
                    </Link>

                    {/* Book Button */}
                    <Button className="h-12 w-1/2 gradient-color">Book</Button>
                </div>

                {/* Check Availability Link */}
                <Link href="#" className="flex justify-center gap-1 cursor-pointer underline">
                    <Calendar className="w-4 text-primary" />
                    <span className="text-primary">Check availability</span>
                    <ChevronRight className="text-primary w-5 -ml-1"/>
                </Link>
            </div>

            
        </div>
    );
};

export default InstructorCard;
