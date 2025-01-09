const FeatureCard = ({ number, icon: Icon, title, description }: {
    number: number;
    icon: React.ElementType;
    title: string;
    description: string;
}) => {
    return (
        <div className="relative rounded-[4px] p-6  border-gray-200 gradient-to-b">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-secondary text-white rounded-[4px] flex items-center justify-center font-semibold">
                {number}
            </div>
            <div className="mb-4 ">
                <Icon size={32} strokeWidth={1.5} className="text-primary bg-gradient-to-r from-green-200 to-green-100 p-3 w-12 h-12 rounded-lg" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}

export default FeatureCard