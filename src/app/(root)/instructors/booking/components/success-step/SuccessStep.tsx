import { FC } from 'react';
import { CheckCircle, Clock, Car, User, Calendar, Receipt } from 'lucide-react';
import { useBooking } from '@/providers/BookingProvider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatDate } from 'date-fns';
import { toFixedNumber } from '@/lib/utils';

const SuccessStep: FC = () => {
    const { instructor, bookingHours, price, testPackage, mockTestPackage, schedules, paymentInfo } = useBooking();
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                    <h1 className="text-3xl font-bold text-gray-900">Booking Confirmed!</h1>
                    <p className="mt-2 text-gray-600">Your driving lesson has been successfully scheduled</p>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column - Booking Details */}
                        <div>
                            <h2 className="text-xl font-semibold mb-6">Booking Details</h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <Clock className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Duration</p>
                                        <p className="font-medium text-gray-900">{bookingHours} hrs Booking Credit</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <User className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Instructor</p>
                                        <p className="font-medium text-gray-900">
                                            {typeof instructor?.user != "string" ? instructor?.user?.name?.fullName : ""}
                                        </p>
                                        {/* <p className="text-sm text-gray-700">
                                            {typeof instructor?.user != "string" ? instructor?.user?.email : ""}
                                        </p> */}
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Car className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Vehicle</p>
                                        <p className="font-medium text-gray-900">{instructor?.vehicle?.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">First Lesson</p>
                                        <p className="font-medium text-gray-900">{formatDate(new Date(schedules[0].date), "MM/dd/yyyy")} at {schedules[0].time[0]} for {schedules[0].duration} hrs</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Payment Summary */}
                        <div>
                            <h2 className="text-xl font-semibold mb-6">Payment Summary</h2>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Booking Credit</span>
                                        <span className="font-medium text-gray-900">${price.originalAmount}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-primary flex items-center gap-2">
                                            Credit Discount
                                            <span className="bg-blue-100 text-primary text-xs px-2 py-0.5 rounded-full">
                                                {bookingHours >= 10 ? 10 : bookingHours >= 6 ? 6 : 0}% OFF
                                            </span>
                                        </span>
                                        <span className="text-primary">- ${toFixedNumber(price.discountedAmount ?? 0)}</span>
                                    </div>
                                    {
                                        testPackage.included && <div className="flex justify-between">
                                            <span className="text-gray-600">Test Package</span>
                                            <span className="font-medium text-gray-900">${testPackage.price}</span>
                                        </div>
                                    }
                                    {
                                        mockTestPackage.included && <div className="flex justify-between">
                                            <span className="text-gray-600">Mock Test Package</span>
                                            <span className="font-medium text-gray-900">${mockTestPackage.price}</span>
                                        </div>
                                    }
                                    <div className="pt-3 border-t border-gray-200">
                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-900">Total Paid</span>
                                            <span className="font-bold text-gray-900">${price.payableAmount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <div className="flex items-center space-x-2 text-gray-600 mb-4">
                                    <Receipt className="h-5 w-5" />
                                    <span>Transaction ID</span>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <div className="bg-white px-3 py-2 rounded flex items-center justify-between">
                                        <span className="font-mono text-sm">{paymentInfo.transactionId}</span>
                                        {/* <span className="text-primary text-sm">Completed</span> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-center space-x-4">
                    <Link href={'/dashboard/learner'}>
                        <Button >
                            Go to Dashboard
                        </Button>
                    </Link>
                    {/* <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        Download Receipt
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default SuccessStep;