// Importing necessary modules and assets
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import carImg from "@/assets/dummy-images/e4d09a76-e66f-4c58-9910-783a39af0b55-Taisor-Car-Color-Image.webp";
import carImg2 from "@/assets/dummy-images/map-image.jpg";

export default function Sidebar() {
  return (
    <div className="space-y-6">

      {/* Hourly Price Section */}
      <section className="bg-white rounded-xl border p-4 md:p-6">
        <h2 className="text-lg font-semibold mb-4 text-secondary">Hourly Price</h2>
        <div className="space-y-4">
          {/* Pricing and available lesson durations */}
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-accent">Offers 1 & 2hr lessons</span>
            <span className="text-2xl font-bold text-gradient">$70<span className='text-sm'>/hr</span></span>
          </div>

          {/* Discount details for longer lessons */}
          <div className="space-y-2 text-secondary">
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

          {/* Booking buttons */}
          <Button className="w-full gradient-color">Book Now</Button>
          <Button
            className="w-full py-3 px-4 bg-light border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            Check Availability
          </Button>
        </div>
      </section>

      {/* Vehicle Information Section */}
      <section className="bg-light rounded-xl border p-4 md:p-6 text-secondary">
        <h2 className="text-lg font-semibold mb-4">Hridoy&apos;s vehicle</h2>
        <div className="space-y-4">
          {/* Displaying vehicle image */}
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <Image
              src={carImg}
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

      {/* Service Areas Section */}
      <section className="bg-white rounded-xl border p-4 md:p-6">
        <h2 className="text-lg font-semibold mb-4 text-secondary">Service Areas</h2>
        <div className="aspect-video relative rounded-lg overflow-hidden">
          <Image
            src={carImg2}
            alt="Service Areas Map"
            fill
            className="object-cover"
          />
        </div>
      </section>
    </div>
  );
}
