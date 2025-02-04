"use client";

import { useGetInstructorReviewsQuery } from '@/redux/api/reviewApi/reviewApi';
import { IInstructor } from '@/types/instructor';
import { formatDate } from 'date-fns';
import { FC } from 'react';

interface IReviewsProps {
  instructor: IInstructor;
}

const Reviews: FC<IReviewsProps> = ({ instructor }) => {
  const username = typeof instructor.user === 'object' ? instructor.user.username : instructor.user;

  // Use the username in the query
  const { data, isLoading, isError } = useGetInstructorReviewsQuery({ username });

  if (isLoading) return <div>Loading reviews...</div>;
  if (isError) return <div>Error loading reviews</div>;
  console.log('data', data);
  const reviews = data?.data?.result.map((review: any) => ({
    id: review?._id,
    name: review?.learner?.user?.name?.firstName,
    date: review?.createdAt,
    rating: review?.rating,
    comment: review?.feedback
  })
  ) || [];

  console.log('reviews', reviews);

  return (
    <section className="bg-light rounded-xl border p-4 md:p-6">

      {/* Reviews section header */}
      <h2 className="text-xl font-semibold mb-6 text-primary">Reviews</h2>
      <div className="space-y-6">

        {/* No reviews message */}
        {
          reviews.length === 0 ? <p className="text-gray-500">No reviews yet.</p>
            :
            <>
              {reviews.map((review: any) => (
                <div key={review?._id} className="border-b last:border-b-0 pb-6 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-primary">{review?.name}</h3>
                      <p className="text-sm text-gray-500">Posted on {formatDate(new Date(review?.date), 'dd MMM yyyy')}</p>
                    </div>
                    <div className="flex">{'★'.repeat(review.rating)}</div>
                  </div>
                  <p className="text-accent">{review?.comment}</p>
                </div>
              ))}
            </>
        }


      </div>
    </section>
  );
};

export default Reviews;