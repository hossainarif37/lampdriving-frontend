import { SearchX } from 'lucide-react';
import { FC } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface IDataNotFoundProps {
    dataName: string;
    isSearched?: boolean;
}

const DataNotFound: FC<IDataNotFoundProps> = ({ dataName = "Data", isSearched }) => {
    const { replace } = useRouter();
    console.log(isSearched);
    // reset search handler
    const handleResetSearch = () => {
        replace('?');
    }
    return (
        <div className="min-h-[calc(100vh-117px)] wrapper flex flex-col items-center justify-center py-16 px-4">
            <div className="bg-gray-50 rounded-full p-6 mb-6">
                <SearchX className="w-12 h-12 text-purple-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {dataName} Not Found
            </h3>
            <p className="text-gray-600 text-center max-w-md mb-6">
                {
                    isSearched ?
                        `We couldn't find any ${dataName.toLowerCase()} matching your search criteria. Try adjusting your filters or search terms.`
                        :
                        `We couldn't find any ${dataName.toLowerCase()}.`
                }
            </p>
            {
                isSearched &&
                <Button onClick={handleResetSearch} className='w-44 md:w-52 gradient-color'>Reset Search</Button>
            }
        </div>
    );
};

export default DataNotFound;