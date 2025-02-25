import { useGetAInstructorByAdminQuery } from '@/redux/api/instructorApi/instructorApi';
import { firstLetterUppercase } from '@/utils/firstLetterUppercase';
import { format } from 'date-fns';
import { Calendar, Car, CheckCircle2, Clock, FileText, Languages, Mail, MapPin, Phone, Star, User, Wallet } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';
import InstructorDetailsSkeleton from './InstructorDetailsSkeleton';
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import getAge from '@/lib/utils';


const InstructorDetails: FC<{ id: string }> = ({ id }) => {
    const { data, isLoading } = useGetAInstructorByAdminQuery({ id: id });

    if (isLoading) {
        return <InstructorDetailsSkeleton />
    }

    const instructor = data?.data;

    console.log('Experiences', instructor?.documents?.experienceCertificates?.length);
    console.log('Experiences', instructor?.documents?.experienceCertificates);

    if (!instructor) {
        return <div className='flex justify-center items-center h-96 px-2 py-4'>
            <h1>No Instructor Data Found</h1>
        </div>;
    }

    return (
        <div className="space-y-6 h-96 overflow-y-auto thin-scrollbar px-2 py-4">
            <div className='space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-12 gap-2'>
                    <div className="flex items-start space-x-4 p-4 border rounded-md md:col-span-7">
                        <div className="flex shrink-0 overflow-hidden rounded-full size-16">
                            <Image
                                className='object-cover'
                                src={(instructor as any)?.user?.profileImg}
                                width={100}
                                height={100}
                                alt={`${(instructor as any)?.user?.name.firstName[0]}'s image`} />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <h2 className="text-xl font-semibold">{(instructor?.user as any).name.fullName}</h2>
                                {instructor?.status === "verified" && (
                                    <span className='rounded-md border px-2.5 py-0.5 text-xs font-semibold bg-primary text-white flex items-center justify-center'>
                                        <CheckCircle2 className="h-3 w-3 mr-1" />
                                        Verified
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground break-all">{(instructor?.user as any).email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">{(instructor?.user as any).phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                    {/* Born {format(new Date((instructor?.user as any).dateOfBirth), "PPP")} */}
                                    {getAge(10, 1999)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='md:col-span-5 border rounded-md p-4'>
                        <h3 className="text-lg font-semibold mb-3">Statistics</h3>
                        <div className='space-y-3'>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <Star className={`h-4 w-4 text-yellow-500`} />
                                    <span>Rating</span>
                                </div>
                                <span className="font-semibold">{instructor?.feedback?.rating ? instructor?.feedback?.rating : "N/A"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle2 className={`h-4 w-4 text-green-500`} />
                                    <span>Completed Lessons</span>
                                </div>
                                <span className="font-semibold">{instructor?.completedLessons}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <Wallet className={`h-4 w-4 text-purple-500`} />
                                    <span>Total Earnings</span>
                                </div>
                                <span className="font-semibold">{(instructor as any)?.wallet?.balance.totalEarnings}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 border rounded-md">
                    <div className="flex items-center space-x-2 mb-4">
                        <FileText className="h-5 w-5" />
                        <h3 className="text-lg font-semibold">Documents</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium">Driving License</h4>
                            <a
                                href={instructor?.documents.drivingLicense}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    width={192}
                                    height={192}
                                    src={instructor?.documents.drivingLicense || ""}
                                    alt="Driving License"
                                    className="w-full h-48 mt-2 object-cover rounded-lg border hover:opacity-90 transition-opacity"
                                />
                            </a>
                        </div>
                        {
                            instructor?.documents?.experienceCertificates && instructor?.documents?.experienceCertificates?.length > 0 && instructor?.documents?.experienceCertificates?.map((certificate, i) => (
                                <div key={i} className="space-y-2">
                                    <h4 className="font-medium">Experience Certificates</h4>
                                    <a
                                        href={certificate.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            width={192}
                                            height={192}
                                            src={certificate.url}
                                            alt="Experience Certificate"
                                            className="w-full h-48 mt-2 object-cover rounded-lg border hover:opacity-90 transition-opacity"
                                        />
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-6'>
                    <div className="p-4 border rounded-md">
                        <div className="flex items-center space-x-2 mb-4">
                            <Car className="h-5 w-5" />
                            <h3 className="text-lg font-semibold">Vehicle Information</h3>
                        </div>
                        <div className="space-y-4">
                            <Carousel className="w-full max-w-xs">
                                <CarouselContent>
                                    {instructor?.vehicle?.images?.map((image, i) => (
                                        <CarouselItem key={i}>
                                            <Image
                                                key={i}
                                                width={192}
                                                height={192}
                                                src={image.url}
                                                alt={`${instructor?.vehicle.name} ${instructor?.vehicle.model}`}
                                                className="w-full h-48 object-cover rounded-lg"
                                            />
                                        </CarouselItem>
                                    ))}
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </CarouselContent>
                            </Carousel>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <span>{instructor?.vehicle.name} {instructor?.vehicle.model}</span>
                                    </div>
                                    <span className='rounded-md border px-2.5 py-0.5 text-xs font-semibold bg-primary text-white'>
                                        {firstLetterUppercase(instructor?.vehicle.type)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Year</span>
                                    <span>{instructor?.vehicle.year}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Rating</span>
                                    <div className="flex items-center">
                                        ANCAP Rating -
                                        <span> {instructor?.vehicle.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 border rounded-md">
                        <div className="flex items-center space-x-2 mb-4">
                            <Clock className="h-5 w-5" />
                            <h3 className="text-lg font-semibold">Working Hours</h3>
                        </div>
                        <div className="">
                            {Object.entries(instructor?.workingHour).map(([day, hours]) => (
                                <div key={day} className="flex justify-between items-center border p-2">
                                    <span className="capitalize">{day}</span>
                                    <span className="text-sm">
                                        {hours.isActive ? `${hours.startTime} - ${hours.endTime}` : 'Off Day'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 border rounded-md col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <Languages className="h-5 w-5" />
                            <h3 className="text-lg font-semibold">Languages</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {instructor?.languages.map((language, index) => (
                                <span key={index} className='rounded-md border px-2.5 py-0.5 text-xs font-semibold bg-primary text-white'>
                                    {language}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 border rounded-md col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <MapPin className="h-5 w-5" />
                            <h3 className="text-lg font-semibold">Service Areas</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {instructor?.serviceAreas.map((area, index) => (
                                <span key={index} className='rounded-md border px-2.5 py-0.5 text-xs font-semibold bg-primary text-white'>
                                    {area}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorDetails;