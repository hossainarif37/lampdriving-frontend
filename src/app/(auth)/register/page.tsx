import { FC } from 'react';
import RegisterForm from './components/RegisterForm';

const RegisterPage: FC = () => {
    return (
        <div className='min-h-[calc(100vh-56px)] py-20 flex items-center justify-center'>
            <RegisterForm />
        </div>
    );
};




export default RegisterPage;