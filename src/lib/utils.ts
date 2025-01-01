import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const generateUniqueIdentifier = (file: File): string => {
  return `${file.name}_${file.size}_${file.lastModified}`;
};