'use client'

import { useState } from 'react'
import Image from 'next/image'
import AvailabilityModal from './AvailabilityModal'

export default function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-xl border p-6">
        <h2 className="text-lg font-semibold mb-4">Hourly Price</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-gray-600">Offers 1 & 2hr lessons</span>
            <span className="text-2xl font-bold">$70/hr</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>6hrs or more</span>
              <span className="text-green-500 font-medium">SAVE 5%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>10hrs or more</span>
              <span className="text-green-500 font-medium">SAVE 10%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Test Package (2.5 hrs)</span>
              <span>$225</span>
            </div>
          </div>

          <button className="w-full py-3 px-4 bg-yellow-400 text-gray-900 rounded-md font-medium hover:bg-yellow-500 transition-colors">
            Book Now
          </button>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full py-3 px-4 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            Check Availability
          </button>

          <div className="pt-4 border-t">
            <p className="text-sm font-medium mb-2">Buy Now Pay Later</p>
            <div className="flex gap-2">
              <Image src="/placeholder.svg" alt="PayPal" width={60} height={30} className="h-8 w-auto" />
              <Image src="/placeholder.svg" alt="AfterPay" width={60} height={30} className="h-8 w-auto" />
              <Image src="/placeholder.svg" alt="Klarna" width={60} height={30} className="h-8 w-auto" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border p-6">
        <h2 className="text-lg font-semibold mb-4">Arun&apos;s vehicle</h2>
        <div className="space-y-4">
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg"
              alt="Toyota Yaris 2018"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium">Toyota Yaris 2018 (Auto)</h3>
            <p className="text-sm text-gray-600 mt-1">4-star ANCAP rating</p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border p-6">
        <h2 className="text-lg font-semibold mb-4">Service Areas</h2>
        <div className="aspect-video relative rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg"
            alt="Service Areas Map"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <AvailabilityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

