import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FC } from 'react';

interface StepNavigationButtonsProps {
    prev: string;
    next: string;
    form?: string;
}

const StepNavigationButtons: FC<StepNavigationButtonsProps> = ({ prev, next, form }) => {
    return (
        <div className='flex gap-5 justify-end mt-10'>
            <Link
                href={prev !== "" ? `/instructor-registration?step=${prev}` : "#"}
                className={prev === "" ? "pointer-events-none" : ""}
            >
                <Button
                    type="button"
                    disabled={prev === ""}
                    className='h-11 xl:h-14 md:w-40'
                >
                    Previous
                </Button>
            </Link>

            <Button
                type='submit'
                form={form}
                className='h-11 xl:h-14 md:w-40 bg-primary'
            >
                {next === "" ? "Submit" : "Save & Next"}
            </Button>
        </div>
    );
};

export default StepNavigationButtons;