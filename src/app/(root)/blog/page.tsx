import { FC } from 'react';
import { Facebook, Instagram } from "lucide-react"

import { Button } from "@/components/ui/button"
import { blogPosts } from '@/lib/dummyBlogData';
import BlogCard from './components/BlogCard';

const blogPage: FC = () => {
    return (
        <div>
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl text-primary font-bold">Blog</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-muted-foreground">Follow Lamp driving on</span>
                        <Button variant="ghost" size="icon" asChild>
                            <a href="#" aria-label="Facebook">
                                <Facebook className="h-5 w-5" />
                            </a>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                            <a href="#" aria-label="Instagram">
                                <Instagram className="h-5 w-5" />
                            </a>
                        </Button>
                    </div>
                </div>
                <div className="space-y-6">
                    {blogPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default blogPage;