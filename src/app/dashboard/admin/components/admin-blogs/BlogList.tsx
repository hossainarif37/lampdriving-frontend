'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, Edit, Trash } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Blog {
    id: string
    title: string
    author: string
    excerpt: string
    image: string
    date: string
}

// Dummy API functions
const fetchBlogs = async (): Promise<Blog[]> => {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 500))
    return [
        {
            id: '1',
            title: 'How to Convert Your International Driving Licence In Australia',
            author: 'EricGomez',
            excerpt: 'If you have recently moved to Australia, you might be wondering whether or not your international licence is valid...',
            image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-R2Es6GC9NK1zfT9ifyCKmxTlm2Jou5.png',
            date: '31 Oct 2024'
        },
        {
            id: '2',
            title: 'Understanding Australian Road Rules',
            author: 'EricGomez',
            excerpt: 'A comprehensive guide to Australian road rules and regulations...',
            image: '/placeholder.svg?height=400&width=600',
            date: '15 Nov 2024'
        }
    ]
}

const deleteBlog = async (id: string): Promise<void> => {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 500))
    console.log(`Blog with id ${id} deleted`)
}

export function BlogList() {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchBlogs().then(setBlogs)
    }, [])

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(search.toLowerCase())
    )

    const handleDelete = async (id: string) => {
        await deleteBlog(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
    }

    return (
        <div className="space-y-6">
            <div className="relative mb-6 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                    placeholder="Search blogs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                />
            </div>

            <div className="space-y-4">
                {filteredBlogs.map((blog) => (
                    <Card key={blog.id} className="p-4">
                        <article className="space-y-4">
                            <Link href={`/blog/${blog.id}`}>
                                <h2 className="text-2xl font-bold hover:text-blue-600 cursor-pointer">
                                    {blog.title}
                                </h2>
                            </Link>
                            <div className="text-sm text-gray-500">
                                by {blog.author} • Last updated {blog.date}
                            </div>
                            {/* {blog.image && (
                                <Image
                                    src={blog.image || "/placeholder.svg"}
                                    alt={blog.title}
                                    width={200}
                                    height={200}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            )} */}
                            <p className="text-gray-600">{blog.excerpt}</p>
                            <div className="flex gap-2">
                                <Button variant="outline" className="flex items-center gap-2">
                                    <Edit className="h-4 w-4" />
                                    Edit
                                </Button>
                                <Button variant="destructive" className="flex items-center gap-2" onClick={() => handleDelete(blog.id)}>
                                    <Trash className="h-4 w-4" />
                                    Delete
                                </Button>
                            </div>
                        </article>
                    </Card>
                ))}
            </div>
        </div>
    )
}

