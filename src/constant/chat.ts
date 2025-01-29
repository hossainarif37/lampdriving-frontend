
export interface IInstruction {
    title: string;
    content: string;
}

export const instructions: IInstruction[] = [
    {
        title: "📚 Getting Started",
        content: "Welcome to our site! Click on any section below for helpful tips and guidance."
    },
    {
        title: "🎯 How to Book",
        content: "1. Enter your suburb in the search bar\n2. Choose AUTO or MANUAL\n3. Browse available instructors\n4. Click BOOK on your preferred instructor\n5. Select your preferred date and time"
    },
    {
        title: "🌟 Choosing an Instructor",
        content: "Look for:\n• Experience years\n• Rating stars\n• Completed lessons\n• Hourly rate\n• Location proximity"
    },
    {
        title: "💳 Payment Info",
        content: "We accept:\n• Credit/Debit cards\n• PayPal\n• Direct bank transfer\n\nPayment is required at the time of booking."
    },
];