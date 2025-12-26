'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import PostCard from '@/components/PostCard';
import { Post } from '@/types';

export default function BlogList({ allPosts }: { allPosts: Post[] }) {
    const selectedCategoryId = useSelector((state: RootState) => state.category.selectedId);

    // DEBUG: Check what's happening in your browser console
    console.log("Selected Category ID:", selectedCategoryId);
    console.log("Available Posts:", allPosts);

    const filteredPosts = selectedCategoryId
        ? allPosts.filter((post) => {
            // WordPress categories is an array, e.g., [1, 5, 12]
            // We check if our selected ID is inside that array
            return post.categories.includes(Number(selectedCategoryId));
        })
        : allPosts;

    if (!allPosts || allPosts.length === 0) {
        return <div className="text-center py-20 text-gray-500">No blogs found in WordPress. Create some posts!</div>;
    }

    if (filteredPosts.length === 0) {
        return (
            <div className="text-center py-20 border-2 border-dashed rounded-xl">
                <p className="text-gray-500 text-lg">No posts found in this category.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="text-blue-600 underline mt-2"
                >
                    Clear Filters
                </button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}