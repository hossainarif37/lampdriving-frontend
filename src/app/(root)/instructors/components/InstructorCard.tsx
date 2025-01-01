
import { Star, Car, Clock, ExternalLink, Calendar, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IInstructor } from "@/types/instructor";
import cardImg from "@/assets/home-page-image/test-image.webp"
import { FC } from "react";



const InstructorCard: FC<{ instructor: IInstructor }> = ({ instructor }) => {
    const { user, experience, pricePerHour, vehicle, feedback, completedLessons } = instructor;
    console.log(instructor);

    return (
        <div className="p-4 rounded-lg space-y-5 bg-gradient-to-b from-primary/0 to-indigo/5 relative">
            {/* car type */}
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium flex items-center gap-1 absolute top-5 right-5 capitalize">
                <Car className="w-4 h-4" />
                {vehicle.type}
            </span>
            <div className="flex gap-8">
                {/* Profile Picture and Auto Badge */}
                <div className="rounded-full flex flex-col items-center gap-2">
                    <Image
                        src={cardImg}
                        alt={`Profile of ${typeof user !== 'string' && user?.name?.fullName}`}
                        height={120}
                        width={120}
                        className="rounded-full"
                    />
                </div>

                {/* Profile Details */}
                <div className="space-y-2 text-sm text-accent w-full relative">


                    {/* Price Per Hour */}
                    <div>
                        <h4 className="text-2xl font-bold text-gradient absolute bottom-0 right-2">
                            ${pricePerHour}<span className="text-base">/hr</span>
                        </h4>
                    </div>

                    {/* Name */}
                    <h4 className="text-xl font-semibold text-gradient">{typeof user !== 'string' && user?.name?.fullName}</h4>

                    {/* Rating and Total Ratings */}
                    <div className="flex gap-2">
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-primary fill-current" />
                            <span>{feedback?.rating || "N/A"}</span>
                        </div>
                        <span className="text-primary">•</span>
                        <span>{feedback?.reviews?.length || 0} Ratings</span>
                    </div>

                    {/* Completed Lessons */}
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        {completedLessons} Completed lessons
                    </div>

                    {/* Experience */}
                    <div className="flex items-center font-semibold gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        <span className="text-gradient">{experience}</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
                <div className="flex gap-3 max-w-lg mx-auto">
                    {/* View Profile Button */}
                    <Link href={`/instructors/instructor-details`} className="border md:h-12 w-1/2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2 transition-colors duration-200 ">
                        <ExternalLink className="w-4 h-4" />
                        View Profile
                    </Link>

                    {/* Book Button */}
                    <Button className="md:h-12 w-1/2 gradient-color">Book</Button>
                </div>

                {/* Check Availability Link */}
                <Link href="#" className="flex justify-center gap-1 cursor-pointer underline">
                    <Calendar className="w-4 text-primary" />
                    <span className="text-primary">Check availability</span>
                    <ChevronRight className="text-primary w-5 -ml-1" />
                </Link>
            </div>


        </div>
    );
};

export default InstructorCard;
