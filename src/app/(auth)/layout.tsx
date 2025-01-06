import { RoleProvider } from '@/providers/RoleProvider';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <RoleProvider>
            <Link href="/" className='text-primary hover:underline font-semibold flex items-center ml-6 mt-6'>
                <ChevronLeft /> <span>Back to home</span>
            </Link>
            {children}
        </RoleProvider>
    );
};

export default AuthLayout;