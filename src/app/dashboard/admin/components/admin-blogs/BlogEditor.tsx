'use client'
import { FC } from 'react';
import { Bold, Italic, Strikethrough, Underline, Quote, List, ListOrdered, LinkIcon, ImageIcon, Code, Heading1, Heading2 } from "lucide-react"
import LabeledInput from "./LabeledInput"
import TooltipButton from "./TooltipButton"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import TabsComponent from './TabsComponent';
import { useCreateBlogMutation } from '@/redux/api/blogApi/blogApi';



const BlogEditor: FC = () => {
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const [createBlog, { isLoading, error }] = useCreateBlogMutation();


    const handleSubmit = async () => {
        if (!title || !content) {
            alert("Title and content are required.");
            return;
        }

        const blogData = {
            title,
            path: title.toLowerCase().replace(/ /g, "-"), // Generate a path from the title
            content,
            image: "", // Handle image upload separately if needed
        };

        try {
            const response = await createBlog(blogData).unwrap();
            console.log(response);
            alert(response.message || "Blog published successfully!");
            setTitle(""); // Clear the form
            setContent("");
        } catch (err) {
            console.error(err);
            alert("Failed to publish the blog.");
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            insertMarkdown("image", `![${file.name}](${imageUrl})`)
        }
    }

    // Inserts markdown syntax for different formats ( bold, italic, headings)
    const insertMarkdown = (type: string, customText?: string) => {
        const textarea = document.querySelector('textarea');
        if (!textarea) return;

        const start = textarea.selectionStart || 0;
        const end = textarea.selectionEnd || 0;
        const selectedText = content.substring(start, end);

        // Define markdown syntax for each action
        const markdownSyntax: { [key: string]: string } = {
            h1: `# ${selectedText || 'Heading 1'}`,
            h2: `## ${selectedText || 'Heading 2'}`,
            bold: `**${selectedText || 'bold text'}**`,
            italic: `*${selectedText || 'italic text'}*`,
            strikethrough: `~~${selectedText || 'strikethrough text'}~~`,
            underline: `<u>${selectedText || 'underlined text'}</u>`,
            quote: `"${selectedText || 'quoted text'}"`,
            bulletList: `${selectedText ? `- ${selectedText}` : '- list item'}\n`,
            numberList: `${selectedText ? `1. ${selectedText}` : '1. list item'}\n`,
            link: `[${selectedText || 'link text'}](url)`,
            image: customText || `![image description](image url)`,
            code: `\`\`\`\n${selectedText || 'code block'}\n\`\`\``,
            video: `<video width="100%" controls>\n  <source src="${selectedText || 'video url'}" type="video/mp4">\n  Your browser does not support the video tag.\n</video>`,
        };

        // Insert markdown into the content
        const newContent =
            content.substring(0, start) +
            markdownSyntax[type] +
            content.substring(end);

        setContent(newContent);

        // Reset cursor position after content update
        setTimeout(() => {
            textarea.focus();
            const newCursorPos = start + markdownSyntax[type].length;
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };
    return (
        <div className="w-full max-w-8xl mx-auto p-4 space-y-4 ">
            <LabeledInput
                id="title"
                label="Blog Title"
                value={title}
                placeholder="Enter blog title"
                onChange={(e) => setTitle(e.target.value)}
            />

            <div className="flex flex-wrap md:w-1/2 gap-2 p-2 bg-gray-100 rounded-md">
                <TooltipButton
                    icon={<Heading1 className="h-4 w-4 text-accent/95" strokeWidth={3} />}
                    tooltip="Bold"
                    onClick={() => insertMarkdown("h1")}
                />
                <TooltipButton
                    icon={<Heading2 className="h-4 w-4 text-accent/95" strokeWidth={3} />}
                    tooltip="Bold"
                    onClick={() => insertMarkdown("h2")}
                />
                <TooltipButton
                    icon={<Bold className="h-4 w-4 text-accent/95" strokeWidth={3} />}
                    tooltip="Bold"
                    onClick={() => insertMarkdown("bold")}
                />
                <TooltipButton
                    icon={<Italic className="h-4 w-4 text-accent/95" strokeWidth={2.5} />}
                    tooltip="Italic"
                    onClick={() => insertMarkdown("italic")}
                />
                <TooltipButton
                    icon={<Underline className="h-4 w-4 text-accent/95" strokeWidth={2.5} />}
                    tooltip="Underline"
                    onClick={() => insertMarkdown("underline")}
                />
                <TooltipButton
                    icon={<Quote className="h-4 w-4 text-accent/95" strokeWidth={2.5} />}
                    tooltip="Quote"
                    onClick={() => insertMarkdown("quote")}
                />
                <TooltipButton
                    icon={<List className="h-4 w-4 text-accent/95" strokeWidth={2.5} />}
                    tooltip="Bullet List"
                    onClick={() => insertMarkdown("bulletList")}
                />
                <TooltipButton
                    icon={<ListOrdered className="h-4 w-4 text-accent/95" strokeWidth={2.5} />}
                    tooltip="Numbered List"
                    onClick={() => insertMarkdown("numberList")}
                />
                <TooltipButton
                    icon={<LinkIcon className="h-4 w-4 text-accent/95" strokeWidth={2.5} />}
                    tooltip="Link"
                    onClick={() => insertMarkdown("link")}
                />
                <TooltipButton
                    icon={<ImageIcon className="h-4 w-4 text-accent/95" strokeWidth={2.5} />}
                    tooltip="Image"
                    inputFile
                    inputFileProps={{
                        accept: "image/*",
                        onChange: handleImageUpload,
                    }}
                />
                <TooltipButton
                    icon={<Code className="h-4 w-4 text-accent/95" strokeWidth={2.5} />}
                    tooltip="Code Block"
                    onClick={() => insertMarkdown("code")}
                />
            </div>

            {/* Tabs and other content go here */}
            <TabsComponent
                content={content}
                setContent={setContent}
                title={title}
            />

            <Button className="w-md mx-auto mt-4" disabled={isLoading} onClick={handleSubmit}>
                {isLoading ? "Publishing..." : "Publish Blog"}
            </Button>
        </div>
    )
};

export default BlogEditor;