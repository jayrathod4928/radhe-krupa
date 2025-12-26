export interface Post {
    id: number;
    slug: string;
    title: { rendered: string };
    excerpt: { rendered: string };
    content: { rendered: string };
    date: string;
    categories: number[];
    _embedded?: {
        'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
        'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
        author?: Array<{ name: string }>;
    };
}

export interface Category {
    id: number;
    name: string;
    slug: string;
}