import { FC } from 'react';
import Booking from './components/booking/Booking';


const BookingPage: FC = () => {
    return (
        <div className='wrapper py-8'>
            <Booking />
        </div>
    );
};

export default BookingPage;