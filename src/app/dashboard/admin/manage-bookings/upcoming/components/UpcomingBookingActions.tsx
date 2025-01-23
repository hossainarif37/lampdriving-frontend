import { FC, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import UpdateBookingStatus from '../../components/shared/UpdateBookingStatus';
import BookingDetails from '../../components/shared/booking-details/BookingDetails';
import ViewDetailsDialogBtn from '@/app/dashboard/components/shared/view-details/ViewDetailsDialogBtn';

interface IUpcomingBookingActionsProps {
    id: string;
}

const UpcomingBookingActions: FC<IUpcomingBookingActionsProps> = ({ id }) => {
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

    return (
        <div>
            <DropdownMenu open={dropdownIsOpen} onOpenChange={setDropdownIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button className="h-8 w-8 p-0 bg-transparent hover:bg-gray-100 text-primary">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className='flex flex-col'>
                    <DropdownMenuLabel className='border-b'>Actions</DropdownMenuLabel>
                    <ViewDetailsDialogBtn title={"Booking Details"}>
                        <BookingDetails id={id} />
                    </ViewDetailsDialogBtn>
                    <UpdateBookingStatus setDropdownIsOpen={setDropdownIsOpen} id={id} status={"refund"} />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default UpcomingBookingActions;