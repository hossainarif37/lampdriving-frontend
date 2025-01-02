import { SearchX } from 'lucide-react';
import { FC } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface IDataNotFoundProps {
    dataName: string;
}

const DataNotFound: FC<IDataNotFoundProps> = ({ dataName = "Data" }) => {
    const { replace } = useRouter();

    // reset search handler
    const handleResetSearch = () => {
        replace('?');
    }
    return (
        <div className="wrapper flex flex-col items-center justify-center py-16 px-4">
            <div className="bg-gray-50 rounded-full p-6 mb-6">
                <SearchX className="w-12 h-12 text-purple-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {dataName} Not Found
            </h3>
            <p className="text-gray-600 text-center max-w-md mb-6">
                We couldn&apos;t find any {dataName} matching your search criteria. Try adjusting your filters or search terms.
            </p>
            <Button onClick={handleResetSearch} className='w-44 md:w-52 gradient-color'>Reset Search</Button>
        </div>
    );
};

export default DataNotFound;