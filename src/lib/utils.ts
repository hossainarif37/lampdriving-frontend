import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const generateUniqueIdentifier = (file: File): string => {
  return `${file.name}_${file.size}_${file.lastModified}`;
};

export const extractFileDetails = (url: string): { fileName: string; size: string } | null => {
  const regex = /\/([^\/]+?\.\w+?)_(\d+)_/; // Matches the filename with extension and ID
  const match = url.match(regex);
  if (match) {
    return {
      fileName: match[1], // Full filename with extension
      size: match[2],       // Extracted ID
    };
  }
  return null;
}

export const toFixedNumber = (value: number): number => {
  return Number(value.toFixed(2));
};

export const getYears = (startYear: number): number[] => {
  const endYear = new Date().getFullYear();
  const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index)
  return years;
};

const getAge = (month: number | string, year: number | string): string => {
  // Convert to numbers
  const birthMonth = Number(month);
  const birthYear = Number(year);

  // Validate month range
  if (isNaN(birthMonth) || isNaN(birthYear) || birthMonth < 1 || birthMonth > 12) {
    throw new Error("Invalid month or year. Month should be between 1 and 12.");
  }

  const birthDate = new Date(birthYear, birthMonth - 1); // JS months are 0-indexed
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  if (!hasBirthdayPassed) {
    age--; // Subtract age if birthday hasn't occurred yet this year
  }

  return `${age} years old`;
};

export default getAge;


export const getPublicIdFromUrl = (url: string) => {
  const regex = /\/upload\/v\d+\/([^\.]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const calculateExperience = (month: string, year: string): string => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const startMonth = parseInt(month, 10);
  const startYear = parseInt(year, 10);

  if (isNaN(startMonth) || isNaN(startYear)) {
    return "Invalid date input";
  }

  let years = currentYear - startYear;
  let months = currentMonth - startMonth;

  if (months < 0) {
    years--;
    months += 12;
  }

  let text = "";
  if (years > 0 && months > 0) {
    text = `${years} yr. ${months} mo.`;
  } else if (years > 0) {
    text = `${years} yr.`;
  } else if (months > 0) {
    text = `${months} mo.`;
  }

  return text;
};
