import { FC, useState } from 'react';

const TabsDesign: FC = () => {
    const [activeTab, setActiveTab] = useState("General");

    const tabs = ["General", "Pricing", "Dashboard", "API"];
    return (
        <div>
            <div className="flex space-x-4 mx-auto justify-center">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all
                            ${activeTab === tab
                                ? "bg-secondary text-textCol border-secondary"
                                : "bg-textCol text-secondary border- hover:border-black hover:text-black"
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