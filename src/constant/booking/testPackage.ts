import { Clock, MapPin, Car, NotepadText, LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react";

export const drivingTestPrice = 220

interface ITestPackage {
    heading: string;
    description: string;
    price: number;
    mockTestCount: number;
    features: {
        icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
        title: string;
    }[];
}


// driving test infos
export const drivingTest: ITestPackage = {
    heading: "Driving Test",
    description: "all inclusive",
    price: drivingTestPrice,
    mockTestCount: 0,
    features: [
        {
            icon: Clock,
            title: '2-hour test day'
        },
        {
            icon: MapPin,
            title: 'Pick-up & Drop-off Service'
        },
        {
            icon: Car,
            title: '1 hour revision practice'
        }
    ]
}


// mock test infos
export const mockTest: ITestPackage = {
    heading: "2 Mock Tests + Driving Test",
    description: "all inclusive",
    price: drivingTestPrice,
    mockTestCount: 2,
    features: [
        {
            icon: Clock,
            title: '2 hours 1st session'
        },
        {
            icon: MapPin,
            title: '1 hour 2nd session'
        },
        {
            icon: NotepadText,
            title: 'Including test day package'
        }
    ]
}
