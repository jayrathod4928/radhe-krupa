import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
      <div className="flex flex-col min-h-screen">
        {/* 1. Hero Section */}
        <section className="bg-slate-900 text-white py-20 px-4 text-center">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
              Insights for the <span className="text-blue-400">Modern Developer.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
              A high-performance blog module built with Next.js 14, Headless WordPress,
              and Redux for state-of-the-art content delivery.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                  href="/blogs"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2"
              >
                Explore Articles <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* 2. Feature Section (Brief Overview) */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">01</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Performance</h3>
              <p className="text-gray-600">Static generation ensures lightning-fast load times and SEO dominance.</p>
            </div>
            <div>
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-xl">02</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Global State</h3>
              <p className="text-gray-600">Categories are managed via Redux for a seamless filtering experience.</p>
            </div>
            <div>
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-xl">03</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Headless CMS</h3>
              <p className="text-gray-600">Decoupled architecture using WordPress as a powerful backend.</p>
            </div>
          </div>
        </section>

        {/* 3. Contact Form Section */}
        <section id="contact" className="py-20 bg-slate-50 border-t">
          <div className="container mx-auto px-4 text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-600">Have questions? Fill out the form below and we will get back to you.</p>
          </div>
          <ContactForm />
        </section>

        {/* Footer */}
        <footer className="mt-auto py-10 border-t text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Next.js Headless WP Blog. Built with Typescript & Tailwind.
        </footer>
      </div>
  );
}