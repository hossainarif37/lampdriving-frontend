"use state"
import Pagination from '@/components/shared/Pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IPaginationMeta } from '@/types/response';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useState } from 'react';

interface ITablePaginationProps {
    meta: IPaginationMeta | undefined
}

const TablePagination: FC<ITablePaginationProps> = ({ meta }) => {
    const urlSearchParams = useSearchParams();
    const [limit, setLimit] = useState<string>(urlSearchParams.get('limit') || '8');
    const { replace } = useRouter();

    const handleLimit = (reqLimit: string) => {
        const searchParams = new URLSearchParams(urlSearchParams);
        searchParams.set('limit', reqLimit);
        const page = searchParams.get('page');
        if (page) {
            searchParams.set('page', "1");
        }
        replace(`?${searchParams.toString()}`);
        setLimit(reqLimit);
    }
    return (
        <div className='py-4 px-5 border-t flex items-center justify-between flex-col md:flex-row gap-6'>
            <div className='flex items-center gap-2'>
                <p className='block'>Showing :</p>
                <Select
                    defaultValue={limit}
                    onValueChange={(value) => handleLimit(value)}
                >
                    <SelectTrigger id='rows' className="xl:h-12 mt-1 w-20">
                        <SelectValue className="placeholder:text-[#00000012]" placeholder="Rows" />
                    </SelectTrigger>
                    <SelectContent className='min-w-20'>
                        <SelectItem value={"8"}>8</SelectItem>
                        <SelectItem value={"10"}>10</SelectItem>
                        <SelectItem value={"15"}>15</SelectItem>
                        <SelectItem value={"20"}>20</SelectItem>
                        <SelectItem value={"25"}>25</SelectItem>
                    </SelectContent>
                </Select>
                <p>out of {meta?.totalData || 0}</p>
            </div>
            <Pagination currentPageProps={1} totalPages={meta?.totalPage || 1} />
        </div>
    );
};

export default TablePagination;