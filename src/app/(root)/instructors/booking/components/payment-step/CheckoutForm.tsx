import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { useBooking } from '@/providers/BookingProvider';
import { useCreateABookingMutation } from '@/redux/api/bookingApi/bookingApi';
import { useAppSelector } from '@/redux/hook';
import { IBookingInputs } from '@/types/booking';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

const CheckoutForm: FC<{ clientSecret: string }> = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { isConfirmTriggered, setIsConfirmTriggered, instructor, price, bookingHours, schedules, setIsCreatingABooking, setPaymentInfo } = useBooking();
    const { user } = useAppSelector((state) => state.authSlice);
    const [createABooking] = useCreateABookingMutation();
    const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
    const [termsError, setTermsError] = useState<boolean>(false);
    const urlSearchParams = useSearchParams();
    const router = useRouter();

    const handleSubmit = async () => {
        if (!termsAccepted) {
            setTermsError(true);
            setIsCreatingABooking(false);
            return;
        }
        if (!stripe || !elements) {
            setIsCreatingABooking(false);
            return;
        }

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required"
        });


        if (error) {
            if (error.payment_intent?.status !== "succeeded") {
                toast({
                    success: false,
                    message: error.message || "Payment failed"
                })
                setIsCreatingABooking(false);
            }
        }

        if (!user?._id || !instructor?._id || (!paymentIntent && !error.payment_intent?.status)) {
            setIsCreatingABooking(false);
            return;
        }
        setPaymentInfo(pre => ({ ...pre, transactionId: paymentIntent?.id || (error as any)?.payment_intent?.id }))

        const reqData: IBookingInputs = {
            bookingInfo: {
                learner: user ? typeof user?.learner !== "string" ? user?.learner?._id ?? "" : user?.learner ?? "" : "",
                instructor: instructor?._id,
                price: price.payableAmount,
                bookingHours,
                schedules
            },
            paymentInfo: {
                user: user?._id,
                amount: price.payableAmount,
                transactionId: paymentIntent?.id || (error as any)?.payment_intent?.id,
                method: "card",
            }
        }

        createABooking(reqData).unwrap().then((res) => {
            toast({
                message: res.message,
            })
            const searchParams = new URLSearchParams(urlSearchParams);
            searchParams.set('step', "success");
            router.replace(`?${searchParams.toString()}`);
            setIsCreatingABooking(false)
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


    const handleCheckTerms = (checked: boolean) => {
        setTermsError(checked ? false : true);
        setTermsAccepted(checked)
    }
    return (
        <>
            <form>
                <PaymentElement />
                <div className="w-full">
                    <div className="flex items-center space-x-2 mt-3">
                        <Input
                            type="checkbox"
                            className="h-4 w-4 cursor-pointer"
                            id="terms"
                            checked={termsAccepted}
                            onChange={(e) => handleCheckTerms(e.target.checked)}
                        />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none select-none cursor-pointer"
                        >
                            I accept the{" "}
                            <Link
                                target="_blank"
                                href="#"
                                className="text-primary-600 underline"
                            >
                                refund and cancellation policy
                            </Link>
                        </label>
                    </div>
                    {termsError && (
                        <p className="text-red-500 text-sm mt-1">You must accept the refund and cancellation policy</p>
                    )}
                </div>
            </form>
        </>
    );
};

export default CheckoutForm;
