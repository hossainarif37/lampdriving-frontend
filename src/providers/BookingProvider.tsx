import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { IInstructor } from '@/types/instructor';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetAInstructorQuery } from '@/redux/api/instructorApi/instructorApi';
import Loading from '@/components/shared/Loading';
import { useForm } from 'react-hook-form';
import { ILoginInputs, IRegisterInputs } from '@/types/auth';
import { IBookingContext, IPaymentInfo, IPrice, IShedule, IStep, ITestPackage } from '@/types/booking';
import { stepsWithOutRegister, stepsWithRegister } from '@/constant/bookingSteps';
import { UserCheck } from 'lucide-react';
import { useAppSelector } from '@/redux/hook';


const BookingContext = createContext<IBookingContext | undefined>(undefined);


// Create the provider component
export const BookingProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const urlSearchParams = useSearchParams();
    const step = urlSearchParams.get('step');
    const isAuthenticate = useAppSelector(state => state.authSlice.isAuthenticate);
    const initialCurrentStep = step && stepsWithRegister.find(currstep => currstep.key === (step === "login" ? "register" : step)) || {
        name: 'Instructor',
        icon: UserCheck,
        key: 'instructor',
        index: 1
    };
    const [currentStep, setCurrentStep] = useState<IStep>(initialCurrentStep);


    const [instructor, setInstructor] = useState<Partial<IInstructor> | null>({
        pricePerHour: 76
    });
    const [isCustomSelected, setIsCustomSelected] = useState(false);
    const [bookingHours, setBookingHours] = useState<number>(0);
    const [testPackage, setTestPackage] = useState<ITestPackage>({ included: false, price: 225 });
    const [price, setPrice] = useState<IPrice>({ payableAmount: 0, originalAmount: 0, discountedAmount: 0 });
    const [paymentImageFile, setPaymentImageFile] = useState<File | null>(null);
    const [paymentInfo, setPaymentInfo] = useState<IPaymentInfo>({
        transactionId: '',
        proofImage: '',
        method: '',
    });
    const [schedules, setSchedules] = useState<IShedule[]>([]);
    const useRegisterForm = useForm<IRegisterInputs>();
    const useLoginForm = useForm<ILoginInputs>();
    const [isConfirmTriggered, setIsConfirmTriggered] = useState(false);
    const [isCreatingABooking, setIsCreatingABooking] = useState(false);
    const [steps, setSteps] = useState<IStep[]>(isAuthenticate ? stepsWithOutRegister : stepsWithRegister);

    // handle step change
    const handleStepChange = (stepKey: string) => {
        if (stepKey === "instructor") {
            return;
        }
        const step = steps.find(step => step.key === stepKey)!;
        const searchParams = new URLSearchParams(urlSearchParams);
        searchParams.set('step', step.key);
        router.replace(`?${searchParams.toString()}`);
        setCurrentStep(step);
    };





    const value = useMemo(() => ({
        instructor, setInstructor,
        bookingHours, setBookingHours,
        testPackage, setTestPackage,
        price, setPrice,
        isCustomSelected, setIsCustomSelected,
        paymentInfo, setPaymentInfo,
        paymentImageFile, setPaymentImageFile,
        schedules, setSchedules,
        steps: steps, currentStep, setCurrentStep,
        useRegisterForm, useLoginForm,
        handleStepChange,
        isConfirmTriggered, setIsConfirmTriggered,
        isCreatingABooking, setIsCreatingABooking
    }), [instructor, bookingHours, testPackage, price, isCustomSelected, paymentImageFile, paymentInfo, schedules, currentStep, useRegisterForm, useLoginForm, isConfirmTriggered, setIsConfirmTriggered, isCreatingABooking, setIsCreatingABooking]);

    const router = useRouter();
    const instructorQuery = urlSearchParams.get('instructor');

    if (!instructorQuery) {
        router.push('/');
    }


    const { data: instructorResponse, isLoading } = useGetAInstructorQuery({ username: instructorQuery! });



    useEffect(() => {
        if (!instructorResponse?.success && !isLoading) {
            router.push('/');
        } else if (instructorResponse?.success && !isLoading) {
            setInstructor(instructorResponse.data);
        }
    }, [instructorResponse])


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
    }, [bookingHours, testPackage.included]);


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
