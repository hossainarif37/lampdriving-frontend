// Mock data - In a real app, this would come from your API
export const mockUser = {
  name: {
    firstName: 'John',
    lastName: 'Doe',
  },
  email: 'john.doe@example.com',
  phone: '+1234567890',
  dateOfBirth: {
    month: '01',
    year: '1990',
  },
  gender: 'male' as const,
  address: {
    address: '123 Main St',
    suburb: 'Downtown',
  },
};

export const mockInstructor = {
  vehicle: {
    name: 'Toyota Corolla',
    model: '2020',
    type: 'auto' as const,
    image: 'https://example.com/car.jpg',
  },
  workingHour: {
    monday: { isActive: true, startTime: '09:00', endTime: '17:00' },
    tuesday: { isActive: true, startTime: '09:00', endTime: '17:00' },
    wednesday: { isActive: true, startTime: '09:00', endTime: '17:00' },
    thursday: { isActive: true, startTime: '09:00', endTime: '17:00' },
    friday: { isActive: true, startTime: '09:00', endTime: '17:00' },
    saturday: { isActive: false, startTime: '', endTime: '' },
    sunday: { isActive: false, startTime: '', endTime: '' },
  },
  serviceAreas: ['Downtown', 'Suburb A', 'Suburb B'],
  documents: {
    drivingLicense: 'license.pdf',
    experienceCertificate: 'certificate.pdf',
  },
};