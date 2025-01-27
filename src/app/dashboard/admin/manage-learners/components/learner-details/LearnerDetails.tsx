import { useGetALearnerQuery } from '@/redux/api/learnerApi/learnerApi';
import { FC } from 'react';
import LearnerDetailsSkeleton from './LearnerDetailsSkeleton';
import { firstLetterUppercase } from '@/utils/firstLetterUppercase';
import { User, MapPin, Calendar, Clock, DollarSign, FileText } from 'lucide-react';
import { format } from 'path';
import Image from 'next/image';
import { IUser } from '@/types/user';

interface ILearnerDetailsProps {
    id: string;
}

const LearnerDetails: FC<ILearnerDetailsProps> = ({ id }) => {
    const { data, isLoading } = useGetALearnerQuery({ id })

    const learner = data?.data

    if (isLoading)
        return <LearnerDetailsSkeleton />

    if (!learner) return <div className='flex justify-center items-center h-96 px-2 py-4'>
        <h1>No Learner Data Found</h1>
    </div>;

    const user = learner?.user as IUser;
    return (
        <div className="space-y-6 h-96 overflow-y-auto thin-scrollbar px-2 py-4">
            {/* Participants */}
            <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-4 relative">
                    <div className="relative">
                        <Image
                            width={64}
                            height={64}
                            src={user.profileImg || ""}
                            alt={`${user.name.fullName} image`}
                            className="w-16 h-16 rounded-full object-cover ring-2 ring-primary ring-offset-2"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1 rounded-full">
                            <User className="w-4 h-4" />
                        </div>
                    </div>
                    <div>
                        <span className='absolute right-3 top-3 rounded-md border px-2.5 py-0.5 text-xs font-semibold bg-primary text-white'>
                            Learner
                        </span>
                        <p className="font-semibold text-gray-900">{user.name.fullName}</p>
                        <p className="text-sm font-medium text-primary/80">Email: {user.email}</p>
                        <p className="text-sm font-medium text-primary/80">Phone: {user.phone}</p>
                        <p className="text-sm font-medium text-primary/80">Username: {user.username}</p>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {
                    user.address &&
                    <div className={`border rounded-xl p-4 col-span-2`}>
                        <div className="flex items-start gap-3">
                            <div className="mt-1">
                                <MapPin className="size-5 text-gray-600" />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">Address</h4>
                                <p className="text-gray-600">{user.address?.address}</p>
                                <p className="text-gray-600">{user.address?.suburb}</p>
                            </div>
                        </div>
                    </div>
                }
                <div className={`border rounded-xl p-4 col-span-2`}>
                    <div className="flex items-start gap-3">
                        <div className="mt-1">
                            <FileText className="size-5 text-gray-600" />
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900">Local License</h4>
                            <p className="text-gray-600">License Number: {learner.localLicense?.licenseNumber}</p>
                            <p className="text-gray-600">Issue Date: {learner.localLicense?.issueDate}</p>
                            <p className="text-gray-600">Expiry Date: {learner.localLicense.expiryDate}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearnerDetails;