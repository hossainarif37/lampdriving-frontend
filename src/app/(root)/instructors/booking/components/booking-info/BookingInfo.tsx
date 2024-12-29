import { Button } from '@/components/ui/button';
import { useBooking } from '@/providers/BookingProvider';
import { Clock, NotepadText, TicketPercent } from 'lucide-react';
import { FC } from 'react';



const BookingInfo: FC = () => {
    const { price, bookingHours, testPackage, useRegisterForm, useLoginForm, currentStep } = useBooking();


    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-10 z-10">
            <h2 className="text-lg font-semibold mb-4">Booking Info</h2>

            <div className="space-y-4">
                <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                        <Clock className="size-5 text-primary" />
                        {bookingHours} hrs Booking Credit
                    </span>
                    <span>${price.originalAmount.toFixed(2)}</span>
                </div>

                {
                    bookingHours >= 6 &&
                    <>
                        <hr />
                        <div className="flex justify-between">
                            <span className="flex items-center gap-2">
                                <TicketPercent className="size-5 text-primary" />
                                Credit Discount
                                <span className="text-sm font-medium bg-[#dbeafe] text-primary px-2 py-1 rounded">
                                    {bookingHours >= 10 ? 10 : bookingHours >= 6 ? 6 : 0}% OFF</span>
                            </span>
                            <span>- ${price.discountedAmount.toFixed(2)}</span>
                        </div>
                    </>
                }

                {
                    testPackage.included &&
                    <>
                        <hr />
                        <div className="flex justify-between">
                            <span className="flex gap-2">
                                <NotepadText className="size-5 text-primary" />
                                Driving Test Package
                            </span>
                            <span>${testPackage.price}</span>
                        </div>
                    </>
                }

                <div className="pt-4 border-t">
                    <div className="flex justify-between font-semibold">
                        <span>Total Payable Amount</span>
                        <span className="text-xl">${price.payableAmount.toFixed(2)}</span>
                    </div>
                </div>

                <Button className='w-full'>
                    {
                        currentStep.key == "instructor" ? "Choose Instructor" :
                            currentStep.key == "package-selection" ? "Select Package" :
                                currentStep.key == "schedule" ? "Select Schedule" :
                                    currentStep.key == "register" ? "Register Now" :
                                        currentStep.key == "login" ? "Login Now" :
                                            currentStep.key == "payment" && "Pay Now"

                    }
                </Button>
            </div>
        </div>
    );
};

export default BookingInfo;