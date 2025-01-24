import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { FC, useState } from 'react';
import UpdateInstructorStatus from './UpdateInstructorStatus';
import ViewDetailsDialogBtn from '@/app/dashboard/components/shared/view-details/ViewDetailsDialogBtn';
import InstructorDetails from '../../components/instructor-details/InstructorDetails';

interface IPendingInstructorActionsProps {
    id: string;
}

const PendingInstructorActions: FC<IPendingInstructorActionsProps> = ({ id }) => {
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
                    <ViewDetailsDialogBtn title={"Instructor Details"}>
                        <InstructorDetails id={id} />
                    </ViewDetailsDialogBtn>
                    <Button variant={"ghost"} className='h-[36px] py-0 font-normal capitalize text-start justify-start px-2'>Block</Button>
                    <UpdateInstructorStatus status='verify' id={id} setDropdownIsOpen={setDropdownIsOpen} />
                    <UpdateInstructorStatus status='reject' id={id} setDropdownIsOpen={setDropdownIsOpen} />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default PendingInstructorActions;