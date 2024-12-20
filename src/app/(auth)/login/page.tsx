import { FC } from 'react';
import LoginForm from './components/LoginForm';

const LoginPage: FC = () => {
    return (
        <div className='min-h-[calc(100vh-56px)] flex items-center justify-center'>
            <LoginForm />
        </div>
    );
};

export default LoginPage;