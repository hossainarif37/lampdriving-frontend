import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
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
import { drivingTestPrice } from '@/constant/booking/testPackage';


const BookingContext = createContext<IBookingContext | undefined>(undefined);


// Create the provider component
export const BookingProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const urlSearchParams = useSearchParams();
    const step = urlSearchParams?.get('step');

    // Submit button ref
    const registerButtonRef = useRef<HTMLButtonElement>(null);
    const loginButtonRef = useRef<HTMLButtonElement>(null);

    const [isRegistering, setIsRegistering] = useState(false);
    const [isLogging, setIsLogging] = useState(false);

    const { isAuthenticate, isAuthLoading, user } = useAppSelector(state => state.authSlice);


    const initialCurrentStep = (step && stepsWithRegister.find(currstep => currstep.key === (step === "login" ? "register" : step))) || stepsWithRegister[0];
    const [currentStep, setCurrentStep] = useState<IStep>(initialCurrentStep);
    const [steps, setSteps] = useState<IStep[]>((isAuthenticate && user?.isEmailVerified) ? stepsWithOutRegister : stepsWithRegister);

    const [instructor, setInstructor] = useState<Partial<IInstructor> | null>(null);
    const [isCustomLessonSelected, setIsCustomLessonSelected] = useState(false);
    const [isCustomMockTestSelected, setIsCustomMockTestSelected] = useState(false);
    const [bookingHours, setBookingHours] = useState<number>(0);
    const [testPackage, setTestPackage] = useState<ITestPackage>({ included: false, price: drivingTestPrice, mockTestCount: 0 });
    const [price, setPrice] = useState<IPrice>({ paidAmount: 0, originalAmount: 0, discountedAmount: 0, discountedPercentage: 0 });
    const [paymentInfo, setPaymentInfo] = useState<IPaymentInfo>({ transactionId: '', method: '' });
    const [schedules, setSchedules] = useState<IScheduleInputs[]>([]);
    const [isAllScheduled, setIsAllScheduled] = useState(false);

    const useRegisterForm = useForm<IRegisterInputs>();
    const useLoginForm = useForm<ILoginInputs>();
    const [isConfirmTriggered, setIsConfirmTriggered] = useState(false);
    const [isCreatingABooking, setIsCreatingABooking] = useState(false);

    // handle step change
    const handleStepChange = (stepKey: string) => {
        const isPackageSelected = bookingHours || testPackage.included;

        const requestedStep = stepsWithRegister.find(step => step.key === stepKey);
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
        const params = new URLSearchParams(urlSearchParams?.toString());
        params.set('step', stepKey);
        router.push(`?${params.toString()}`);
        setCurrentStep(requestedStep);
    };

    // calculate available schedule hours
    const addedHours = schedules.reduce((total, schedule) => {
        if (schedule.type === "test" || schedule.type === "mock-test") {
            return total;
        }
        return total + schedule.duration;
    }, 0);
    const availableScheduleHours = bookingHours - addedHours;

    // check if test package is selected
    const isTestPackageSelected = schedules.find(schedule => schedule.type === "test") ? true : false;
    const isFirstMockTestScheduled = schedules.find(schedule => schedule.type === "mock-test" && schedule.duration === 2) ? true : false;
    const mockTestCount = schedules.filter(schedule => schedule.type === "mock-test" && schedule.duration === 1).length;
    const isAllMockTestScheduled = mockTestCount === (testPackage.mockTestCount - 1);

    const value = useMemo(() => ({
        instructor, setInstructor,
        bookingHours, setBookingHours,
        testPackage, setTestPackage,
        price, setPrice,
        isCustomLessonSelected, setIsCustomLessonSelected,
        isCustomMockTestSelected, setIsCustomMockTestSelected,
        paymentInfo, setPaymentInfo,
        schedules, setSchedules,
        steps: steps, currentStep, setCurrentStep,
        useRegisterForm, useLoginForm,
        handleStepChange,
        isConfirmTriggered, setIsConfirmTriggered,
        isCreatingABooking, setIsCreatingABooking,
        availableScheduleHours, isTestPackageSelected, isAllScheduled,
        registerButtonRef,
        isRegistering, setIsRegistering,
        loginButtonRef,
        isLogging, setIsLogging, isFirstMockTestScheduled, isAllMockTestScheduled
    }), [instructor, bookingHours, testPackage, price, isCustomLessonSelected,
        isCustomMockTestSelected, paymentInfo, schedules, currentStep,
        useRegisterForm, useLoginForm, isConfirmTriggered, setIsConfirmTriggered,
        isCreatingABooking, setIsCreatingABooking, availableScheduleHours,
        isTestPackageSelected, isAllScheduled, registerButtonRef, steps, isFirstMockTestScheduled, isAllMockTestScheduled,
        isRegistering, isLogging]);

    const router = useRouter();
    const instructorQuery = urlSearchParams?.get('instructor');

    if (!instructorQuery) {
        router.push('/');
    }


    const { data: instructorResponse, isLoading } = useGetAInstructorQuery({ username: instructorQuery! });

    // handle steps
    useEffect(() => {
        setSteps((isAuthenticate && user?.isEmailVerified) ? stepsWithOutRegister : stepsWithRegister);
    }, [isAuthLoading, isAuthenticate, user?.isEmailVerified])


    // 
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
            setPrice({ originalAmount: totalAmount, paidAmount: totalAmount * 0.9, discountedAmount: totalAmount * 0.1, discountedPercentage: 10 }); // 10% discount
        } else if (bookingHours >= 6) {
            setPrice({ originalAmount: totalAmount, paidAmount: totalAmount * 0.94, discountedAmount: totalAmount * 0.06, discountedPercentage: 6 }); // 6% discount (equivalent to paying 94%)
        } else {
            setPrice({ originalAmount: totalAmount, paidAmount: totalAmount, discountedAmount: 0, discountedPercentage: 0 }); // No discount
        }
        if (testPackage.included) {                                    // Add test package price
            if (testPackage.mockTestCount > 0) {
                setPrice((prevPrice) => ({ ...prevPrice, paidAmount: prevPrice.paidAmount + (testPackage.price + (testPackage.mockTestCount * (instructor?.pricePerHour || 0))) }));
            } else {
                setPrice((prevPrice) => ({ ...prevPrice, paidAmount: prevPrice.paidAmount + testPackage.price }));
            }
        }
    }, [bookingHours, testPackage]);


    // Handle initial step and URL changes
    useEffect(() => {
        const stepFromUrl = urlSearchParams?.get('step');
        const isPackageSelected = bookingHours || testPackage.included;

        if (!stepFromUrl) {
            handleStepChange('package-selection');
            return;
        }
        // Validate the URL step

        const isAllScheduled = (testPackage.included ? isTestPackageSelected ? true : false : true) && (testPackage.mockTestCount ? (isFirstMockTestScheduled && isAllMockTestScheduled) ? true : false : true) && availableScheduleHours === 0;
        setIsAllScheduled(isAllScheduled);

        if (stepFromUrl !== 'instructor' && stepFromUrl !== 'package-selection') {
            if (stepFromUrl === 'schedule' && !isPackageSelected) {
                handleStepChange('package-selection');
                return;
            }
            else if ((stepFromUrl === 'register' || stepFromUrl === 'login') && (!isPackageSelected || !isAllScheduled)) {
                handleStepChange(isPackageSelected ? 'schedule' : 'package-selection');
                return;
            }
            else if (stepFromUrl === 'payment' && (!isPackageSelected || !isAllScheduled || !isAuthenticate)) {
                if (!isPackageSelected) {
                    handleStepChange('package-selection');
                } else if (!isAllScheduled) {
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
    }, [urlSearchParams, bookingHours, testPackage.included, schedules, isAuthenticate, isTestPackageSelected, availableScheduleHours, isFirstMockTestScheduled, isAllMockTestScheduled]);

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
