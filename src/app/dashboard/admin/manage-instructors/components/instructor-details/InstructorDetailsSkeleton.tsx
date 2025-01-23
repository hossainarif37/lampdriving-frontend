import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Car, CheckCircle2, Clock, FileText, Languages, Mail, MapPin, Phone, Star, User, Wallet } from "lucide-react";

const InstructorDetailsSkeleton = () => {
    return (
        <div className="space-y-6 h-96 overflow-y-auto thin-scrollbar px-2 py-4">
            <div className='space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-12 gap-2'>
                    {/* Profile Section */}
                    <div className="flex items-start space-x-4 p-4 border rounded-md md:col-span-7">
                        <Skeleton className="size-16 rounded-full" />
                        <div className="space-y-2 flex-1">
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <Skeleton className="h-7 w-48" />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <Skeleton className="h-5 w-36" />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <Skeleton className="h-5 w-32" />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <Skeleton className="h-5 w-40" />
                            </div>
                        </div>
                    </div>

                    {/* Statistics Section */}
                    <div className='md:col-span-5 border rounded-md p-4'>
                        <h3 className="text-lg font-semibold mb-3">Statistics</h3>
                        <div className='space-y-3'>
                            {[Star, CheckCircle2, Wallet].map((Icon, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                        <Icon className="h-4 w-4" />
                                        <Skeleton className="h-5 w-24" />
                                    </div>
                                    <Skeleton className="h-5 w-12" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Documents Section */}
                <div className="p-4 border rounded-md">
                    <div className="flex items-center space-x-2 mb-4">
                        <FileText className="h-5 w-5" />
                        <h3 className="text-lg font-semibold">Documents</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        {[1, 2].map((_, index) => (
                            <div key={index} className="space-y-2">
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="w-full h-48 rounded-lg" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-6'>
                    {/* Vehicle Information */}
                    <div className="p-4 border rounded-md">
                        <div className="flex items-center space-x-2 mb-4">
                            <Car className="h-5 w-5" />
                            <h3 className="text-lg font-semibold">Vehicle Information</h3>
                        </div>
                        <div className="space-y-4">
                            <Skeleton className="w-full h-48 rounded-lg" />
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Skeleton className="h-5 w-32" />
                                    <Skeleton className="h-5 w-20" />
                                </div>
                                {[1, 2].map((_, index) => (
                                    <div key={index} className="flex justify-between">
                                        <Skeleton className="h-5 w-24" />
                                        <Skeleton className="h-5 w-20" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Working Hours */}
                    <div className="p-4 border rounded-md">
                        <div className="flex items-center space-x-2 mb-4">
                            <Clock className="h-5 w-5" />
                            <h3 className="text-lg font-semibold">Working Hours</h3>
                        </div>
                        <div className="space-y-2">
                            {[...Array(7)].map((_, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <Skeleton className="h-5 w-20" />
                                    <Skeleton className="h-5 w-32" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Languages */}
                    <div className="p-4 border rounded-md col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <Languages className="h-5 w-5" />
                            <h3 className="text-lg font-semibold">Languages</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {[...Array(4)].map((_, index) => (
                                <Skeleton key={index} className="h-6 w-20 rounded-md" />
                            ))}
                        </div>
                    </div>

                    {/* Service Areas */}
                    <div className="p-4 border rounded-md col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <MapPin className="h-5 w-5" />
                            <h3 className="text-lg font-semibold">Service Areas</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {[...Array(6)].map((_, index) => (
                                <Skeleton key={index} className="h-6 w-24 rounded-md" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorDetailsSkeleton;