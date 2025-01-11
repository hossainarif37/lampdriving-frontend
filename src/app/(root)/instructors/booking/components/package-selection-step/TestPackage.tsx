import { FC } from 'react';
import { Clock, Car, MapPin, CarIcon, NotepadText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/providers/BookingProvider';

// const features = [
//     { icon: Clock, text: '2.5hr Test Package' },
//     { icon: CarIcon, text: 'Use instructor’s vehicle for test' },
//     { icon: MapPin, text: 'Pick-up & Drop-off Service' },
//     { icon: NotepadText, text: '40 minute warm up lesson' },
// ];


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
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className="bg-gradient-to-br from-primary/5 to-white rounded-xl p-8 border-2 border-blue-100">
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
    );
};

export default TestPackage;



{/* <div className="bg-gradient-to-br from-primary/5 to-white rounded-xl p-8 border-2 border-blue-100">
    <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
            <div className="inline-block bg-primary text-white px-4 py-1 rounded-[4px] text-sm font-medium mb-4">
                Test Day Package
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Ace Your Test with Confidence</h3>
            <div className="text-primary mb-4">
                <span className="text-3xl font-bold">${testPackage.price}</span>
                <span className="text-gray-500 text-sm ml-2">all inclusive</span>
            </div>
        </div>
        <Image
            width={200}
            height={200}
            src={carImg}
            alt="Test car"
            className="rounded-[4px] shadow-lg object-cover w-full md:w-52 h-36 mt-4 md:mt-0"
        />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {features.map((feature, index) => (
            <div key={index} className="flex items-center bg-white p-4 rounded-[4px] shadow-sm">
                <feature.icon className="w-5 h-5 text-primary mr-2.5" />
                <span className="text-gray-700">{feature.text}</span>
            </div>
        ))}
    </div>

    <Button className='w-full mt-6' onClick={() => setTestPackage(pre => ({ ...pre, included: !pre.included }))}>
        <Car className="w-5 h-5" />
        <span>{testPackage.included ? 'Remove Test Package' : 'Add Test Package'}</span>
    </Button>
</div> */}