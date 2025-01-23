import DropOffLocation from '@/app/(root)/instructors/booking/components/schedule-step/DropOffLocation';
import PickupLocation from '@/app/(root)/instructors/booking/components/schedule-step/PickupLocation';
import { IAddress } from '@/types/user';
import { FC } from 'react';

interface IRescheduleLocationProps {
    type: string;
    pickupLocation: IAddress;
    setPickupLocation: any;
    pickupLocationError: {
        address: boolean;
        suburb: boolean;
    };
    dropOffLocationError: {
        address: boolean;
        suburb: boolean;
    };
    dropOffLocation: IAddress;
    setDropOffLocation: any;
}

const RescheduleLocation: FC<IRescheduleLocationProps> = ({ type, pickupLocation, setPickupLocation, pickupLocationError, dropOffLocationError, dropOffLocation, setDropOffLocation }) => {
    return (
        <>
            <div className={`${type === "test" ? 'col-span-1' : 'col-span-2'}`}>
                <PickupLocation
                    className="border-none"
                    error={pickupLocationError}
                    value={pickupLocation}
                    onChange={setPickupLocation}
                />
            </div>
            {
                type === "test" &&
                <div>
                    <DropOffLocation
                        className="border-none"
                        error={dropOffLocationError}
                        value={dropOffLocation}
                        onChange={setDropOffLocation}
                    />
                </div>
            }
        </>
    );
};

export default RescheduleLocation;