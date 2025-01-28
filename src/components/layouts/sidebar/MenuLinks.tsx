"use client"
import NavLink from '@/components/shared/NavLink';
import { Button } from '@/components/ui/button';
import { adminRoutes, instructorRoutes, learnerRoutes } from '@/constant/dashboardLinks';
import { useAppSelector } from '@/redux/hook';
import { ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';



const MenuLinks = () => {
    const [openedGroup, setOpenedGroup] = useState<string>('')
    const { user } = useAppSelector(state => state.authSlice);
    const childRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // routes based on user role
    const routes = user?.role === "admin" ? adminRoutes : user?.role === "instructor" ? instructorRoutes : learnerRoutes;

    const handleGroupRouteOpen = (path: string) => {
        setOpenedGroup(path === openedGroup ? "" : path);
    };

    const getSubMenuHeight = (path: string): string => {
        if (!openedGroup || openedGroup !== path) return '0px';
        const element = childRefs.current[path];
        if (!element) return '0px';
        return `${element.scrollHeight}px`;
    };

    return (
        <div>
            <div className='flex flex-col text-primary justify-center h-full my-2'>
                {routes.map((route, index) => (
                    <div key={index}>
                        {route.children ? (
                            <>
                                <Button
                                    className={`md:h-10 xl:h-11 w-full font-semibold justify-start px-3 group capitalize mb-1`}
                                    variant={"sidebar"}
                                    onClick={() => handleGroupRouteOpen(route.path)}
                                >
                                    <span className="flex items-center gap-2">
                                        <route.icon />
                                        {route.name}
                                    </span>
                                    <ChevronDown
                                        className={`ml-auto transform transition-transform duration-200 ${openedGroup === route.path ? 'rotate-180' : ''
                                            }`}
                                    />
                                </Button>
                                <div
                                    ref={el => {
                                        childRefs.current[route.path] = el;
                                    }}
                                    className={`overflow-hidden transition-all duration-300 ease-in-out`}
                                    style={{
                                        height: getSubMenuHeight(route.path),
                                        opacity: openedGroup === route.path ? 1 : 0,
                                    }}
                                >
                                    <div className='ml-[18px] pl-1 border-l-2 flex flex-col gap-1'>
                                        {route.children.map((childRoute, index) => (
                                            <NavLink
                                                key={index}
                                                href={childRoute.path}
                                                active='activeSidebar'
                                                other='sidebar'
                                            >
                                                {childRoute.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <NavLink href={route.path} active='activeSidebar' other='sidebar' className='mb-1'>
                                <route.icon />
                                {route.name}
                            </NavLink>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};


export default MenuLinks;