import Image from 'next/image'
import IImg from "@/assets/home-page-image/test-image.webp"

export default function OtherInstructors() {
  const instructors = [
    { id: 1, name: 'Kim' },
    { id: 2, name: 'Steve' },
    { id: 3, name: 'Ahmad' },
    { id: 4, name: 'Jennifer' },
    { id: 5, name: 'Lee-min' },
    { id: 6, name: 'Chandrika' },
    { id: 7, name: 'Daniel' },
  ]

  return (
    <section className="bg-light rounded-xl border p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-6 text-secondary">Other instructors in BANKSIA, 2216</h2>
      <div className="flex gap-6 overflow-x-hidden">
        {instructors.map((instructor) => (
          <div key={instructor.id} className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-1">
              <Image
                src={IImg}
                alt={instructor.name}
                width={200}
                height={200}
                className="rounded-full object-cover"
              />
            </div>
            <p className="text-xs text-accent font-medium">{instructor.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

