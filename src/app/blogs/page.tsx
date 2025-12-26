import { Metadata } from 'next';
import { getPosts, getCategories } from '@/lib/wordpress';
import CategoryFilter from '@/components/CategoryFilter';
import BlogList from '@/components/blog/BlogList';

// SEO Meta Tags for the listing page
export const metadata: Metadata = {
    title: 'Our Blog | Latest Articles',
    description: 'Explore our latest stories, news, and insights filtered by category.',
};

export default async function BlogPage() {
    // Fetching data on the server (ISR/SSG)
    // This ensures the data is available immediately for SEO
    const [posts, categories] = await Promise.all([getPosts(), getCategories()]);

    return (
        <main className="container mx-auto p-6 min-h-screen">
            <header className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                    Our Blog
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Stay updated with our latest news and expert insights. Use the filters below to find specific topics.
                </p>
            </header>

            {/* 1. Category Filter (Updates Redux State) */}
            <section className="mb-8">
                <CategoryFilter categories={categories} />
            </section>

            {/* 2. Blog List (Reads Redux State & Filters 'posts') */}
            <section>
                <BlogList allPosts={posts} />
            </section>
        </main>
    );
}