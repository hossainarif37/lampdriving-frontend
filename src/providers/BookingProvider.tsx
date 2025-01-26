import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { IInstructor } from '@/types/instructor';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetAInstructorQuery } from '@/redux/api/instructorApi/instructorApi';
import Loading from '@/components/shared/Loading';
import { useForm } from 'react-hook-form';
import { ILoginInputs, IRegisterInputs } from '@/types/auth';
import { IBookingContext, IPaymentInfo, IPrice, IStep, ITestPackage } from '@/types/booking';
import { stepsWithOutRegister, stepsWithRegister } from '@/constant/booking/bookingSteps';
import { useAppSelector } from '@/redux/hook';
import { IScheduleInputs } from '@/types/schedule';


const BookingContext = createContext<IBookingContext | undefined>(undefined);


// Create the provider component
export const BookingProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const urlSearchParams = useSearchParams();
    const step = urlSearchParams.get('step');
    const { isAuthenticate, isAuthLoading } = useAppSelector(state => state.authSlice);


    const initialCurrentStep = (step && stepsWithRegister.find(currstep => currstep.key === (step === "login" ? "register" : step))) || stepsWithRegister[0];
    const [currentStep, setCurrentStep] = useState<IStep>(initialCurrentStep);
    const [steps, setSteps] = useState<IStep[]>(isAuthenticate ? stepsWithOutRegister : stepsWithRegister);

    const [instructor, setInstructor] = useState<Partial<IInstructor> | null>(null);
    const [isCustomSelected, setIsCustomSelected] = useState(false);
    const [bookingHours, setBookingHours] = useState<number>(0);
    const [testPackage, setTestPackage] = useState<ITestPackage>({ included: false, price: 225 });
    const [mockTestPackage, setMockTestPackage] = useState<ITestPackage>({ included: false, price: 390 });
    const [price, setPrice] = useState<IPrice>({ payableAmount: 0, originalAmount: 0, discountedAmount: 0 });
    const [paymentInfo, setPaymentInfo] = useState<IPaymentInfo>({ transactionId: '', method: '' });
    const [schedules, setSchedules] = useState<IScheduleInputs[]>([]);
    const [isAllScheduled, setIsAllScheduled] = useState(false);

    const useRegisterForm = useForm<IRegisterInputs>();
    const useLoginForm = useForm<ILoginInputs>();
    const [isConfirmTriggered, setIsConfirmTriggered] = useState(false);
    const [isCreatingABooking, setIsCreatingABooking] = useState(false);

    // handle step change
    const handleStepChange = (stepKey: string) => {
        const isPackageSelected = bookingHours || testPackage.included || mockTestPackage.included;

        const requestedStep = steps.find(step => step.key === stepKey);

        if (!requestedStep || requestedStep.key === 'instructor') return;

        // validation for each step
        if (stepKey !== 'instructor' && stepKey !== 'package-selection') {
            if (stepKey === 'schedule' && !isPackageSelected) {
                return;
            }
            else if (stepKey === 'register' && (!isPackageSelected || !schedules.length)) {
                return;
            }
            else if (stepKey === 'payment' && (!isPackageSelected || !schedules.length || !isAuthenticate)) {
                return;
            }
        }

        // if pass all validation then redirect to the step
        const params = new URLSearchParams(urlSearchParams.toString());
        params.set('step', stepKey);
        router.push(`?${params.toString()}`);
        setCurrentStep(requestedStep);
    };

    // calculate available schedule hours
    const addedHours = schedules.reduce((total, schedule) => {
        if (schedule.type === "test") {
            return total;
        }
        return total + schedule.duration;
    }, 0);
    const availableScheduleHours = bookingHours - addedHours;

    // check if test package is selected
    const isTestPackageSelected = schedules.find(schedule => schedule.type === "test") ? true : false;

    const value = useMemo(() => ({
        instructor, setInstructor,
        bookingHours, setBookingHours,
        testPackage, setTestPackage,
        price, setPrice,
        isCustomSelected, setIsCustomSelected,
        paymentInfo, setPaymentInfo,
        schedules, setSchedules,
        steps: steps, currentStep, setCurrentStep,
        useRegisterForm, useLoginForm,
        handleStepChange,
        isConfirmTriggered, setIsConfirmTriggered,
        isCreatingABooking, setIsCreatingABooking,
        mockTestPackage, setMockTestPackage, availableScheduleHours, isTestPackageSelected, isAllScheduled
    }), [instructor, bookingHours, testPackage, price, isCustomSelected, paymentInfo, schedules, currentStep, useRegisterForm, useLoginForm, isConfirmTriggered, setIsConfirmTriggered, isCreatingABooking, setIsCreatingABooking, availableScheduleHours, mockTestPackage, isTestPackageSelected, isAllScheduled]);

    const router = useRouter();
    const instructorQuery = urlSearchParams.get('instructor');

    if (!instructorQuery) {
        router.push('/');
    }


    const { data: instructorResponse, isLoading } = useGetAInstructorQuery({ username: instructorQuery! });

    // handle steps
    useEffect(() => {
        setSteps(isAuthenticate ? stepsWithOutRegister : stepsWithRegister);
    }, [isAuthLoading])


    // handle instructor data
    useEffect(() => {
        if (!instructorResponse?.success && !isLoading) {
            router.push('/');
        } else if (instructorResponse?.success && !isLoading) {
            setInstructor(instructorResponse.data);
        }
    }, [instructorResponse])


    // calculate price
    useEffect(() => {
        const totalAmount = bookingHours * (instructor?.pricePerHour || 0);
        if (bookingHours >= 10) {
            setPrice({ originalAmount: totalAmount, payableAmount: totalAmount * 0.9, discountedAmount: totalAmount * 0.1 }); // 10% discount
        } else if (bookingHours >= 6) {
            setPrice({ originalAmount: totalAmount, payableAmount: totalAmount * 0.94, discountedAmount: totalAmount * 0.06 }); // 6% discount (equivalent to paying 94%)
        } else {
            setPrice({ originalAmount: totalAmount, payableAmount: totalAmount, discountedAmount: 0 }); // No discount
        }
        if (testPackage.included) {
            setPrice((prevPrice) => ({ ...prevPrice, payableAmount: prevPrice.payableAmount + testPackage.price })); // Add test package price
        }

        if (mockTestPackage.included) {
            setPrice((prevPrice) => ({ ...prevPrice, payableAmount: prevPrice.payableAmount + mockTestPackage.price })); // Add test package price
        }
    }, [bookingHours, testPackage.included, mockTestPackage.included]);


    // Handle initial step and URL changes
    useEffect(() => {
        const stepFromUrl = urlSearchParams.get('step');
        const isPackageSelected = bookingHours || testPackage.included || mockTestPackage.included;

        if (!stepFromUrl) {
            handleStepChange('package-selection');
            return;
        }
        // console.log(isPackageSelected, schedules.length, isAuthenticate)
        // Validate the URL step

        const isAllScheduled = (testPackage.included ? isTestPackageSelected ? true : false : true) && availableScheduleHours === 0;
        setIsAllScheduled(isAllScheduled);

        if (stepFromUrl !== 'instructor' && stepFromUrl !== 'package-selection') {
            if (stepFromUrl === 'schedule' && !isPackageSelected) {
                handleStepChange('package-selection');
                return;
            }
            else if (stepFromUrl === 'register' && (!isPackageSelected || !isAllScheduled)) {
                handleStepChange(isPackageSelected ? 'schedule' : 'package-selection');
                return;
            }
            else if (stepFromUrl === 'payment' && (!isPackageSelected || !isAllScheduled || !isAuthenticate)) {
                console.log('first')
                if (!isPackageSelected) {
                    handleStepChange('package-selection');
                } else if (!isAllScheduled) {
                    console.log('second');
                    handleStepChange('schedule');
                } else if (!isAuthenticate) {
                    handleStepChange('register');
                }
                return;
            }
        }


        const validStep = steps.find(step => step.key === stepFromUrl);
        if (validStep) {
            setCurrentStep(validStep);
        }
    }, [urlSearchParams, bookingHours, testPackage.included, mockTestPackage.included, schedules, isAuthenticate, isTestPackageSelected, availableScheduleHours]);

    if (isLoading) {
        return <Loading />
    }

    return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

// Custom hook to use the context
export const useBooking = (): IBookingContext => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
};
