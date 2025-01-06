import { IExperience, IInstructorRegisterContext, IPersonalInfo, IServices, IVehicle } from '@/types/instructor';
import { createContext, FC, ReactNode, useContext, useMemo, useState } from 'react';


export const InstructorRegisterContext = createContext<IInstructorRegisterContext | undefined>(undefined);

export const InstructorRegisterProvider: FC<{ children: ReactNode }> = ({ children }) => {
    // Personal Info
    const [personalInfo, setPersonalInfo] = useState<IPersonalInfo | undefined>(undefined);

    // Experience
    const [experienceInfo, setExperienceInfo] = useState<IExperience | undefined>(undefined);

    // Car Info
    const [carInfo, setCarInfo] = useState<IVehicle | undefined>(undefined);

    // Services
    const [servicesInfo, setServicesInfo] = useState<IServices | undefined>(undefined);

    const value: IInstructorRegisterContext = useMemo(() => ({
        personalInfo,
        setPersonalInfo,
        experienceInfo,
        setExperienceInfo,
        carInfo,
        setCarInfo,
        servicesInfo,
        setServicesInfo
    }), [personalInfo, experienceInfo, carInfo, servicesInfo]);

    return (
        <InstructorRegisterContext.Provider value={value}>
            {children}
        </InstructorRegisterContext.Provider>
    );
};

export const useInstructorRegister = (): IInstructorRegisterContext => {
    const context = useContext(InstructorRegisterContext);
    if (!context) {
        throw new Error('useInstructorRegister must be used within a InstructorRegisterProvider');
    }
    return context;
};