'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Car, GraduationCap, Calendar, Award, Users, ClipboardCheck, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface RoleSelectionProps {
    onRoleSelect: (role: 'learner' | 'instructor') => void;
}

const RoleSelection: FC<RoleSelectionProps> = ({ onRoleSelect }) => {
    const [selectedRole, setSelectedRole] = useState<'learner' | 'instructor' | null>(null);

    const handleContinue = () => {
        if (selectedRole) {
            onRoleSelect(selectedRole);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-2xl md:text-3xl font-bold text-center text-[#0A2942] mb-12">
                <span>Welcome to Lamp Driving School!</span><br /><span className='font-medium text-gray-700'>How would you like to join us?</span>
            </h1>

            <div className="space-y-4 mb-8">
                {/* Learner Option */}
                <Card
                    className={`p-6 cursor-pointer hover:shadow-md transition-shadow ${selectedRole === 'learner' ? 'ring-2 ring-primary' : ''
                        }`}
                    onClick={() => setSelectedRole('learner')}
                >
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-6 h-6 mt-1">
                            {selectedRole === 'learner' ? (
                                <div className="w-6 h-6 rounded-full bg-[#00C853] flex items-center justify-center">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                            ) : (
                                <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
                            )}
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                                <GraduationCap className="w-8 h-8 text-blue-500" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Join as a Learner</h2>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        Schedule lessons at your convenience
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Car className="w-4 h-4 text-gray-400" />
                                        Access to modern training vehicles
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <BookOpen className="w-4 h-4 text-gray-400" />
                                        Comprehensive learning materials
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Instructor Option */}
                <Card
                    className={`p-6 cursor-pointer hover:shadow-md transition-shadow ${selectedRole === 'instructor' ? 'ring-2 ring-primary' : ''
                        }`}
                    onClick={() => setSelectedRole('instructor')}
                >
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-6 h-6 mt-1">
                            {selectedRole === 'instructor' ? (
                                <div className="w-6 h-6 rounded-full bg-[#00C853] flex items-center justify-center">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                            ) : (
                                <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
                            )}
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                                <Award className="w-8 h-8 text-green-500" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Join as an Instructor</h2>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-gray-400" />
                                        Build your student portfolio
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ClipboardCheck className="w-4 h-4 text-gray-400" />
                                        Flexible scheduling options
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Award className="w-4 h-4 text-gray-400" />
                                        Competitive compensation
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="flex justify-center">
                <Button
                    type="button"
                    onClick={handleContinue}
                    disabled={!selectedRole}
                    className="px-8 py-2 text-lg"
                >
                    Continue
                </Button>
            </div>
        </div>
    );
};

export default RoleSelection;