import { Star, Car, Clock, ExternalLink, Calendar, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IInstructor } from "@/types/instructor";
import cardImg from "@/assets/home-page-image/test-image.webp"
import { FC } from "react";
import CheckAvailability from "./shared/check-availability/CheckAvailability";



const InstructorCard: FC<{ instructor: IInstructor }> = ({ instructor }) => {
    const { user, experience, pricePerHour, vehicle, feedback, completedLessons } = instructor;

    return (
        <div className="p-4 rounded-lg space-y-5 border border-primary/10 shadow-md relative">
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
                    <Link
                        href={`/instructors/${typeof user !== 'string' && user?.username}`}
                        className="w-1/2">
                        <Button variant={"outline"} className="border border-primary/50 bg-transparent w-full text-sm font-medium text-primary flex items-center gap-2 transition-colors duration-200">
                            <ExternalLink className="w-4 h-4" />
                            View Profile
                        </Button>
                    </Link>

                    {/* Book Button */}
                    <Link href={`/instructors/booking/?instructor=${typeof user !== 'string' && user?.username}&step=package-selection`} className="w-1/2">
                        <Button className="w-full bg-primary">Book</Button>
                    </Link>
                </div>

                {/* Check Availability Link */}
                <div className="text-center flex items-center justify-center">
                    <CheckAvailability
                        workingHours={instructor?.workingHour}
                        name={typeof user !== 'string' && user?.name.fullName || ""}
                        username={typeof user !== 'string' && user?.username || ""} id={instructor._id || ""}
                    />
                </div>
            </div>


        </div>
    );
};

export default InstructorCard;
