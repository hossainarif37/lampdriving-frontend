import { FC } from 'react';
import BookingSteps from './components/BookingSteps/BookingSteps';

const BookingPage: FC = () => {

    return (
        <div className='wrapper'>
            <BookingSteps />
        </div>
    );
};

export default BookingPage;