"use client"

import { useState, useRef, useEffect, FC, use } from 'react';
import { User, Settings, HelpCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useLazyLogOutUserQuery } from '@/redux/api/authApi/authApi';
import { removeUser } from '@/redux/slices/authSlice/authSlice';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const UserMenu: FC = () => {
    const { user } = useAppSelector(state => state.authSlice);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [logoutUser, { isLoading: isLogoutLoading }] = useLazyLogOutUserQuery();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogout = () => {
        logoutUser().unwrap().then((res) => {
            dispatch(removeUser());
            router.push("/");
            toast({
                message: res.message
            })
        }).catch((err) => {
            toast({
                success: false,
                message: err.data.message || "Something went wrong"
            })
        });
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <Button
                onClick={() => setIsOpen(!isOpen)}
                size={"icon"}
                className={`rounded-[4px] gap-2 bg-primary/90 hover:bg-primary`}>
                <User className='text-5xl' size={24} />
            </Button>

            <div
                className={`absolute right-0 mt-3 w-56 pb-3 overflow-hidden rounded-[4px] rounded-t-none bg-white shadow-md transition-all duration-200 ease-in-out origin-top ${isOpen
                    ? 'scale-y-100'
                    : 'scale-y-0'
                    }`}
            >
                {/* <div className="px-4 py-3 ">
                    <p className="text-sm font-medium">{user?.name.fullName}</p>
                    <p className="text-sm text-gray-500">{user?.email.slice(0, 25)}</p>
                </div> */}

                <div className="py-1 px-4">
                    <Button className="h-[40px] capitalize w-full px-4 py-2 text-sm text-primary bg-gray-50 hover:bg-gray-100 rounded-[4px] gap-2 font-semibold">
                        <HelpCircle className="w-4 h-4" />
                        <span>Help</span>
                    </Button>
                </div>

                <div className="py-1 px-4">
                    <Button variant={"outline"} disabled={isLogoutLoading} onClick={handleLogout} className='h-[40px] w-full text-red-500 capitalize'>
                        <LogOut className="w-4 h-4" />
                        <span>Sign out</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UserMenu;