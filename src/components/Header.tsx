'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Blog', href: '/blogs' },
        { name: 'About', href: '/about' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">

                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:rotate-6 transition-transform">
                        W
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900">
                        WP<span className="text-blue-600">Flow</span>
                    </span>
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                                    isActive ? 'text-blue-600' : 'text-gray-600'
                                }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Action Button */}
                <div className="flex items-center gap-4">
                    <button className="hidden sm:block text-sm font-semibold text-gray-600 hover:text-gray-900">
                        Sign In
                    </button>
                    <button className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-gray-200">
                        Get Started
                    </button>
                </div>
            </div>
        </header>
    );
}