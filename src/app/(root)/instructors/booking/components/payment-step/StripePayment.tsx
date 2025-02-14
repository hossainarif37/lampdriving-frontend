import { FC, useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { envConfigs } from '@/configs/envConfigs';
import { useCreatePaymentIntentMutation } from '@/redux/api/transactionApi/transactionApi';
import { useBooking } from '@/providers/BookingProvider';


const stripePromise = loadStripe(envConfigs.stripePublishableKey as string);

const StripePayment: FC = () => {
    const { price } = useBooking();
    const [createPaymentIntent, { isLoading }] = useCreatePaymentIntentMutation();
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    useEffect(() => {
        if (price.paidAmount && !clientSecret) {
            createPaymentIntent({ price: Number(price.paidAmount) }).unwrap().then((response) => {
                if (response.data) {
                    setClientSecret(response.data.clientSecret);
                }
            });
        }
    }, [price]);

    const options: StripeElementsOptions = {
        clientSecret: clientSecret || "",
        appearance: {
            theme: 'stripe',
            variables: {
                colorPrimary: '#0570de',
                colorBackground: '#ffffff',
                colorText: '#30313d',
                colorDanger: '#df1b41',
                spacingUnit: '4px',
                borderRadius: '8px',
            },
        },
    };


    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {clientSecret && (
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm clientSecret={clientSecret} />
                </Elements>
            )}
        </div>
    );
};

export default StripePayment;