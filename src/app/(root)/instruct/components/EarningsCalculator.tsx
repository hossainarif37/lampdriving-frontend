"use client"

import React, { FC } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

import bannerImg from "@/assets/banner-img/slide-v1-2.jpg"
import Link from "next/link"

const EarningsCalculator: FC = () => {
    const [hourlyRate, setHourlyRate] = React.useState(80)
    const [lessonHours, setLessonHours] = React.useState(16)
    const weeklyEarnings = hourlyRate * lessonHours

    return (
        <div className="py-24 px-4 sm:px-6 lg:px-8 text-secondary">
            {/* Main container for the section with responsive padding and text color */}
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                {/* Grid layout for dividing content into two columns on medium and larger screens */}

                <div className="space-y-8">
                    {/* Left column: Contains text, sliders, and the call-to-action button */}

                    <div className="space-y-4">
                        {/* Heading section */}
                        <h2 className="text-4xl font-bold">
                            Get Bookings With{" "}
                            <span className="text-gradient">
                                Lamp Driving
                            </span>
                        </h2>
                        <h3 className="text-3xl font-semibold">
                            You could earn{" "}
                            <span className="text-4xl font-bold text-indigo">
                                ${weeklyEarnings}
                            </span>
                            /week
                        </h3>
                        <p className="text-gray-600">
                            Based off an hourly lesson price of ${hourlyRate} and delivering{" "}
                            {lessonHours} lesson hours per week
                        </p>
                    </div>

                    <Card className="p-6 space-y-6">
                        {/* Card for hourly rate and lesson hours sliders */}
                        <div className="space-y-2">
                            {/* Hourly Rate Slider */}
                            <div className="flex justify-between">
                                <label className="font-medium">Hourly Rate</label>
                                <span className="font-semibold">${hourlyRate}</span>
                            </div>
                            <Slider
                                value={[hourlyRate]}
                                onValueChange={(value) => setHourlyRate(value[0])}
                                min={60}
                                max={120}
                                step={2}
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            {/* Lesson Hours Slider */}
                            <div className="flex justify-between">
                                <label className="font-medium">Lesson Hours per Week</label>
                                <span className="font-semibold">{lessonHours} hours</span>
                            </div>
                            <Slider
                                value={[lessonHours]}
                                onValueChange={(value) => setLessonHours(value[0])}
                                min={4}
                                max={40}
                                step={1}
                                className="w-full"
                            />
                        </div>
                    </Card>

                    <div>
                        {/* Call-to-action button linking to the registration page */}
                        <Link href="/register mt-5">
                            <Button size="lg" className="w-full sm:w-auto gradient-color">
                                Sign up now
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="relative h-[480px] rounded-2xl overflow-hidden hidden md:block">
                    {/* Right column: Displays an image, hidden on small screens */}
                    <Image
                        src={bannerImg}
                        alt="Driving instructor with student"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>
        </div>

    )
}
export default EarningsCalculator;




// 'use client'

// import { useState } from "react"
// import { Slider } from "@/components/ui/slider"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Calculator, DollarSign, Clock } from 'lucide-react'
// import SectionHeading from "../../components/shared/section-heading/SectionHeading"

// export default function EarningsCalculator() {
//     const [hourlyRate, setHourlyRate] = useState(80)
//     const [lessonHours, setLessonHours] = useState(20)

//     const weeklyEarning = lessonHours * hourlyRate
//     const monthlyEarning = weeklyEarning * 4
//     const yearlyEarning = weeklyEarning * 52

//     return (
//         <div className="py-24">
//             <div className="px-4 mx-auto max-w-6xl">

//                 <SectionHeading title="Get Bookings With Lamp Driving" subtitle="Calculate your potential earnings as a driving instructor" />

//                 <div className="grid gap-6 md:grid-cols-2">
//                     {/* Earnings Calculator Card */}
//                     <Card>
//                         <CardHeader>
//                             <CardTitle className="flex items-center gap-2 text-gradient">
//                                 <Calculator className="h-5 w-5 text-primary" />
//                                 Earnings Calculator
//                             </CardTitle>
//                         </CardHeader>
//                         <CardContent className="space-y-6">
//                             <div className="space-y-8">
//                                 {/* Hourly Rate Input */}
//                                 <div className="space-y-2">
//                                     <label className="flex items-center gap-2 text-sm font-medium text-primary">
//                                         <DollarSign className="h-4 w-4" />
//                                         Hourly Rate
//                                     </label>
//                                     <div className="flex items-center gap-2">
//                                         <span className="text-lg font-medium text-gradient">$</span>
//                                         <Input
//                                             type="number"
//                                             value={hourlyRate}
//                                             onChange={(e) => setHourlyRate(Number(e.target.value))}
//                                             min={0}
//                                             className="w-24"
//                                         />
//                                         <span className="text-sm text-gray-500">/hour</span>
//                                     </div>
//                                 </div>

//                                 {/* Weekly Hours Slider */}
//                                 <div className="space-y-2">
//                                     <label className="flex items-center gap-2 text-sm font-medium text-gradient">
//                                         <Clock className="h-4 w-4" />
//                                         Weekly Hours
//                                     </label>
//                                     <div className="space-y-2">
//                                         <Slider
//                                             value={[lessonHours]}
//                                             onValueChange={(value) => setLessonHours(value[0])}
//                                             max={40}
//                                             min={1}
//                                             step={1}
//                                             className="py-4"
//                                         />
//                                         <div className="flex justify-between text-sm text-gray-500">
//                                             <span>{lessonHours} hours per week</span>
//                                             <span>${hourlyRate} per hour</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <Button size="lg" className="w-full gradient-color text-white">
//                                 Sign up now
//                             </Button>
//                         </CardContent>
//                     </Card>

//                     {/* Potential Earnings Card */}
//                     <Card className="border-indigo-100">
//                         <CardHeader>
//                             <CardTitle className="flex items-center gap-2 text-gradient">
//                                 <DollarSign className="h-5 w-5" />
//                                 Potential Earnings
//                             </CardTitle>
//                         </CardHeader>
//                         <CardContent className="space-y-6">
//                             <div className="space-y-4">
//                                 {/* Weekly Earnings */}
//                                 <div className="p-4 bg-primary/5 rounded-lg space-y-1">
//                                     <div className="text-sm text-gray-600">Weekly Earnings</div>
//                                     <div className="text-3xl font-bold text-gradient">
//                                         ${weeklyEarning.toLocaleString()}
//                                     </div>
//                                 </div>

//                                 {/* Monthly Earnings */}
//                                 <div className="p-4 bg-primary/5 rounded-lg space-y-1">
//                                     <div className="text-sm text-gray-600">Monthly Earnings</div>
//                                     <div className="text-2xl font-bold text-gradient">
//                                         ${monthlyEarning.toLocaleString()}
//                                     </div>
//                                 </div>

//                                 {/* Yearly Earnings */}
//                                 <div className="p-4 bg-primary/5 rounded-lg space-y-1">
//                                     <div className="text-sm text-gray-600">Yearly Earnings</div>
//                                     <div className="text-2xl font-bold text-gradient">
//                                         ${yearlyEarning.toLocaleString()}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="text-xs text-gray-500 text-center">
//                                 * Earnings are calculated before tax and expenses
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </div>
//             </div>
//         </div>
//     )
// }

