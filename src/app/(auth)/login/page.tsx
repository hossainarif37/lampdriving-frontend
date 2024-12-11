import { FC } from 'react';
import LoginForm from './components/LoginForm';

const LoginPage: FC = () => {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <LoginForm />
        </div>
    );
};

export default LoginPage;