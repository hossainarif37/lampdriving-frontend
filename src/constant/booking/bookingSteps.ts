import { IStep } from "@/types/booking";
import { Calendar, Package, User2, UserCheck, Wallet } from "lucide-react";

export const stepsWithOutRegister: IStep[] = [
    {
        name: 'Instructor',
        icon: UserCheck,
        key: 'instructor',
        index: 1
    },
    {
        name: 'Package',
        icon: Package,
        key: 'package-selection',
        index: 2
    },
    {
        name: 'Schedule',
        icon: Calendar,
        key: 'schedule',
        index: 3
    },
    {
        name: 'Payment',
        icon: Wallet,
        key: 'payment',
        index: 4
    }
];

export const stepsWithRegister = [
    {
        name: 'Instructor',
        icon: UserCheck,
        key: 'instructor',
        index: 1
    },
    {
        name: 'Package',
        icon: Package,
        key: 'package-selection',
        index: 2
    },
    {
        name: 'Schedule',
        icon: Calendar,
        key: 'schedule',
        index: 3
    },
    {
        name: 'Account',
        icon: User2,
        key: 'register',
        index: 4
    },
    {
        name: 'Payment',
        icon: Wallet,
        key: 'payment',
        index: 5
    }
];