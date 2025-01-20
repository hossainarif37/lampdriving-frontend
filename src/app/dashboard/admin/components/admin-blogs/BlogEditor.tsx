'use client'
import { FC } from 'react';
import { Bold, Italic, Strikethrough, Underline, Quote, List, ListOrdered, LinkIcon, ImageIcon, Code, Video, Heading1, Heading2 } from "lucide-react"
import LabeledInput from "./LabeledInput"
import TooltipButton from "./TooltipButton"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import TabsComponent from './TabsComponent';


const BlogEditor: FC = () => {
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")

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
        <div className="w-full mx-auto p-4 space-y-4">
            <LabeledInput
                id="title"
                label="Blog Title"
                value={title}
                placeholder="Enter blog title"
                onChange={(e) => setTitle(e.target.value)}
                className="text-2xl font-bold"
            />

            <LabeledInput
                id="author"
                label="Author"
                value={author}
                placeholder="Enter author name"
                onChange={(e) => setAuthor(e.target.value)}
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
                    icon={<Strikethrough className="h-4 w-4 text-accent/95" strokeWidth={2.5} />}
                    tooltip="Strikethrough"
                    onClick={() => insertMarkdown("strikethrough")}
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
                author={author}
            />

            <Button className="w-md mx-auto mt-4">
                Publish Blog
            </Button>
        </div>
    )
};

export default BlogEditor;

{/* <Tabs defaultValue="write" className="mt-4">
    <TabsList className='flex gap-2 mb-4'>
        <TabsTrigger value="write" className='border px-8 py-2 rounded-lg'>Write</TabsTrigger>
        <TabsTrigger value="preview" className='border px-8 py-2 rounded-lg'>Preview</TabsTrigger>
    </TabsList>
    <TabsContent value="write">
        <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content here..."
            className="min-h-[400px] font-mono"
        />
    </TabsContent>
    <TabsContent value="preview">
        <div className="prose max-w-none">
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <div className="text-sm text-gray-500 mb-6">
                by {author} • Last updated {new Date().toLocaleDateString()}
            </div>
            <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={{
                    h1: ({ children }) => <h1 className="text-3xl font-bold mt-6 mb-4 text-primary/85">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-2xl font-bold mt-5 mb-3 text-primary/85">{children}</h2>,
                    p: ({ children }) => <p className="mb-4 leading-relaxed text-accent">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc pl-6 my-4 text-accent">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-6 my-4">{children}</ol>,
                    li: ({ children }) => <li className="my-2 text-accent">{children}</li>,
                    a: ({ children, href }) => (
                        <a href={href} className="text-blue-600 hover:underline">
                            {children}
                        </a>
                    ),
                    img: ({ src, alt }) => (
                        <Image src={src || "/placeholder.svg"} alt={alt || "Image"} className="w-full rounded-lg my-4" />
                    ),
                    code: ({ children }) => (
                        <code className="bg-gray-100 rounded px-2 py-1">{children}</code>
                    ),
                    pre: ({ children }) => (
                        <pre className="bg-gray-100 rounded-lg p-4 overflow-x-auto my-4">
                            {children}
                        </pre>
                    ),
                }}
            >
                {content.replace(/^>\s?(.*)$/gm, (match, p1) => `"${p1.trim()}"`)}
            </ReactMarkdown>
        </div>
    </TabsContent>
</Tabs> */}


