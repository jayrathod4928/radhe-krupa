import { Post, Category } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

// Sample Data for UI Testing / Fallback
const MOCK_POSTS: Post[] = [
    {
        id: 101,
        slug: 'getting-started-with-nextjs',
        title: { rendered: 'Mastering Next.js 15: The Future of React' },
        excerpt: { rendered: '<p>Dive deep into Server Components, Streaming, and the new dynamic APIs in Next.js 15.</p>' },
        content: { rendered: `
            <p>Next.js 15 marks a significant milestone in the evolution of web development. By leveraging React Server Components (RSC) by default, it allows developers to build applications that ship zero JavaScript to the client. This architectural shift not only improves SEO but also drastically enhances the user experience on slower devices.</p>
            <p>One of the most powerful features of this new era is the App Router. Unlike the traditional Pages Router, the App Router supports nested layouts and specialized loading states. This means you can create complex, dashboard-like interfaces where only parts of the page re-render, keeping the rest of the UI stable and responsive.</p>
            <p>Furthermore, the introduction of partial prerendering (PPR) is a game-changer. It allows us to combine static and dynamic content on the same page seamlessly. Imagine a blog post that loads instantly from a CDN, while the comment section or personalized user profile in the header remains dynamic and real-time. This is the power of modern Next.js.</p>
        ` },
        date: new Date().toISOString(),
        categories: [1],
        _embedded: {
            'wp:featuredmedia': [{ source_url: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=1200', alt_text: 'Nextjs' }],
            author: [{ name: 'Alex Rivera' }]
        }
    },
    {
        id: 102,
        slug: 'headless-wordpress-explained',
        title: { rendered: 'Why Headless WordPress is Winning in 2025' },
        excerpt: { rendered: '<p>Learn why separating your backend from your frontend is the best move for high-performance sites.</p>' },
        content: { rendered: `
            <p>The traditional WordPress experience is monolithic—the backend and the frontend are glued together. While this is easy for beginners, it often leads to "plugin bloat" and slow page speeds. Headless WordPress solves this by using WordPress solely as a content management system (CMS) and fetching data via the REST API or GraphQL.</p>
            <p>By decoupling the frontend, developers can use modern frameworks like Next.js, Vue, or Svelte to build the user interface. This separation of concerns allows for a much more secure environment, as the WordPress admin dashboard can be hidden behind a firewall, away from the public-facing website.</p>
            <p>Additionally, a headless setup enables "omnichannel" content delivery. Since your content is just data in an API, you can display that same blog post on your website, a mobile app, and even a smart watch simultaneously. It provides the flexibility that modern digital brands need to scale across multiple platforms without duplicating their work.</p>
        ` },
        date: new Date().toISOString(),
        categories: [2],
        _embedded: {
            'wp:featuredmedia': [{ source_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200', alt_text: 'Coding' }],
            author: [{ name: 'Sarah Chen' }]
        }
    },
    {
        id: 103,
        slug: 'the-rise-of-ai-design',
        title: { rendered: 'How AI is Transforming UI/UX Design' },
        excerpt: { rendered: '<p>Artificial Intelligence is no longer a gimmick; it is actively reshaping how we build user interfaces.</p>' },
        content: { rendered: `
            <p>Generative AI has moved beyond simple text prompts. Today, designers are using AI to generate high-fidelity wireframes, suggest color palettes based on brand psychology, and even write initial CSS components. This shift is allowing designers to focus more on strategy and user research rather than repetitive pixel-pushing.</p>
            <p>Tools like Figma and Adobe are integrating AI to automate the creation of design systems. For example, an AI can now analyze a website and automatically generate a dark mode version or a mobile-responsive layout in seconds. This speed allows for more rapid prototyping and user testing than ever before in the history of design.</p>
            <p>However, the human element remains irreplaceable. AI can suggest patterns, but it cannot understand human emotion or the nuanced cultural context of a specific audience. The future of UI/UX is not "AI instead of designers," but "designers empowered by AI" to create more accessible and inclusive digital experiences for everyone.</p>
        ` },
        date: new Date().toISOString(),
        categories: [1],
        _embedded: {
            'wp:featuredmedia': [{ source_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200', alt_text: 'AI Design' }],
            author: [{ name: 'Marcus Thorne' }]
        }
    },
    {
        id: 104,
        slug: 'typescript-best-practices',
        title: { rendered: 'TypeScript Best Practices for Large Scale Apps' },
        excerpt: { rendered: '<p>Avoid "any" and start writing cleaner, type-safe code that scales with your team.</p>' },
        content: { rendered: `
            <p>TypeScript has become the industry standard for professional web development. The primary benefit is catching errors at compile-time rather than runtime, which saves countless hours of debugging. In large teams, TypeScript acts as a form of documentation, making it clear what data shapes are expected across the application.</p>
            <p>One of the golden rules is to avoid the "any" type at all costs. Using "any" effectively turns off TypeScript, defeating the purpose of the language. Instead, leverage "unknown" for external data or use Generics to create flexible, reusable components that maintain strict type safety across different data structures.</p>
            <p>Utility types like Pick, Omit, and Partial are also essential for keeping your code DRY (Don't Repeat Yourself). By creating a base Interface and then deriving specialized types from it, you ensure that a change in the core data model automatically updates throughout your entire codebase, preventing stale or mismatched types.</p>
        ` },
        date: new Date().toISOString(),
        categories: [2],
        _embedded: {
            'wp:featuredmedia': [{ source_url: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=1200', alt_text: 'TypeScript' }],
            author: [{ name: 'Jordan Lee' }]
        }
    },
    {
        id: 105,
        slug: 'sustainable-web-design',
        title: { rendered: 'The Importance of Sustainable Web Design' },
        excerpt: { rendered: '<p>Digital carbon footprints are real. Learn how to build eco-friendly websites by optimizing code.</p>' },
        content: { rendered: `
            <p>Every byte of data sent over the internet requires energy to move and store. As the web grows, its environmental impact increases. Sustainable web design is a movement focused on reducing the energy consumption of websites by optimizing images, minifying code, and using efficient hosting providers.</p>
            <p>One major culprit of energy waste is "bloated" JavaScript and oversized images. By using modern formats like WebP or AVIF and implementing lazy-loading, we can significantly reduce the amount of data transferred to the user. This doesn't just help the planet; it also results in much faster load times and better SEO rankings.</p>
            <p>Choosing a green hosting provider that runs on renewable energy is another critical step. When you combine lean code with eco-friendly infrastructure, you create a "Low Carbon" website. In a world where sustainability is becoming a priority for consumers, building green is not just ethical—it is a competitive advantage.</p>
        ` },
        date: new Date().toISOString(),
        categories: [1],
        _embedded: {
            'wp:featuredmedia': [{ source_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200', alt_text: 'Sustainability' }],
            author: [{ name: 'Elena Green' }]
        }
    }
];

export async function getPosts(): Promise<Post[]> {
    try {
        const res = await fetch(`${BASE_URL}/posts?_embed`, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error();
        return await res.json();
    } catch (error) {
        console.warn("Using Mock Posts because API is unreachable");
        return MOCK_POSTS; // Returns the data above if WordPress is down
    }
}

export async function getCategories(): Promise<Category[]> {
    try {
        const res = await fetch(`${BASE_URL}/categories`, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error();
        return await res.json();
    } catch (error) {
        return [
            { id: 1, name: 'Technology', slug: 'tech' },
            { id: 2, name: 'Development', slug: 'dev' }
        ];
    }
}

export async function getPost(slug: string): Promise<Post | null> {
    try {
        const res = await fetch(`${BASE_URL}/posts?slug=${slug}&_embed`);
        const posts = await res.json();
        return posts[0] || MOCK_POSTS.find(p => p.slug === slug) || null;
    } catch {
        return MOCK_POSTS.find(p => p.slug === slug) || null;
    }
}