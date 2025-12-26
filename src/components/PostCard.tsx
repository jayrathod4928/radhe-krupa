import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types';

export default function PostCard({ post }: { post: Post }) {
    // 1. Extract the featured image URL from the WP _embedded object
    // Falling back to a placeholder if no image exists
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg';

    // 2. Extract Alt text for accessibility
    const altText = post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || post.title.rendered;

    return (
        /* 3. Link points to the dynamic [slug] route */
        <Link href={`/blogs/${post.slug}`} className="group">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">

                {/* Image Container */}
                <div className="relative h-56 w-full bg-gray-100">
                    <Image
                        src={featuredImage}
                        alt={altText}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Content Container */}
                <div className="p-5 flex flex-col flex-grow">
                    {/* Date Formatting */}
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-2">
                        {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </p>

                    {/* Post Title - Using dangerouslySetInnerHTML to parse WP entities like &amp; */}
                    <h2
                        className="text-xl font-bold mb-3 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />

                    {/* Excerpt - Limited to 3 lines for grid consistency */}
                    <div
                        className="text-gray-600 text-sm line-clamp-3 mb-4"
                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />

                    {/* Action Link */}
                    <div className="mt-auto text-blue-600 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read More <span>→</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}