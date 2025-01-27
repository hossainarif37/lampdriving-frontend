import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/dummyBlogData";
import img from "@/assets/about-page-image/statement-v1-1.jpg";

type DynamicRouteParams = {
    id: string;
    category?: string;
    title?: string;
    author?: string;
    date?: string;
};

interface PageProps {
    params: Promise<DynamicRouteParams>;
}

// Utility function to extract the ID from the dynamic route
const extractIdFromSlug = (slug: string | undefined): string | undefined => {
    if (!slug) return undefined;
    const parts = slug?.split("-");
    return parts ? parts[0] : undefined;
};

const BlogDetails: FC<PageProps> = async ({ params }) => {
    const resolvedParams = await params;
    const id = extractIdFromSlug(resolvedParams.id);
    const post = blogPosts.find((p) => p.id === id);

    if (!post) {
        notFound();
    }

    return (
        <article className="">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Meta Information */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Link
                                href={`/${post.category}`}
                                className="text-red-400 font-bold underline"
                            >
                                {post.category}
                            </Link>
                            <span className="text-muted-foreground">/</span>
                            <span className="text-muted-foreground">{post.title}</span>
                        </div>
                        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>by {post.author}</span>
                            <span>•</span>
                            <span>Last updated {post.date}</span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="relative flex md:block flex-col">
                        {/* Image */}
                        <Image
                            src={img}
                            alt="blog-image"
                            className="float-right md:ml-4 mb-4 md:w-1/3 rounded-md shadow-md md:h-36 h-44 object-cover object-center"
                        />

                        {/* Content Paragraphs */}
                        {post.content.split("\n\n").map((paragraph, index) => (
                            <p key={index} className="mb-4 text-gray-600 leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogDetails;
