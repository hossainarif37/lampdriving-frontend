import { FC } from 'react';
import Image from 'next/image';
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface MarkdownPreviewProps {
    content: string;
    title: string;
    author: string;
}

const MarkdownPreview: FC<MarkdownPreviewProps> = ({ content, title, author }) => {
    return (
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
    );
};

export default MarkdownPreview;