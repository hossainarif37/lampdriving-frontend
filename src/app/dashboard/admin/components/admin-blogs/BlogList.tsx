'use client'

import { FC } from 'react';
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import blogImg from "@/assets/dummy-images/car2.jpg"

interface Blog {
  id: string
  title: string
  author: string
  excerpt: string
  image: string
  date: string
}

const DUMMY_BLOGS: Blog[] = [
  {
    id: '1',
    title: 'How to Convert Your International Driving Licence In Australia',
    author: 'LampDriving',
    excerpt: 'The process for transferring an international driver\'s licence to an Australian licence varies by state and can be confusing. Here we break it down so you know exactly what you need and the steps you need to take to get your Australian licence.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FltkzqzMcnyH3LCrAdGu9bHMfPKv5i.png',
    date: '31 Oct 2024'
  },
  {
    id: '2',
    title: 'Understanding Australian Road Rules',
    author: 'LampDriving',
    excerpt: 'A comprehensive guide to Australian road rules and regulations that every new driver needs to know...',
    image: '/placeholder.svg?height=400&width=600',
    date: '15 Nov 2024'
  }
]


const BlogList: FC = () => {
  const [search, setSearch] = useState('')

  const filteredBlogs = DUMMY_BLOGS.filter(blog =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    // Add your delete logic here
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <div className="relative max-w-md mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-6">
        {filteredBlogs.map((blog) => (
          <Card key={blog.id} className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/3 p-6">
                <div className="space-y-4">
                  <div>
                    <Link href={`/blog/${blog.id}`}>
                      <h2 className="text-2xl font-bold">
                        {blog.title}
                      </h2>
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">
                      by {blog.author}
                    </p>
                  </div>
                  <p className="text-gray-600 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center gap-4 pt-2">
                    <Link href={`/blog/${blog.id}`}>
                      <Button className="bg-primary">
                        details
                      </Button>
                    </Link>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 text-red-500 hover:text-red-600"
                        onClick={() => handleDelete(blog.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/3">
                <Image
                  src={blogImg || "/placeholder.svg"}
                  alt={blog.title}
                  className="h-full w-full object-cover"
                  style={{ maxHeight: '300px' }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
};

export default BlogList;

