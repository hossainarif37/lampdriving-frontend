import { FC, useState } from 'react';

const TabsDesign: FC = () => {
    const [activeTab, setActiveTab] = useState("General");

    const tabs = ["General", "Courses", "Pricing", "Support"];
    return (
        <div>
            <div className="flex md:space-x-4 space-x-1 mx-auto justify-center">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`md:px-4 border px-3 py-2 rounded-full text-sm font-medium
                            ${activeTab === tab
                                ? "gradient-color text-light"
                                : "bg-light text-primary hover:gradient-color hover:text-light"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TabsDesign;