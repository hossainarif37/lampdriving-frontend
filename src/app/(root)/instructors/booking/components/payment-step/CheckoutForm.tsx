import { Button } from '@/components/ui/button';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { FC } from 'react';

const CheckoutForm: FC<{ clientSecret: string }> = ({ clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            console.error("Stripe or Elements not loaded");
            return;
        }

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required"
        });

        if (error) {
            console.error("Payment failed:", error.message);
            alert(`Payment failed: ${error.message}`);
        } else {
            console.log("Payment successful");
        }

        console.log(paymentIntent)
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <Button
                type="submit"
                disabled={!stripe || !elements}
            >
                Pay Now
            </Button>
        </form>
    );
};

export default CheckoutForm;
