import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { FC, useState } from 'react';
import UpdateInstructorStatus from './UpdateInstructorStatus';
import ViewDetailsDialogBtn from '@/app/dashboard/components/shared/view-details/ViewDetailsDialogBtn';
import InstructorDetails from '../../components/instructor-details/InstructorDetails';
import UpdateUserStatus from '../../../components/shared/UpdateUserStatus';
import DeleteUser from '../../../components/shared/DeleteUser';

interface IPendingInstructorActionsProps {
    id: string;
}

const PendingInstructorActions: FC<IPendingInstructorActionsProps> = ({ id }) => {
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
                    <ViewDetailsDialogBtn title={"Instructor Details"}>
                        <InstructorDetails id={id} />
                    </ViewDetailsDialogBtn>
                    <UpdateInstructorStatus status='verify' id={id} setDropdownIsOpen={setDropdownIsOpen} />
                    <UpdateInstructorStatus status='reject' id={id} setDropdownIsOpen={setDropdownIsOpen} />
                    <UpdateUserStatus id={id} setDropdownIsOpen={setDropdownIsOpen} role='instructor' status='blocked' />
                    <DeleteUser role='instructor' id={id} setDropdownIsOpen={setDropdownIsOpen} />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default PendingInstructorActions;