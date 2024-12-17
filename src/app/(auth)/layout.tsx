import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div>
            <Link href="/" className='text-secondary hover:underline font-semibold flex items-center m-2'><ChevronLeft /> <span>Back to home</span></Link>

            {children}
        </div>
    );
};

export default AuthLayout;