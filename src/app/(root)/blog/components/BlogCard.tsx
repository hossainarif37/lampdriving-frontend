import { FC } from 'react';
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BlogPost } from '@/lib/dummyBlogData';
import img from "@/assets/about-page-image/statement-v1-1.jpg"


interface BlogCardProps {
    post: BlogPost
}
const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const BlogCard: FC<BlogCardProps> = ({ post }) => {
    const slug = generateSlug(post.title); // Generate slug from the title
    return (
        <Card>
            <CardContent className="p-6 gradient-to-b">
                <div className="flex flex-col justify-between space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold text-primary/90">{post.title}</h2>
                        <div className="flex items-center gap-2 text-sm text-accent">
                            <span>by {post.author}</span>
                            <span>•</span>
                            <span>Last updated {post.date}</span>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row justify-between gap-8'>
                        <div className="space-y-4">
                            <p className="text-primary/80">{post.excerpt}</p>
                            <Button variant="default" className="w-fit bg-primary text-white" asChild>
                                {/* <Link href={`/blog/${post.id}`}>Continue Reading</Link> */}
                                <Link href={`/blog/${post.id}-${slug}`}>Continue Reading</Link>
                            </Button>
                        </div>
                        <div className="relative w-full rounded-md overflow-hidden">
                            <Image
                                src={img}
                                alt={post.title}
                                fill
                                className="object-cover object-center"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default BlogCard;