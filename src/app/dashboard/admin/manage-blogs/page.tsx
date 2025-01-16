'use client'
import { FC } from 'react';

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, List } from 'lucide-react'
import { BlogList } from '../components/admin-blogs/BlogList';
import { BlogEditor } from '../components/admin-blogs/BlogEditor';
const BlogPage: FC = () => {
    const [activeView, setActiveView] = useState<'list' | 'create'>('list')
    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex-1 p-8 overflow-auto">
                <div className="max-w-8xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6 text-primary/90">Blog Management</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className='text-primary/90'>Manage Blogs</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-4 text-accent">View, edit, and delete existing blog posts.</p>
                                <Button
                                    variant={activeView === 'list' ? "default" : "outline"}
                                    onClick={() => setActiveView('list')}
                                    className="w-full"
                                >
                                    <List className="mr-2 h-4 w-4 " /> View All Blogs
                                </Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className='text-primary/90'>Create New Blog</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-4">Write and publish a new blog post.</p>
                                <Button
                                    variant={activeView === 'create' ? "default" : "outline"}
                                    onClick={() => setActiveView('create')}
                                    className="w-full"
                                >
                                    <PlusCircle className="mr-2 h-4 w-4" /> Create New Blog
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {activeView === 'list' ? (
                        <Card>
                            <CardHeader>
                                <CardTitle>All Blogs</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <BlogList />
                            </CardContent>
                        </Card>
                    ) : (
                        <Card>
                            <CardHeader>
                                <CardTitle>Create New Blog</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <BlogEditor />
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;