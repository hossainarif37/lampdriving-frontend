import { FC } from 'react';
import { Clock, Car, MapPin, CarIcon, NotepadText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import carImg from "@/assets/car-image/carimg.jpg";
import Image from 'next/image';
import { useBooking } from '@/providers/BookingProvider';

const features = [
    { icon: Clock, text: '2.5hr Test Package' },
    { icon: CarIcon, text: 'Use instructor’s vehicle for test' },
    { icon: MapPin, text: 'Pick-up & Drop-off Service' },
    { icon: NotepadText, text: '40 minute warm up lesson' },
];

interface ITestPackageProps {

}

const TestPackage: FC<ITestPackageProps> = () => {
    const { testPackage, setTestPackage } = useBooking();

    return (
        <div className="bg-gradient-to-br from-primary/5 to-white rounded-xl p-8 border-2 border-blue-100">
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
        </div>
    );
};

export default TestPackage;