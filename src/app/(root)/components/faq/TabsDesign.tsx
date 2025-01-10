import { FC } from 'react';

interface ITabsDesignProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const TabsDesign: FC<ITabsDesignProps> = ({ activeTab, setActiveTab }) => {
    const tabs = ["General", "Courses", "Pricing", "Support"];

    return (
        <div>
            <div className="flex md:space-x-4 space-x-1 mx-auto justify-center">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`md:px-4 border px-3 py-2 rounded-full text-sm font-medium cursor-pointer
                            ${activeTab === tab
                                ? "bg-secondary text-light"
                                : "bg-light text-primary hover:border"
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
