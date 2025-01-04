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
