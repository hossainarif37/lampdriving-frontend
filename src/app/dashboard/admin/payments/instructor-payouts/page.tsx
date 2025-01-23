"use client";

import React from 'react';
import InstructorPayoutsTable from './components/InstructorPayoutsTable';
import TableSearchFilter from '@/app/dashboard/components/shared/TableSearchFilter';
import Loading from '@/components/shared/Loading';
import DataNotFound from '@/components/shared/DataNotFound';
import { useGetAllWalletQuery } from '@/redux/api/walletApi/walletApi';


const InstructorPayoutsPage = () => {
    const { data, isLoading } = useGetAllWalletQuery(undefined);
    if (isLoading) {
        return <Loading />;
    }
    if (data?.data?.result?.length === 0) {
        return <DataNotFound dataName="Pending Instructor Payouts" />;
    }
    return (
        <div className='bg-white rounded-xl min-h-[calc(100vh-117px)] flex flex-col text-primary'>
            <div className='py-4 px-5 flex items-center justify-between'>
                <h2 className='font-semibold text-2xl'>Pending Instructor Payouts</h2>
                <TableSearchFilter />
            </div>
            <InstructorPayoutsTable data={data?.data?.result} />
        </div>
    );
};

export default InstructorPayoutsPage;