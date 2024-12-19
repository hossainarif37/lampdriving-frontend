"use client";

import { FC, Suspense } from 'react';
import StepIndicator from './components/StepIndicator';
import Loading from '@/components/shared/Loading';
import InstructorRegistration from './components/InstructorRegistration';

const InstructorRegistrationPage: FC = () => {
    return (
        <div className="wrapper mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Instructor Registration</h1>
            <Suspense fallback={<Loading />}>
                <StepIndicator />
            </Suspense>
            <div className="mt-8">
                <Suspense fallback={<Loading />}>
                    <InstructorRegistration/>
                </Suspense>
            </div>
        </div>
    );
};

export default InstructorRegistrationPage;