import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useBooking } from '@/providers/BookingProvider';
import { useLoginUserMutation, useRegisterUserMutation } from '@/redux/api/authApi/authApi';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { saveUser } from '@/redux/slices/authSlice/authSlice';
import { ILoginInputs, IRegisterInputs } from '@/types/auth';
import { Clock, NotepadText, TicketPercent } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';



const BookingInfo: FC = () => {
    const { isCreatingABooking, price, bookingHours, schedules, testPackage, mockTestPackage, useRegisterForm, useLoginForm, currentStep, handleStepChange, setIsConfirmTriggered, setCurrentStep, steps } = useBooking();

    // register and login button trigger
    const { trigger: registerTrigger, handleSubmit: handleRegisterSubmit } = useRegisterForm;
    const { trigger: loginTrigger, handleSubmit: handleLoginSubmit } = useLoginForm;
    const isAuthenticate = useAppSelector(state => state.authSlice.isAuthenticate);
    // register, login, booking create mutation
    const [registerUser, { isLoading: isRegistering }] = useRegisterUserMutation();
    const [loginUser, { isLoading: isLogging }] = useLoginUserMutation();

    const dispatch = useAppDispatch();

    const urlSearchParams = useSearchParams();
    const searchParams = new URLSearchParams(urlSearchParams);
    const router = useRouter();

    // handle register function
    const handleRegister = (data: IRegisterInputs) => {
        registerUser(data).unwrap().then((res) => {
            toast({
                message: res.message,
            })
            const params = new URLSearchParams(urlSearchParams.toString());
            const step = steps.find(step => step.key === "payment");
            if (!step) {
                return;
            }
            params.set('step', step.key);
            router.push(`?${params.toString()}`);
            setCurrentStep(step);
            handleStepChange("payment");
        }).catch((err) => {
            toast({
                success: false,
                message: err.data.message || "Something went wrong",
            })
        })
    }


    // handle login function
    const handleLogin = (data: ILoginInputs) => {
        loginUser(data).unwrap().then((res) => {
            toast({
                message: res.message
            });
            dispatch(saveUser({ user: res.data, isAuthenticate: true, isLoading: false }));
            const params = new URLSearchParams(urlSearchParams.toString());
            const step = steps.find(step => step.key === "payment");
            if (!step) {
                return;
            }
            params.set('step', step.key);
            router.push(`?${params.toString()}`);
            setCurrentStep(step);
            handleStepChange("payment");
        }).catch((err) => {
            toast({
                success: false,
                message: err.data.message || "Something went wrong"
            });
        })
    }


    // handle trigger function for hook form
    const registerStep = searchParams.get('step');
    const handleTrigger = async () => {
        if (registerStep == "register") {
            await registerTrigger().then((_res) => handleRegisterSubmit(handleRegister)());
        } else if (registerStep == "login") {
            await loginTrigger().then((_res) => handleLoginSubmit(handleLogin)());
        }
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
        else if (currentStep.key === "register") {
            handleTrigger();
        } else if (currentStep.key === "payment") {
            setIsConfirmTriggered(true);
        }
    }



    const isDisable = (currentStep.key === "package-selection" && !bookingHours && !testPackage.included && !mockTestPackage.included) ||
        (currentStep.key === "schedule" && !schedules.length) || (isLogging || isRegistering || isCreatingABooking);
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
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

                {
                    mockTestPackage.included &&
                    <>
                        <hr />
                        <div className="flex justify-between">
                            <span className="flex gap-2">
                                <NotepadText className="size-5 text-primary" />
                                Mock Tests + Test Package
                            </span>
                            <span>${mockTestPackage.price}</span>
                        </div>
                    </>
                }

                <div className="pt-4 border-t">
                    <div className="flex justify-between font-semibold">
                        <span>Total Payable Amount</span>
                        <span className="text-xl">${price.payableAmount.toFixed(2)}</span>
                    </div>
                </div>

                <Button loading={isCreatingABooking || isRegistering || isLogging} disabled={isDisable} onClick={handleNavigate} className='w-full'>
                    {
                        currentStep.key == "instructor" ? "Choose Instructor" :
                            currentStep.key == "package-selection" ? "Continue" :
                                currentStep.key == "schedule" ? "Continue" :
                                    (registerStep == "register") ? isAuthenticate ? "Continue" : "Register" :
                                        (registerStep == "login") ? isAuthenticate ? "Continue" : "Login" :
                                            currentStep.key == "payment" && "Pay & Confirm"

                    }
                </Button>
            </div>
        </div>
    );
};

export default BookingInfo;