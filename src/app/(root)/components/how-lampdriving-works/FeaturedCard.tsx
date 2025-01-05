const FeatureCard = ({ number, icon: Icon, title, description }: {
    number: number;
    icon: React.ElementType;
    title: string;
    description: string;
}) => {
    return (
        <div className="relative bg-white rounded-xl p-6 shadow-md">
            <div className="absolute -top-4 -left-4 w-8 h-8 gradient-color text-white rounded-lg flex items-center justify-center font-semibold">
                {number}
            </div>
            <div className="mb-4 text-blue-600">
                <Icon size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}

export default FeatureCard