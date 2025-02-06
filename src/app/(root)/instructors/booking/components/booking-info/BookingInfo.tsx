"use client"

import { Button } from '@/components/ui/button';
import { toFixedNumber } from '@/lib/utils';
import { useBooking } from '@/providers/BookingProvider';
import { useAppSelector } from '@/redux/hook';
import { Clock, NotepadText, TicketPercent } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';



const BookingInfo: FC = () => {
    const { isCreatingABooking, price, bookingHours, availableScheduleHours, testPackage, currentStep, handleStepChange, setIsConfirmTriggered, isTestPackageSelected, registerButtonRef, loginButtonRef, isLogging, isRegistering, instructor } = useBooking();

    // register and login button trigger
    const isAuthenticate = useAppSelector(state => state.authSlice.isAuthenticate);

    const urlSearchParams = useSearchParams();
    const searchParams = new URLSearchParams(urlSearchParams || '');

    // handle trigger function for hook form
    const steps = searchParams.get('step');
    const registerStep = steps === 'register';
    const loginStep = steps === 'login';

    const handleRegisterTrigger = () => {
        registerButtonRef.current?.click();
    }
    const handleLoginTrigger = () => {
        loginButtonRef.current?.click();
    }

    // handler for navigating
    const handleNavigate = () => {
        if (currentStep.key === "instructor") {
            return handleStepChange("package-selection");
        }
        else if (currentStep.key === "package-selection") {
            return handleStepChange("schedule");
        }
        else if (currentStep.key === "schedule") {
            if (isAuthenticate) {
                return handleStepChange("payment");
            } else {
                return handleStepChange("register");
            }
        }
        else if (registerStep) {
            handleRegisterTrigger();
        } else if (loginStep) {
            handleLoginTrigger();
        }
        else if (currentStep.key === "payment") {
            setIsConfirmTriggered(true);
        }
    }


    let isDisable = (currentStep.key === "package-selection" && !bookingHours && !testPackage.included) ||
        (currentStep.key === "schedule" && (availableScheduleHours > 0 || (testPackage.included && !isTestPackageSelected))) || (isLogging || isRegistering || isCreatingABooking);

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Booking Info</h2>

            <div className="space-y-4">
                <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                        <Clock className="size-5 text-primary" />
                        {bookingHours} hrs Booking Credit
                    </span>
                    <span>${toFixedNumber(price.originalAmount ?? 0)}</span>
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
                            <span>- ${toFixedNumber(price.discountedAmount ?? 0)}</span>
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
                                Driving Test
                            </span>
                            <span>${testPackage.price}</span>
                        </div>
                    </>
                }

                {
                    testPackage.mockTestCount > 0 &&
                    <>
                        <hr />
                        <div className="flex justify-between">
                            <span className="flex gap-2">
                                <NotepadText className="size-5 text-primary" />
                                Mock Test * {testPackage.mockTestCount}
                            </span>
                            <span>${testPackage.mockTestCount * (instructor?.pricePerHour || 0)}</span>
                        </div>
                    </>
                }

                <div className="pt-4 border-t">
                    <div className="flex justify-between font-semibold">
                        <span>Total Payable Amount</span>
                        <span className="text-xl">${toFixedNumber(price.paidAmount ?? 0)}</span>
                    </div>
                </div>

                <Button loading={isCreatingABooking || isRegistering || isLogging} disabled={isDisable} onClick={handleNavigate} className='w-full'>
                    {
                        currentStep.key == "instructor" ? "Choose Instructor" :
                            currentStep.key == "package-selection" ? "Continue" :
                                currentStep.key == "schedule" ? "Continue" :
                                    (steps == "register") ? isAuthenticate ? "Continue" : "Register" :
                                        (steps == "login") ? isAuthenticate ? "Continue" : "Login" :
                                            currentStep.key == "payment" && "Pay & Confirm"
                    }
                </Button>
            </div>
        </div>
    );
};

export default BookingInfo;