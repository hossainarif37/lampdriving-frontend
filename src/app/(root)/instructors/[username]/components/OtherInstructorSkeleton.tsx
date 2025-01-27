import { FC } from 'react';

const OtherInstructorSkeleton: FC = () => {
    return (
        <div className="w-full bg-white rounded-xl border p-6">
            <h2 className="w-64 h-6 bg-gray-300 rounded mb-6 animate-pulse"></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center gap-y-2 w-full px-6 animate-pulse"
                    >
                        <div className="w-24 h-24 overflow-hidden rounded-full bg-gray-300"></div>
                        <p className="w-16 h-4 bg-gray-300 rounded mt-2"></p>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default OtherInstructorSkeleton;