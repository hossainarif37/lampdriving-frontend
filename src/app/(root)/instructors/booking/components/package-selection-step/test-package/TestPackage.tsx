import { FC } from 'react';
import { Clock, Car, MapPin, NotepadText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/providers/BookingProvider';



const TestPackage: FC = () => {
    const { testPackage, setTestPackage, mockTestPackage, setMockTestPackage } = useBooking();

    const handleAddTestPackage = () => {
        setTestPackage(pre => ({ ...pre, included: !pre.included }));
        setMockTestPackage(pre => ({ ...pre, included: false }));
    }

    const handleAddMockTestPackage = () => {
        setMockTestPackage(pre => ({ ...pre, included: !pre.included }));
        setTestPackage(pre => ({ ...pre, included: false }));
    }

    return (
        <div className='bg-white p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200'>
            <h2 className="text-xl font-semibold mb-6">Choose Your Test Package</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className="bg-gradient-to-br from-primary/5 to-white rounded-xl p-4 lg:p-8 border-2 border-blue-100">
                    <div className="inline-block bg-primary text-white px-4 py-1 rounded-[4px] text-sm font-medium mb-4">
                        Test Day
                    </div>
                    <div className="text-4xl font-bold text-primary mb-4">$220</div>
                    <div className="text-sm text-gray-500 mb-6">all inclusive</div>

                    <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-gray-400" />
                            <span>2 hour test day</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-gray-400" />
                            <span>Pick-up & Drop-off Service</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Car className="w-5 h-5 text-gray-400" />
                            <span>1 hour revision practice</span>
                        </div>
                    </div>
                    <Button className='w-full mt-6' onClick={handleAddTestPackage}>
                        <Car className="w-5 h-5" />
                        <span>{testPackage.included ? 'Remove Test Package' : 'Add Test Package'}</span>
                    </Button>
                </div>
                <div className="bg-gradient-to-br from-primary/5 to-white rounded-xl p-8 border-2 border-blue-100">
                    <div className="inline-block bg-primary text-white px-4 py-1 rounded-[4px] text-sm font-medium mb-4">
                        2 Mock Tests + Test Day
                    </div>
                    <div className="text-4xl font-bold text-primary mb-4">${mockTestPackage.price}</div>
                    <div className="text-sm text-gray-500 mb-6">all inclusive</div>

                    <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-gray-400" />
                            <span>2 hours 1st session</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-gray-400" />
                            <span>1 hour 2nd session</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <NotepadText className="w-5 h-5 text-gray-400" />
                            <span>Including test day package</span>
                        </div>
                    </div>
                    <Button className='w-full mt-6' onClick={handleAddMockTestPackage}>
                        <Car className="w-5 h-5" />
                        <span>{mockTestPackage.included ? 'Remove Test Package' : 'Add Test Package'}</span>
                    </Button>
                    <p className="text-center text-primary mt-2">Save $20</p>
                </div>
            </div>
        </div>
    );
};

export default TestPackage;
