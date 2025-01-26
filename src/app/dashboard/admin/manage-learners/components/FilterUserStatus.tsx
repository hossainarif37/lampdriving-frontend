"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSearchParams, useRouter } from 'next/navigation';
import { FC, useState } from 'react';

const FilterUserStatus: FC = () => {
    const urlSearchParams = useSearchParams();
    const [status, setStatus] = useState(urlSearchParams.get('userStatus') || 'all');

    const { replace } = useRouter();

    // search handler
    const handleSearch = (userStatus: string) => {
        setStatus(userStatus);
        const searchParams = new URLSearchParams(urlSearchParams);
        if (userStatus) {
            searchParams.set('userStatus', userStatus);
        } else {
            searchParams.delete('userStatus');
        }
        const page = searchParams.get('page');
        if (page) {
            searchParams.set('page', "1");
        }
        replace(`?${searchParams.toString()}`);
    };


    return (
        <div>
            <Select onValueChange={handleSearch} value={status}>
                <SelectTrigger className="h-10 w-[100px]">
                    <SelectValue className="placeholder:text-[#00000012]" placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='all'>
                        All
                    </SelectItem>
                    <SelectItem value='active'>
                        Active
                    </SelectItem>
                    <SelectItem value='blocked'>
                        Blocked
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default FilterUserStatus;