'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Role = 'learner' | 'instructor' | null;

interface RoleContextProps {
    selectedRole: Role;
    setSelectedRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextProps | undefined>(undefined);

export const RoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedRole, setSelectedRole] = useState<Role>(null);

    return (
        <RoleContext.Provider value={{ selectedRole, setSelectedRole }}>
            {children}
        </RoleContext.Provider>
    );
};

export const useRole = () => {
    const context = useContext(RoleContext);
    if (!context) {
        throw new Error('useRole must be used within a RoleProvider');
    }
    return context;
};
