import { Star, Car, Clock, ExternalLink, Calendar } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IInstructor } from "@/types/instructor";
import { FC } from "react";
import CheckAvailabilityBtn from "./shared/check-availability/CheckAvailabilityBtn";
import { calculateExperience } from "@/lib/utils";



const InstructorCard: FC<{ instructor: IInstructor }> = ({ instructor }) => {
    const { user, experience, pricePerHour, vehicle, feedback, completedLessons } = instructor;

    return (
        <div className="p-4 rounded-lg space-y-5 border border-primary/10 shadow-sm relative">
            {/* car type */}
            <span className="px-3 py-1 bg-teal-200/50 text-primary/60 font-bold rounded-full text-sm flex items-center gap-1 absolute top-3 lg:top-5 right-3 lg:right-5 capitalize">
                <Car className="w-4 h-4" strokeWidth={2.5} />
                {vehicle.type}
            </span>

            <div className="flex gap-3 md:gap-8 max-w-lg mx-auto w-full">
                {/* Profile Picture and Auto Badge */}


                <div className="rounded-lg w-[120px] h-[120px] overflow-hidden">
                    <Image
                        src={typeof user !== 'string' && user?.profileImg || ""}
                        alt={`Profile of ${typeof user !== 'string' && user?.name?.fullName}`}
                        className="w-full h-full object-cover"
                        height={120}
                        width={120}
                    />
                </div>


                {/* Profile Details */}
                <div className="text-sm text-accent w-full relative">

                    {/* Price Per Hour */}
                    <div>
                        <h4 className="text-xl md:text-2xl font-bold text-gradient absolute bottom-0 right-2">
                            ${pricePerHour}<span className="text-base">/hr</span>
                        </h4>
                    </div>

                    {/* Name */}
                    <h4 className="text-lg md:text-xl font-semibold text-gradient">{typeof user !== 'string' && user?.name?.fullName}</h4>

                    <div className="space-y-2">
                        {/* Rating and Total Ratings */}
                        <div className="flex gap-2">
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 text-secondary/80 fill-current" />
                                <span>{feedback?.rating || "N/A"}</span>
                            </div>
                            <span className="text-primary">•</span>
                            <span>{feedback?.reviews?.length || 0} Ratings</span>
                        </div>

                        {/* Completed Lessons */}
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-secondary" />
                            {completedLessons} Completed lessons
                        </div>

                        {/* Experience */}
                        <div className="flex items-center font-semibold gap-2">
                            <Clock className="w-5 h-5 text-secondary" />
                            <span className="text-gradient">
                                {
                                    calculateExperience(experience?.month, experience?.year)
                                }
                            </span>
                        </div>
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
                        <Button variant={"outline"} className="border border-primary/15 hover:border-primary/25 hover:bg-primary/5 bg-transparent w-full text-sm font-medium text-primary flex items-center gap-2 transition-colors duration-200">
                            <ExternalLink className="w-4 h-4 hidden sm:block" />
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
                    <CheckAvailabilityBtn
                        id={instructor._id || ""}
                        name={typeof user !== 'string' && user?.name.fullName || ""}
                        username={typeof user !== 'string' && user?.username || ""}
                        workingHours={instructor?.workingHour}
                    />
                </div>
            </div>


        </div>
    );
};

export default InstructorCard;