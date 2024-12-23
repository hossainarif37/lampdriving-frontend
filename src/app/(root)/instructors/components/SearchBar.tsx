import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { FC } from 'react';
import FilterBar from './FilterBar';

const SearchBar: FC = () => {
    return (
        <div className='flex gap-5 justify-end max-w-7xl'>
            <div className='relative lg:w-4/12 md:w-5/12' >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input placeholder="Search instructors by name or expertise..." className='h-12 pl-12' />
            </div>
            <div>
                <FilterBar />
            </div>
        </div>
    );
};

export default SearchBar;