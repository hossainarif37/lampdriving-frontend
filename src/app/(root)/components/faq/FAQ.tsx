import { FC } from 'react';

import SectionHeading from '../shared/section-heading/SectionHeading';
import FaqAccordion from '../shared/faq-accordion/FaqAccordion';
import { Accordion } from '@radix-ui/react-accordion';

const faqArray = [
    {
        title: "At what age can I get my L'S?",
        description: "You can obtain your learners licence at the age of 16 after you complete the drivers knowledge test.",
        val: "1"
    },
    {
        title: "Do you provide a car for the lesson or do I have to bring one?",
        description: "We provide the vehicle, so you don’t need to worry about having a car to practise in. Our cars are well maintained and fitted with safety features including a dual control function which is very helpful when learning to drive and gives peace of mind to both the driver and the instructor.",
        val: "2"
    },
    {
        title: "Does lamp driving school use marked and labelled cars?",
        description: "All our cars have signs on the top and side of the cars so all drivers on the road will be aware that the vehicle is a driving school’s car.",
        val: "3"
    },
    {
        title: "How much do you charge?",
        description: "Lamp driving school has completed market research to show that lesson costs vary according to the location of suburbs. Our rates are competitive and vary when considering factors such as where you will be picked up and dropped off. For your personal rate please don’t hesitate to give us a call so we can be upfront with you about the price.",
        val: "4"
    },
    {
        title: "How do I book a lesson?",
        description: "Currently the only way to book a lesson is by calling our school at 9597 7771, otherwise you can call the instructors directly at 0403112456 or 0430371974. We will be able to tell you the process of how to get started and what you need to do to get your L’s if you haven't already.",
        val: "5"
    },
    {
        title: "Do my driving hours with a driving instructor count towards my logbook?",
        description: "Every hour with a driving instructor will count for 3 hours in your logbook. This is capped up to a total of 10 hours with a driving instructor which is equivalent to 30 hours.",
        val: "6"
    },
    {
        title: "Approximately how many lessons do I ned to pass the driving test?",
        description: "From our experience we have seen some drivers are confident and learn very quickly and they need about 5-10 lessons whilst completing their logbook hours before they go for their test. Less confident drivers and those who may need more time to grasp the rules and are more anxious will need more time over the course of many months and can have more than 20 lessons. It is all dependant on the individual and at Lamp Driving School we do our best to make sure the driver is confident when driving, we will not rush in teaching you as we want you to learn the best and most safe techniques so that you can confidently try and pass the driving test on your first attempt.",
        val: "7"
    },
    {
        title: "What time are you open?",
        description: "We are open and available for lessons from 9am to 7pm Monday to Saturday. If you need a lesson on a Sunday.",
        val: "8"
    },
    {
        title: "Are female instructor available?",
        description: "Yes, we have a female instructor.",
        val: "9"
    },
    {
        title: "What is your cancellation policy?",
        description: "If you cancel within 24 hours of the lesson you are subject to a 25% fee of the lesson price. If you cancel within 6 hours of the lesson the fee is 50% of the lesson price and if you are absent or cancel within one hour of the lesson then the full price of the lesson will need to be paid.",
        val: "10"
    },
    {
        title: "What is your reschedule policy?",
        description: "Please call at least 24 hours before the lesson to reschedule otherwise you will be subject to the above cancellation fees.",
        val: "11"
    },
    {
        title: "Do you teach automatic or manual driving?",
        description: "he vehicles we use for our day-to-day lessons are automatic. We do not provide a manual car to practise in nor do we teach how to drive manual.",
        val: "12"
    },
]

const FAQ: FC = () => {

    return (
        <div className='space-y-3 md:space-y-6 pt-20 p-3 bg-light-green pb-40'>
            {/*Section Heading*/}
            <SectionHeading title='Frequently Asked Questions' subtitle='Find answers to common queries about our driving courses, instructors, fees, and more.' className='md:mb-14' />
            {/*Tabs button part*/}
            <div>
                {/* <TabsDesign /> */}
            </div>
            {/*Accordion part*/}
            <div className='mx-auto px-4 md:px-0 max-w-5xl'>
                <Accordion type="single" collapsible className="w-full">
                    {faqArray.map((faqInfo) => (
                        <FaqAccordion key={faqInfo.val} faqInfo={faqInfo} />
                ))}
                </Accordion>
            </div>
        </div>
    );
};

export default FAQ;