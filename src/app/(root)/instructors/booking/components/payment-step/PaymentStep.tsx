import { FC } from 'react';
import StripePayment from './StripePayment';



const PaymentStep: FC = () => {

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-6">Payment Details</h2>
            <StripePayment />
        </div>
    );
};

export default PaymentStep;