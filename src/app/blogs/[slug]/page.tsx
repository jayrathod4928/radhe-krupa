// app/blogs/[slug]/page.tsx

import { getPost } from '@/lib/wordpress';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return { title: 'Post Not Found' };

    return {
        title: `${post.title.rendered} | My Blog`,
        description: post.excerpt.rendered.replace(/<[^>]*>?/gm, '').slice(0, 160),
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const authorName = post._embedded?.author?.[0]?.name || "Editorial Team";

    return (
        <article className="min-h-screen bg-gray-50/50 pb-20">
            {/* --- PREMIUM HEADER SECTION --- */}
            <header className="relative pt-16 pb-12 overflow-hidden bg-white border-b border-gray-200">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400 blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400 blur-[120px]" />
                </div>

                <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center text-sm font-medium text-blue-600 mb-6 hover:gap-2 transition-all"
                    >
                        ← Back to all stories
                    </Link>

                    <h1
                        className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />

                    <div className="flex items-center justify-center gap-4 text-gray-600">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                                {authorName[0]}
                            </div>
                            <span className="font-medium">{authorName}</span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <time className="text-sm">
                            {new Date(post.date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </time>
                    </div>
                </div>
            </header>

            {/* --- HERO IMAGE --- */}
            <div className="container mx-auto px-4 max-w-5xl -mt-10 mb-16 relative z-20">
                {featuredImage ? (
                    <div className="relative aspect-[16/9] w-full shadow-2xl rounded-3xl overflow-hidden border-4 border-white">
                        <Image
                            src={featuredImage}
                            alt={post.title.rendered}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                ) : (
                    <div className="h-24" /> // Spacer if no image
                )}
            </div>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="container mx-auto px-4 max-w-3xl">
                <div
                    className="prose prose-lg md:prose-xl prose-slate max-w-none
                    prose-headings:text-gray-900 prose-headings:font-bold
                    prose-p:text-gray-700 prose-p:leading-relaxed
                    prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                    prose-img:rounded-2xl prose-img:shadow-md
                    prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg"
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />

                {/* --- ARTICLE FOOTER --- */}
                <footer className="mt-16 pt-8 border-t border-gray-200">
                    <div className="bg-gray-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-xl font-bold mb-2">Enjoyed this article?</h3>
                            <p className="text-gray-400">Stay updated with our latest insights and tech news.</p>
                        </div>
                        <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-blue-500 hover:text-white transition-colors">
                            Subscribe
                        </button>
                    </div>
                </footer>
            </div>
        </article>
    );
}