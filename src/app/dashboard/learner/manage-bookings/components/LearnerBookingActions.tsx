import { FC, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import BookingDetails from '@/app/dashboard/components/shared/booking-details/BookingDetails';
import ViewDetailsDialogBtn from '@/app/dashboard/components/shared/view-details/ViewDetailsDialogBtn';
import GiveAReview from './GiveAReview';
import { IReview } from '@/types/review';

interface ILearnerBookingActionsProps {
    id: string;
    review?: IReview;
    status: "pending" | "accepted" | "completed" | "cancelled";
}

const LearnerBookingActions: FC<ILearnerBookingActionsProps> = ({ id, review, status }) => {
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

    return (
        <div>
            <DropdownMenu open={dropdownIsOpen} onOpenChange={setDropdownIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button size={"icon"} className="bg-transparent hover:bg-gray-100 text-primary">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className='flex flex-col'>
                    <DropdownMenuLabel className='border-b'>Actions</DropdownMenuLabel>
                    {status === "completed" && <GiveAReview bookingId={id} review={review} />}
                    <ViewDetailsDialogBtn title={"Booking Details"}>
                        <BookingDetails role='learner' id={id} />
                    </ViewDetailsDialogBtn>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default LearnerBookingActions;