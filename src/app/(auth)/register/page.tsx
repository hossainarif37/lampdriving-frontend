'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import RoleSelection from '../components/role-selection/RoleSelection';
import RegisterForm from './components/RegisterForm';
import { useRole } from '@/providers/RoleProvider';

const RegisterPage: FC = () => {
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
                selectedRole === 'learner' && <RegisterForm />
            )}
        </div>
    );
};

export default RegisterPage;
