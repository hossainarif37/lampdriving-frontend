"use client"

import { TabNavigation } from '@/components/shared/TabNavigation';
import { mockInstructor, mockUser } from '@/constant/mockProfileData';
import { useAppSelector } from '@/redux/hook';
import { ChevronRight, Settings } from 'lucide-react';
import { FC, useState } from 'react';

const InstructorProfile: FC = () => {
    const {user} = useAppSelector(state=> state.authSlice);
    const [activeTab, setActiveTab] = useState('personal');

    const renderTabContent = () => {
      switch (activeTab) {
        case 'personal':
          return (
            // <PersonalInfoForm
            //   user={mockUser}
            //   onSave={(data) => console.log('Saving personal info:', data)}
            // />
            <p>Personal Info</p>
          );
        case 'vehicle':
          return (
            // <VehicleForm
            //   vehicle={mockInstructor.vehicle}
            //   onSave={(data) => console.log('Saving vehicle:', data)}
            // />
            <p>Vehicle</p>
          );
        case 'schedule':
          return (
            // <WorkingHoursForm
            //   workingHours={mockInstructor.workingHour}
            //   onSave={(data) => console.log('Saving schedule:', data)}
            // />
            <p>Schedule</p>
          );
        case 'location':
          return (
            // <ServiceAreasForm
            //   areas={mockInstructor.serviceAreas}
            //   onSave={(data) => console.log('Saving areas:', data)}
            // />
            <p>Location</p>
          );
        case 'documents':
          return (
            // <DocumentsForm
            //   documents={mockInstructor.documents}
            //   onSave={(data) => console.log('Saving documents:', data)}
            // />
            <p>Documents</p>
          );
        default:
          return null;
      }
    };
    
    return (
        <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-gray-600">
            <span>Settings</span>
            <ChevronRight className="w-4 h-4" />
            <span>Profile</span>
          </div>
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
          <div className="p-8">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
    );
};

export default InstructorProfile;