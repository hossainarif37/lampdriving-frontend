'use client'

import { X } from "lucide-react"

interface AvailabilityModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function AvailabilityModal({ isOpen, onClose }: AvailabilityModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-primary">Check Availability</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X />
                    </button>
                </div>
                <div className="aspect-[4/3] bg-gray-100 rounded-lg mb-4">
                    {/* Calendar placeholder */}
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-light bg-primary rounded-md "
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}

