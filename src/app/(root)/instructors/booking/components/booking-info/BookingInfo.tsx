import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useBooking } from '@/providers/BookingProvider';
import { useLoginUserMutation, useRegisterUserMutation } from '@/redux/api/authApi/authApi';
import { useAppDispatch } from '@/redux/hook';
import { saveUser } from '@/redux/slices/authSlice/authSlice';
import { ILoginInputs, IRegisterInputs } from '@/types/auth';
import { Clock, NotepadText, TicketPercent } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';



const BookingInfo: FC = () => {
    const { price, bookingHours, schedules, testPackage, useRegisterForm, useLoginForm, currentStep, setCurrentStep, handleStepChange } = useBooking();

    // register and login button trigger
    const { trigger: registerTrigger, handleSubmit: handleRegisterSubmit } = useRegisterForm;
    const { trigger: loginTrigger, handleSubmit: handleLoginSubmit } = useLoginForm;

    // register and login mutation
    const [registerUser, { isLoading: isRegistering }] = useRegisterUserMutation();
    const [loginUser, { isLoading: isLoginLoading }] = useLoginUserMutation();

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
            searchParams.set('step', 'payment');
            router.replace(`?${searchParams.toString()}`);
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
            searchParams.set('step', 'payment');
            router.replace(`?${searchParams.toString()}`);
        }).catch((err) => {
            toast({
                success: false,
                message: err.data.message || "Something went wrong"
            });
        })
    }


    // handle trigger function for hook form
    const handleTrigger = async () => {
        const registerStep = searchParams.get('step');
        if (registerStep == "register") {
            await registerTrigger().then((_res) => handleRegisterSubmit(handleRegister)());
        } else if (registerStep == "login") {
            await loginTrigger().then((_res) => handleLoginSubmit(handleLogin)());
        }
    }



    const handleNavigate = () => {
        if (currentStep.key === "instructor") {
            return handleStepChange("package-selection");
        }
        else if (currentStep.key === "package-selection") {
            return handleStepChange("schedule");
        }
        else if (currentStep.key === "schedule") {
            return handleStepChange("register");
        }
        else if (currentStep.key === "register" || currentStep.key === "login") {
            handleTrigger();
        }
    }

    const isDisable = (currentStep.key === "package-selection" && !bookingHours && !testPackage.included) ||
        (currentStep.key === "schedule" && !schedules.length)
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

                <Button disabled={isDisable} onClick={handleTrigger} className='w-full'>
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