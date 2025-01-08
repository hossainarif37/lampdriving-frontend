import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

const NotFoundPage: FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center px-4">
            <div className="text-center">
                <div className="flex justify-center mb-8">
                    <AlertCircle className="w-24 h-24 text-primary" />
                </div>
                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Oops! The page you&apos;re looking for seems to have vanished into thin air.
                    Let&apos;s get you back on track.
                </p>
                <Link
                    href="/"
                >
                    <Button className="h-12 w-44 md:w-52 gradient-color">Return Home</Button>

                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;