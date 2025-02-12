import { FC } from 'react';
import VerifyVerificationCode from './components/VerifyVerificationCode';
import VerifyVerificationToken from './components/VerifyVerificationToken';

interface IVerifyEmailPageProps {
    searchParams?: Promise<{
        token?: string;
    }>;
}

const VerifyEmailPage: FC<IVerifyEmailPageProps> = async ({ searchParams }) => {
    const token = (await searchParams)?.token;

    return (
        <div className='wrapper min-h-[calc(100vh-56px)] flex items-center justify-center'>
            {
                token ?
                    <VerifyVerificationToken />
                    :
                    <VerifyVerificationCode />
            }

        </div >
    );
};

export default VerifyEmailPage;