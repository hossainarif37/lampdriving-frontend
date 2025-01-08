"use client";
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

interface IErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

const error: FC<IErrorProps> = ({ error, reset }) => {

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center px-4">
            <div className="text-center">
                <div className="flex justify-center mb-8">
                    <AlertCircle className="w-24 h-24 text-primary" />
                </div>
                <h1 className="text-6xl font-bold text-gray-900 mb-4">
                    {error.name}
                </h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">{error.message}</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Opps! An error found. {error.stack?.split('(')[0]}
                </p>
                <div className='flex items-center justify-center gap-4'>
                    <Link
                        href="/"
                    >
                        <Button className="h-12 w-44 md:w-52 gradient-color">Return Home</Button>
                    </Link>
                    <Button
                        onClick={reset}
                        className="h-12 w-44 md:w-52 bg-gradient-to-r from-red-500/95 to-orange-600/80">Retry</Button>
                </div>
            </div>
        </div>
    );
};

export default error;