import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { FC, useState } from 'react';
import DeleteLearner from './DeleteLearner';

interface IManageLearnersActionsProps {
    id: string;
}

const ManageLearnersActions: FC<IManageLearnersActionsProps> = ({ id }) => {
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
    return (
        <div>
            <DropdownMenu open={dropdownIsOpen} onOpenChange={setDropdownIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button className="h-8 w-8 p-0 bg-transparent hover:bg-gray-100 text-secondary">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className='flex flex-col'>
                    <DropdownMenuLabel className='border-b'>Actions</DropdownMenuLabel>
                    <Button variant={"ghost"} className='h-[36px] py-0 font-normal capitalize text-start justify-start px-2'>View Details</Button>
                    <Button variant={"ghost"} className='h-[36px] py-0 font-normal capitalize text-start justify-start px-2'>Block</Button>
                    <DeleteLearner id={id} setDropdownIsOpen={setDropdownIsOpen} />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ManageLearnersActions;