import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { FC, useState } from 'react';
import MarkdownEditor from './MarkdownEditor';
import MarkdownPreview from './MarkdownPreview';


interface TabsComponentProps {
    content: string;
    setContent: (content: string) => void;
    title: string;
    author: string;
}

const TabsComponent: FC<TabsComponentProps> = ({ content, setContent, title, author }) => {
    const [isActiveTab, setIsActiveTab] = useState("write");
    return (
        <Tabs defaultValue="write" className="mt-4">
            <TabsList className="flex gap-2 mb-4">
                <TabsTrigger
                    value="write"
                    className={`border px-8 py-2 rounded-lg ${isActiveTab === "write" ? "bg-primary text-white" : "bg-gray-100"
                        }`}
                    onClick={() => setIsActiveTab("write")}
                >
                    Write
                </TabsTrigger>
                <TabsTrigger
                    value="preview"
                    className={`border px-8 py-2 rounded-lg ${isActiveTab === "preview" ? "bg-primary text-white" : "bg-gray-100"
                        }`}
                    onClick={() => setIsActiveTab("preview")}
                >
                    Preview
                </TabsTrigger>
            </TabsList>
            <TabsContent value="write">
                <MarkdownEditor content={content} setContent={setContent} />
            </TabsContent>
            <TabsContent value="preview" className='md:min-h-[400px] min-h-[350px]'>
                <MarkdownPreview content={content} title={title} author={author} />
            </TabsContent>
        </Tabs>
    );
};

export default TabsComponent;