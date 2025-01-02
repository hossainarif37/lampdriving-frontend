"use client"

import { TabNavigation } from '@/components/shared/TabNavigation';
import { mockInstructor, mockUser } from '@/constant/mockProfileData';
import { useAppSelector } from '@/redux/hook';
import { ChevronRight, Settings } from 'lucide-react';
import { FC, useState } from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import { IExperience, IServices } from '@/app/(auth)/instructor-registration/components/InstructorRegistration';
import ServicesForm from './ServicesForm';
import CarInfoForm from './CarInfoForm';
import { IVehicle } from '@/types/instructor';
import SecurityForm from './SecurityForm';

const InstructorProfile: FC = () => {
  const { user } = useAppSelector(state => state.authSlice);
  const [activeTab, setActiveTab] = useState('personal');
  // Experience
  const [experienceInfo, setExperienceInfo] = useState<IExperience | undefined>(undefined);
  const [drivingLicenseFile, setDrivingLicenseFile] = useState<File | null>(null);
  const [experienceCertificateFile, setExperienceCertificateFile] = useState<File | null>(null);

  // Services
  const [servicesInfo, setServicesInfo] = useState<IServices | undefined>(undefined);

  // Car Info
  const [carInfo, setCarInfo] = useState<IVehicle | undefined>(undefined);
  const [carImageFile, setCarImageFile] = useState<File | null>(null);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInfoForm />
        );
      case 'experience':
        return (
          <ExperienceForm
            experienceInfo={experienceInfo}
            setExperienceInfo={setExperienceInfo}
            drivingLicenseFile={drivingLicenseFile}
            setDrivingLicenseFile={setDrivingLicenseFile}
            experienceCertificateFile={experienceCertificateFile}
            setExperienceCertificateFile={setExperienceCertificateFile}
          />
        );
      case 'services':
        return (
          <ServicesForm
            servicesInfo={servicesInfo}
            setServicesInfo={setServicesInfo}
          />
        );
      case 'car':
        return (
          <CarInfoForm
            carImageFile={carImageFile}
            setCarImageFile={setCarImageFile}
            carInfo={carInfo}
            setCarInfo={setCarInfo}
          />
        );
      case 'security':
        return (
          <SecurityForm/>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          {/* <div className="flex items-center space-x-2 text-gray-600">
            <span>Settings</span>
            <ChevronRight className="w-4 h-4" />
            <span>Profile</span>
          </div> */}
          <div className="mt-2 flex items-center">
            <Settings className="w-8 h-8 text-blue-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">Profile Settings</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-8 pt-6">
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          <div className="px-8 pb-8 pt-5">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;