import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { FC } from 'react';

const MenuSearch: FC = () => {
    return (
        <div className='relative'>
            <Input placeholder='Search' type='text' className='pl-9' />
            <Search size={18} className='absolute top-1/2 transform -translate-y-1/2 left-3' />
        </div>
    );
};

export default MenuSearch;