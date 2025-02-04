import { FC, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import UpdateBookingStatus from './UpdateScheduleStatus';
import RescheduleAScheduleBtn from './reschedule-a-schedule/RescheduleAScheduleBtn';
import { IAddress } from '@/types/user';
import ViewDetailsDialogBtn from '@/app/dashboard/components/shared/view-details/ViewDetailsDialogBtn';
import ScheduleDetails from './schedule-details/ScheduleDetails';

interface IManageSchedulesActionsProps {
    id: string;
    username: string;
    duration: number;
    pickupAddress: IAddress;
    dropOffAddress?: IAddress;
    type: "lesson" | "test" | "mock-test";
    status: "upcoming" | "ongoing" | "completed" | "rescheduled" | "cancelled";
}

const ManageSchedulesActions: FC<IManageSchedulesActionsProps> = ({ id, username, duration, pickupAddress, dropOffAddress, type, status }) => {
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
                    <ViewDetailsDialogBtn title={"Schedule Details"}>
                        <ScheduleDetails role='instructor' id={id} />
                    </ViewDetailsDialogBtn>
                    {
                        (status === "upcoming" || status === "ongoing" || status === "rescheduled") && (
                            <UpdateBookingStatus setDropdownIsOpen={setDropdownIsOpen} id={id} status={(status === "upcoming" || status === "rescheduled") ? "ongoing" : "complete"} />
                        )
                    }
                    {
                        status === "upcoming" && (
                            <RescheduleAScheduleBtn
                                type={type}
                                duration={duration}
                                pickupAddress={pickupAddress}
                                dropOffAddress={dropOffAddress}
                                username={username} id={id} />
                        )
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ManageSchedulesActions;