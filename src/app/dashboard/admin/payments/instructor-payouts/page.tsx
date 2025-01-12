import React from 'react';
import InstructorPayoutsTable from './components/InstructorPayoutsTable';


const InstructorPayoutsPage = () => {
    return (
        <div className="min-h-[calc(100vh-117px)] bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Pending Instructor Payouts</h2>
            <div className="overflow-x-auto">
                <InstructorPayoutsTable />
            </div>
        </div>
    );
};

export default InstructorPayoutsPage;