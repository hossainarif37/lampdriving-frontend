import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FC } from 'react';

interface IStepNavigationButtonsProps {
    prev: string;
    next: string;
    isLoading?: boolean;
}

const StepNavigationButtons: FC<IStepNavigationButtonsProps> = ({ prev, next, isLoading = false }) => {
    return (
        <div className='flex gap-5 justify-end mt-10'>
            <Link
                href={prev !== "" ? `/instructor-registration?step=${prev}` : "#"}
                className={prev === "" ? "pointer-events-none" : ""}
            >
                <Button
                    disabled={prev === ""}
                    className='h-11 xl:h-14 md:w-40'
                >
                    Previous
                </Button>
            </Link>

            <Button
                loading={isLoading}
                disabled={isLoading}
                type='submit'
                className='h-11 xl:h-14 md:w-40 bg-primary'
            >
                {next === "" ? "Submit" : "Save & Next"}
            </Button>
        </div>
    );
};

export default StepNavigationButtons;