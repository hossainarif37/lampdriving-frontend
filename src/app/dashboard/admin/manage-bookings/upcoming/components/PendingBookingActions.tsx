import { FC, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import UpdateBookingStatus from '../../components/shared/UpdateBookingStatus';

interface IPendingBookingActionsProps {
    id: string;
}

const PendingBookingActions: FC<IPendingBookingActionsProps> = ({ id }) => {
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
                    <Button variant={"ghost"} className='h-[36px] py-0 font-normal capitalize text-start justify-start px-2'>View Details</Button>
                    <UpdateBookingStatus setDropdownIsOpen={setDropdownIsOpen} id={id} status={"accept"} />
                    <UpdateBookingStatus setDropdownIsOpen={setDropdownIsOpen} id={id} status={"cancel"} />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default PendingBookingActions;