import { IWorkingHour } from "@/types/instructor";

export const defaultWorkingHours: IWorkingHour = {
  saturday: { isActive: true, startTime: '09:00', endTime: '17:00' },
  sunday: { isActive: true, startTime: '09:00', endTime: '17:00' },
  monday: { isActive: true, startTime: '09:00', endTime: '17:00' },
  tuesday: { isActive: true, startTime: '09:00', endTime: '17:00' },
  wednesday: { isActive: true, startTime: '09:00', endTime: '17:00' },
  thursday: { isActive: true, startTime: '09:00', endTime: '17:00' },
  friday: { isActive: true, startTime: '09:00', endTime: '17:00' },
};