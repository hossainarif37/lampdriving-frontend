import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FC } from 'react';

const StepNavigationButtons: FC<{ prev: string, next: string }> = ({ prev, next }) => {
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
                type='submit'
                className='h-11 xl:h-14 md:w-40 gradient-color'
            >
                {next === "" ? "Submit" : "Next"}
            </Button>
        </div>
    );
};

export default StepNavigationButtons;