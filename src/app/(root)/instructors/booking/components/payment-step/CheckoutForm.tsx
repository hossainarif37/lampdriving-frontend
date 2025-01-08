import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useBooking } from '@/providers/BookingProvider';
import { useCreateABookingMutation } from '@/redux/api/bookingApi/bookingApi';
import { useAppSelector } from '@/redux/hook';
import { IBookingInputs } from '@/types/booking';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { FC, useEffect } from 'react';

const CheckoutForm: FC<{ clientSecret: string }> = ({ clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { isConfirmTriggered, setIsConfirmTriggered, instructor, price, bookingHours, schedules, setIsCreatingABooking } = useBooking();
    const { user } = useAppSelector((state) => state.authSlice);
    const [createABooking] = useCreateABookingMutation();

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
            console.log(error);
            toast({
                success: false,
                message: error.payment_intent?.status == "succeeded" ? "Duplicate payment" : error.message || "Payment failed"
            })
            setIsCreatingABooking(false);
        }

        if (!user?._id || !instructor?._id || !paymentIntent) {
            return;
        }

        const reqData: IBookingInputs = {
            bookingInfo: {
                learner: user ? typeof user?.learner !== "string" ? user?.learner?._id ?? "" : user?.learner ?? "" : "",
                instructor: instructor?._id,
                price: price.payableAmount,
                bookingHours,
                schedules
            },
            transactionInfo: {
                user: user?._id,
                amount: price.payableAmount,
                transactionId: paymentIntent?.id,
                method: "card",
            }
        }

        createABooking(reqData).unwrap().then((res) => {
            toast({
                message: res.message,
            })
            setIsCreatingABooking(false);
        }).catch((err) => {
            toast({
                success: false,
                message: err.data.message || "Something went wrong",
            })
            setIsCreatingABooking(false);
        })
    };

    useEffect(() => {
        const handleTrigger = async () => {
            if (isConfirmTriggered) {
                setIsCreatingABooking(true);
                await handleSubmit();
                setIsConfirmTriggered(false);
                // setIsCreatingABooking(false);
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
