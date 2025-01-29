"use client";

import { FC, Suspense } from 'react';
import StepIndicator from './components/StepIndicator';
import Loading from '@/components/shared/Loading';
import InstructorRegistration from './components/InstructorRegistration';
import { InstructorRegisterProvider } from '@/providers/InstructorRegisterProvider';

const InstructorRegistrationPage: FC = () => {
    return (
        <InstructorRegisterProvider>
            <div className="wrapper mx-auto py-4 md:py-8">
                <h1 className="text-xl sm:text-2xl md:text-4xl text-primary font-bold my-10 text-center">Instructor Registration</h1>
                <Suspense fallback={<Loading />}>
                    <StepIndicator />
                </Suspense>
                <div className="mt-3 md:mt-8 min-h-[calc(100vh-320px)] flex flex-col">
                    <Suspense fallback={<Loading />}>
                        <InstructorRegistration />
                    </Suspense>
                </div>
            </div>
        </InstructorRegisterProvider>
    );
};

export default InstructorRegistrationPage;