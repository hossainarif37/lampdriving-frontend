import { FC, useState } from 'react';
import PaymentInstructions from './PaymentInstructions';
import PaymentFrom from './PaymentFrom';



const PaymentStep: FC = () => {



    return (
        <div className='space-y-6'>
            <PaymentInstructions />
            <PaymentFrom/>
        </div>
    );
};

export default PaymentStep;