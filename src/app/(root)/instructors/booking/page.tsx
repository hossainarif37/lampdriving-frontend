import { FC } from 'react';
import BookingSteps from './components/booking-steps/BookingSteps';
import Booking from './components/booking/Booking';


const BookingPage: FC = () => {
    return (
        <div className='wrapper py-8'>
            <BookingSteps />
            <Booking />
        </div>
    );
};

export default BookingPage;