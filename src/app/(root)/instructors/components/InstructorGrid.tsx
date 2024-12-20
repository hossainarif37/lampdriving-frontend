"use client";
import { FC } from 'react';
import InstructorCard from './InstructorCard';
import cardImg from "@/assets/home-page-image/test-image.webp"
import React, { useState } from "react";
import { Pagination } from './Pagination';


const instructors = [
    {
        id: 1,
        name: "Hridoy Ahmed",
        image: cardImg,
        rating: 4.9,
        experience: "4 years",
        pricePerHour: 60,
        skills: "Auto",
        totalRatings: 100,
        totalLessons: 100
    },
    {
        id: 2,
        name: "John Doe",
        image: cardImg,
        rating: 4.8,
        experience: "5 years",
        pricePerHour: 50,
        skills: "Auto",
        totalRatings: 80,
        totalLessons: 100
    },
    {
        id: 3,
        name: "Jane Smith",
        image: cardImg,
        rating: 4.7,
        experience: "3 years",
        pricePerHour: 55,
        skills: "Manual",
        totalRatings: 100,
        totalLessons: 100
    },
    {
        id: 4,
        name: "Hridoy Ahmed",
        image: cardImg,
        rating: 4.9,
        experience: "4 years",
        pricePerHour: 60,
        skills: "Auto",
        totalRatings: 100,
        totalLessons: 100
    },
    {
        id: 5,
        name: "John Doe",
        image: cardImg,
        rating: 4.8,
        experience: "5 years",
        pricePerHour: 50,
        skills: "Auto",
        totalRatings: 80,
        totalLessons: 100
    },
    {
        id: 6,
        name: "Jane Smith",
        image: cardImg,
        rating: 4.7,
        experience: "3 years",
        pricePerHour: 55,
        skills: "Manual",
        totalRatings: 100,
        totalLessons: 100
    },
];

const InstructorGrid: FC = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(4);
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    instructors.map((instructor) => (
                        <InstructorCard key={instructor.id} instructor={instructor} />
                    ))
                }
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(newPage) => {
                    setCurrentPage(newPage);
                }}
            />
        </>
    );
};

export default InstructorGrid;