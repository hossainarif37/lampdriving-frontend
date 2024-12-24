import { Button } from '@/components/ui/button';
import { SearchX } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';

const InstructorsNotFound: FC = () => {
    const urlSearchParams = useSearchParams();
    const { replace } = useRouter();

    // function to remove search
    const handleRemoveSearch = () => {
        const searchParams = new URLSearchParams(urlSearchParams);

        searchParams.get('searchKey') && searchParams.delete('searchKey');
        searchParams.get('vehicle.type') && searchParams.delete('vehicle.type');
        searchParams.get('page') && searchParams.delete('page');

        replace(`?${searchParams.toString()}`);
    }
    return (
        <div className="wrapper flex flex-col items-center justify-center py-16 px-4">
            <div className="bg-gray-50 rounded-full p-6 mb-6">
                <SearchX className="w-12 h-12 text-purple-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Instructors Not Found
            </h3>
            <p className="text-gray-600 text-center max-w-md mb-6">
                We couldn't find any instructors matching your search criteria. Try adjusting your filters or search terms.
            </p>
            <Button onClick={handleRemoveSearch} className='w-44 md:w-52 gradient-color'>Reset Search</Button>
        </div>
    );
};

export default InstructorsNotFound;