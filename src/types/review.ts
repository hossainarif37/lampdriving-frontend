export interface IReview {
    rating: number;
    feedback: string;
    instructor: string;
    learner: string;
    booking: string;
}


export interface ICreateAReviewReqData {
    booking: string;
    rating: number;
    feedback: string;
}