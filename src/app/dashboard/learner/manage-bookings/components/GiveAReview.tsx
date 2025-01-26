"use client"
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { useCreateAReviewMutation } from '@/redux/api/reviewApi/reviewApi';
import { ICreateAReviewReqData } from '@/types/review';
import { Star } from 'lucide-react';
import { FC, useState } from 'react';

interface IGiveAReviewProps {
    bookingId: string;
}

const GiveAReview: FC<IGiveAReviewProps> = ({ bookingId }) => {
    const [showReview, setShowReview] = useState(false);
    const [feedback, setFeedback] = useState<{ content: string, error: boolean }>({ content: '', error: false });
    const [rating, setRating] = useState<{ value: number, error: boolean }>({ value: 0, error: false });
    const [hoveredRating, setHoveredRating] = useState(0);
    const [createAReview, { isLoading }] = useCreateAReviewMutation();
    const handleSubmit = () => {
        if (rating.value === 0) {
            setRating({ value: 0, error: true });
            return;
        } else if (feedback.content.trim() === '') {
            setFeedback({ content: '', error: true });
            return;
        }
        const reqData: ICreateAReviewReqData = {
            booking: bookingId,
            rating: rating.value,
            feedback: feedback.content
        }
        createAReview(reqData).unwrap().then((res) => {
            toast({
                message: res.message
            })
        }).catch((err) => {
            toast({
                success: false,
                message: err?.data?.message || "Something went wrong"
            })
        });
    };

    const getRatingLabel = () => {
        if (hoveredRating || rating.value) {
            const value = hoveredRating || rating.value;
            switch (value) {
                case 1: return 'Poor';
                case 2: return 'Fair';
                case 3: return 'Good';
                case 4: return 'Great';
                case 5: return 'Excellent';
                default: return '';
            }
        }
        return '';
    };


    return (
        <Dialog open={showReview} onOpenChange={setShowReview}>
            <DialogTrigger asChild>
                <Button variant={"ghost"} className='h-[36px] py-0 font-normal capitalize text-start justify-start px-2'>
                    Review
                </Button>
            </DialogTrigger>
            <DialogContent className='max-w-lg py-0 px-0 space-y-0 gap-0'>
                <DialogHeader>
                    <DialogTitle className='text-2xl font-semibold px-4 pt-3 text-center'>
                        <span className='text-primary'>Share Your Experience</span>
                    </DialogTitle>
                    <p className='text-sm text-gray-500 text-center border-b pb-3 mb-3'>Your feedback helps us improve</p>
                </DialogHeader>
                <div className='p-6'>
                    {/* Rating section */}
                    <div className="space-y-3">
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => setRating({ value, error: false })}
                                        onMouseEnter={() => setHoveredRating(value)}
                                        onMouseLeave={() => setHoveredRating(0)}
                                        className="p-1.5 rounded-full hover:bg-gray-50 transition-all duration-150 transform hover:scale-110"
                                    >
                                        <Star
                                            size={32}
                                            className={`${value <= (hoveredRating || rating.value)
                                                ? 'fill-secondary text-secondary'
                                                : 'text-primary'
                                                } transition-colors duration-150`}
                                        />
                                    </button>
                                ))}
                            </div>
                            <span className="text-sm font-medium text-gray-600 h-6 mb-6">
                                {getRatingLabel()}
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='feedback' className="block text-sm font-medium text-gray-700">
                                Tell us more about your experience
                            </Label>
                            <Textarea id='feedback' placeholder='Write your feedback here...' className='h-[100px]' value={feedback.content} onChange={(e) => setFeedback({ content: e.target.value, error: false })} />
                            {rating.error && <p className="text-red-500 text-sm">Please select a rating</p>}
                            {feedback.error && <p className="text-red-500 text-sm">Please enter your feedback</p>}
                        </div>
                    </div>
                </div>
                <DialogFooter className='pt-4 bg-gray-50'>
                    <div className="flex items-center justify-end gap-4 pb-4 px-4">
                        <DialogClose asChild>
                            <Button
                                variant={"outline"}
                                className=""
                            >
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button disabled={isLoading} loading={isLoading} onClick={handleSubmit} className='bg-primary w-40' size="lg">
                            Submit
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
};

export default GiveAReview;