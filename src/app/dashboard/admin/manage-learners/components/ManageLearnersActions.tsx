import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { FC, useState } from 'react';
import DeleteUser from '../../components/shared/DeleteUser';
import UpdateUserStatus from '../../components/shared/UpdateUserStatus';
import ViewDetailsDialogBtn from '@/app/dashboard/components/shared/view-details/ViewDetailsDialogBtn';
import LearnerDetails from './learner-details/LearnerDetails';

interface IManageLearnersActionsProps {
    id: string;
}

const ManageLearnersActions: FC<IManageLearnersActionsProps> = ({ id }) => {
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
                    <ViewDetailsDialogBtn title={"Learner Details"}>
                        <LearnerDetails id={id} />
                    </ViewDetailsDialogBtn>
                    <UpdateUserStatus id={id} setDropdownIsOpen={setDropdownIsOpen} role='instructor' status='blocked' />
                    <DeleteUser role='learner' id={id} setDropdownIsOpen={setDropdownIsOpen} />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ManageLearnersActions;