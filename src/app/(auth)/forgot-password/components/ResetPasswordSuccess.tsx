import { Button } from '@/components/ui/button';
import { CircleCheckBig } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

const ResetPasswordSuccess: FC = () => {
    return (
        <div className="w-full md:w-[450px] xl:w-[500px] max-w-[500px] mx-auto p-10  md:shadow-lg md:rounded-lg md:border">
            <div className="flex items-center justify-center mb-3">
                <span className="p-5 bg-secondary/30 rounded-full flex  items-center justify-center">
                    <CircleCheckBig className="text-primary size-10 " />
                </span>
            </div>
            <h1 className="text-2xl font-bold text-primary/90 text-center">Password Reset Success</h1>
            <p className="mb-4 text-sm text-accent text-center">Your password has been successfully reset.</p>
            <Link href={'/login'}>
                <Button className="w-full mt-3">
                    Go to Login
                </Button>
            </Link>
        </div>
    );
};

export default ResetPasswordSuccess;