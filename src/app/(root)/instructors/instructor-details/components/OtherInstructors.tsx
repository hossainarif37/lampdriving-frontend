import Image from 'next/image'

export default function OtherInstructors() {
  const instructors = [
    { id: 1, name: 'Kim', image: '/placeholder.svg' },
    { id: 2, name: 'Steve', image: '/placeholder.svg' },
    { id: 3, name: 'Ahmad', image: '/placeholder.svg' },
    { id: 4, name: 'Jennifer', image: '/placeholder.svg' },
    { id: 5, name: 'Lee-min', image: '/placeholder.svg' },
    { id: 6, name: 'Chandrika', image: '/placeholder.svg' },
    { id: 7, name: 'Daniel', image: '/placeholder.svg' },
    { id: 8, name: 'Michelle', image: '/placeholder.svg' },
  ]

  return (
    <section className="bg-white rounded-xl border p-6">
      <h2 className="text-xl font-semibold mb-6">Other instructors in BANKSIA, 2216</h2>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
        {instructors.map((instructor) => (
          <div key={instructor.id} className="text-center">
            <div className="relative w-12 h-12 mx-auto mb-1">
              <Image
                src={instructor.image}
                alt={instructor.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <p className="text-xs text-gray-600">{instructor.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

