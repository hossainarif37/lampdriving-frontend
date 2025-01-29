import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const BookingStatsChart = ({ data }: { data: any }) => {
    // Transform the data to be more readable
    const transformedData = data.map((item: any) => ({
        date: item._id.date,
        bookings: item.count
    }));

    return (
        <div className="bg-white rounded-xl p-6 border">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Booking Trends</h2>
                    <p className="text-gray-600">Last 6 months booking statistics</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <span className="text-sm text-gray-600">Total Bookings</span>
                </div>
            </div>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={transformedData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="date"
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString('default', { month: 'short' });
                            }}
                        />
                        <YAxis />
                        <Tooltip
                            labelFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString('default', { month: 'long', year: 'numeric' });
                            }}
                            formatter={(value) => [`${value}`, 'Bookings']}
                        />
                        <Line
                            type="monotone"
                            dataKey="bookings"
                            stroke="#2563eb"
                            strokeWidth={2}
                            dot={{ fill: '#2563eb', strokeWidth: 2 }}
                            name="Total Bookings"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BookingStatsChart;