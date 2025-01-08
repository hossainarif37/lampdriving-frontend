import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useBooking } from '@/providers/BookingProvider';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { FC, useEffect } from 'react';

const CheckoutForm: FC<{ clientSecret: string }> = ({ clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { isConfirmTriggered, setIsConfirmTriggered } = useBooking();

    const handleSubmit = async () => {
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
            toast({
                success: false,
                message: error.message
            })
        } else {
            toast({
                message: "Payment successful"
            })
        }
        console.log(paymentIntent)
    };

    useEffect(() => {
        const handleTrigger = async () => {
            if (isConfirmTriggered) {
                await handleSubmit();
                setIsConfirmTriggered(false);
            }
        }

        handleTrigger();
    }, [isConfirmTriggered]);

    return (
        <>
            <form>
                <PaymentElement />
            </form>
        </>
    );
};

export default CheckoutForm;
