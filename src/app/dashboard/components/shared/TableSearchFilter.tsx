"use client"
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';

const TableSearchFilter: FC = () => {
    const urlSearchParams = useSearchParams();

    const { replace } = useRouter();

    // search handler
    const handleSearch = (searchKey: string) => {
        const searchParams = new URLSearchParams(urlSearchParams || '');
        if (searchKey) {
            searchParams.set('searchKey', searchKey);
        } else {
            searchParams.delete('searchKey');
        }
        const page = searchParams.get('page');
        if (page) {
            searchParams.set('page', "1");
        }
        replace(`?${searchParams.toString()}`);
    };
    return (
        <div className='relative max-w-[320px]'>
            <Input
                defaultValue={urlSearchParams?.get('searchKey') || ''}
                onChange={(e) => handleSearch(e.target.value)} placeholder='Search' type='text' className='pl-9' />
            <Search size={18} className='absolute top-1/2 transform -translate-y-1/2 left-3 text-neutral-500' />
        </div>
    );
};

export default TableSearchFilter;