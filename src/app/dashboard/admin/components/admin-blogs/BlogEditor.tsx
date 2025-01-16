'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bold, Italic, Strikethrough, Underline, Quote, List, ListOrdered, LinkIcon, ImageIcon, Code, Video } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from 'next/image'

export function BlogEditor() {
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            insertMarkdown('image', `![${file.name}](${imageUrl})`)
        }
    }

    const insertMarkdown = (type: string, customText?: string) => {
        const textarea = document.querySelector('textarea')
        const start = textarea?.selectionStart || 0
        const end = textarea?.selectionEnd || 0
        const selectedText = content.substring(start, end)

        const markdownSyntax: { [key: string]: string } = {
            bold: `**${selectedText || 'bold text'}**`,
            italic: `*${selectedText || 'italic text'}*`,
            strikethrough: `~~${selectedText || 'strikethrough text'}~~`,
            underline: `<u>${selectedText || 'underlined text'}</u>`,
            quote: `> ${selectedText || 'quoted text'}`,
            bulletList: `\n- ${selectedText || 'list item'}`,
            numberList: `\n1. ${selectedText || 'list item'}`,
            link: `[${selectedText || 'link text'}](url)`,
            image: customText || `![image description](image url)`,
            code: `\`\`\`\n${selectedText || 'code block'}\n\`\`\``,
            video: `<video width="100%" controls>\n  <source src="${selectedText || 'video url'}" type="video/mp4">\n  Your browser does not support the video tag.\n</video>`,
        }

        const newContent =
            content.substring(0, start) +
            markdownSyntax[type] +
            content.substring(end)

        setContent(newContent)

        // Reset cursor position after content update
        setTimeout(() => {
            textarea?.focus()
            const newCursorPos = start + markdownSyntax[type].length
            textarea?.setSelectionRange(newCursorPos, newCursorPos)
        }, 0)
    }

    return (
        <div className="w-full mx-auto p-4 space-y-4">
            <div className="space-y-2">
                <Label htmlFor="title">Blog Title</Label>
                <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter blog title"
                    className="text-2xl font-bold"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Enter author name"
                />
            </div>

            <TooltipProvider>
                <div className="flex flex-wrap gap-2 p-2 bg-gray-100 rounded-md">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => insertMarkdown('bold')}
                            >
                                <Bold className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-secondary text-light">Bold</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => insertMarkdown('italic')}
                            >
                                <Italic className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Italic</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => insertMarkdown('strikethrough')}
                            >
                                <Strikethrough className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Strikethrough</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => insertMarkdown('underline')}
                            >
                                <Underline className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Underline</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => insertMarkdown('quote')}
                            >
                                <Quote className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Quote</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => insertMarkdown('bulletList')}
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Bullet List</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => insertMarkdown('numberList')}
                            >
                                <ListOrdered className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Numbered List</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => insertMarkdown('link')}
                            >
                                <LinkIcon className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Link</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative"
                            >
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                <ImageIcon className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Image</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => insertMarkdown('code')}
                            >
                                <Code className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Code Block</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => insertMarkdown('video')}
                            >
                                <Video className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Video</TooltipContent>
                    </Tooltip>
                </div>
            </TooltipProvider>

            <Tabs defaultValue="write" className="mt-4">
                <TabsList>
                    <TabsTrigger value="write">Write</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
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
                                h1: ({ children }) => <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>,
                                h2: ({ children }) => <h2 className="text-xl font-bold mt-5 mb-3">{children}</h2>,
                                p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
                                blockquote: ({ children }) => (
                                    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
                                        {children}
                                    </blockquote>
                                ),
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
                                video: ({ src, children }) => (
                                    <video width="100%" controls className="my-4 rounded-lg">
                                        <source src={src} type="video/mp4" />
                                        {children}
                                    </video>
                                ),
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                </TabsContent>
            </Tabs>

            <Button className="w-md mx-auto mt-4">
                Publish Blog
            </Button>
        </div>
    )
}

