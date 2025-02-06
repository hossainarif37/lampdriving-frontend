'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import RoleSelection from '../components/role-selection/RoleSelection';
import RegisterForm from './components/RegisterForm';
import { useRole } from '@/providers/RoleProvider';
import VerifyEmail from '../components/verify-email/VerifyEmail';

const RegisterPage: FC = () => {
    const [step, setStep] = useState<'register' | 'verify'>('register');
    const { selectedRole, setSelectedRole } = useRole();
    const router = useRouter();

    const handleRoleSelection = (role: 'learner' | 'instructor') => {
        if (role === 'instructor') {
            router.push('/instructor-registration'); // Navigate immediately for instructors
        } else {
            setSelectedRole(role); // Set role for learners to display the form
        }
    };

    return (
        <div className="min-h-[calc(100vh-56px)] md:py-10 lg:py-20 flex items-center justify-center">
            {selectedRole === null ? (
                // Show role selection initially
                <RoleSelection onRoleSelect={handleRoleSelection} />
            ) : (
                // Show register form for learners
                selectedRole === 'learner' && (
                    step !== "register" ?
                        <RegisterForm setStep={setStep} /> :
                        <VerifyEmail />
                )
            )}
        </div>
    );
};

export default RegisterPage;
