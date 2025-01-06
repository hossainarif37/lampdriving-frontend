import { FC } from 'react';
import UpdatePassword from '../shared-profile/UpdatePassword';

const SecurityForm: FC = () => {
    return (
        <UpdatePassword
            className='md:w-full lg:w-full md:shadow-none md:rounded-none p-0 md:p-0 md:border-none mt-0'
        />
    );
};

export default SecurityForm;