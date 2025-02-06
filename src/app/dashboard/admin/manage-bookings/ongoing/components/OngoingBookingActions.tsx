import { FC, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import UpdateBookingStatus from '../../components/shared/UpdateBookingStatus';
import ViewDetailsDialogBtn from '@/app/dashboard/components/shared/view-details/ViewDetailsDialogBtn';
import BookingDetails from '../../../../components/shared/booking-details/BookingDetails';

interface IOngoingBookingActionsProps {
    id: string;
}

const OngoingBookingActions: FC<IOngoingBookingActionsProps> = ({ id }) => {
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
                    <ViewDetailsDialogBtn title={"Booking Details"}>
                        <BookingDetails id={id} />
                    </ViewDetailsDialogBtn>
                    <UpdateBookingStatus setDropdownIsOpen={setDropdownIsOpen} id={id} status={"complete"} />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default OngoingBookingActions;