import Image from 'next/image'
import man from "@/assets/home-page-image/test-image.webp"

export default function InstructorInfo() {
  return (
    <section className="bg-white rounded-xl border p-6 space-y-6">
      <div className="flex items-start gap-6">
        <div className="relative flex-shrink-0">
          <Image
            src={man}
            alt="Instructor"
            width={100}
            height={100}
            className="rounded-full border"
          />
          <Image
            src="/placeholder.svg"
            alt="Vehicle"
            width={60}
            height={60}
            className="absolute -bottom-2 -right-2 rounded-full border border-2"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Arun</h1>
          <div className="flex items-center gap-1 mt-1">
            <div className="flex text-yellow-400">{'★'.repeat(5)}</div>
            <span className="text-sm text-gray-600 ml-1">4.6 · 79 ratings</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-semibold mb-2">Instructor Bio</h2>
        <p className="text-gray-600 mb-4">
          Hi, my name is Arun. I started as a car driver over 10 years. This experience is invaluable and I&apos;m very passionate about teaching. I started teaching in 2015 with my focus on full-time teaching people to pass the test and drive safely. I always cover all laws related to NSW roads, including road rules and safety.
        </p>
        <div className="space-y-2 ">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-gray-600">Auto Lessons & Test Packages</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-gray-600">Verified Working with Children Check</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-gray-600">Instructed for 15 yr 4 mo</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Spoken language(s)</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">Bengali</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">English</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">Hindi</span>
        </div>
      </div>
    </section>
  )
}
