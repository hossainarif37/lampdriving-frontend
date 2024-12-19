import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FC } from 'react';

const StepNavigationButtons: FC<{ prev: string, next: string }> = ({ prev, next }) => {
    return (
        <div className='flex gap-4'>
            <Link
                href={prev !== "" ? `/instructor-registration?step=${prev}` : "#"}
                className={prev === "" ? "pointer-events-none" : ""}
            >
                <Button
                    disabled={prev === ""}
                    className='h-11 md:w-40'
                >
                    Previous 
                </Button>
            </Link>
            {
                next === "" ? (
                    <Button
                        type='submit'
                        className='h-11 md:w-40 gradient-color'
                    >
                        Submit
                    </Button>
                ) : (
                    <Link href={`/instructor-registration?step=${next}`}>
                        <Button
                            className='h-11 md:w-40 gradient-color' 
                        >
                            Next
                        </Button>
                    </Link>
                )
            }
        </div>
    );
};

export default StepNavigationButtons;