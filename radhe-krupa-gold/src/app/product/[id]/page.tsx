// app/product/[id]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import { MOCK_PRODUCTS } from "@/data/mock";
import ProductDetails from "@/components/Products/ProductDetails/ProductDetails";

// This function tells Next.js to create the folders 1, 2, 3... that we see in your cPanel
export async function generateStaticParams() {
    return MOCK_PRODUCTS.map((product) => ({
        id: String(product.id),
    }));
}

// In Next.js 15+, params is a Promise
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const product = MOCK_PRODUCTS.find((p) => String(p.id) === String(id));

    if (!product) {
        notFound();
    }

    return (
        <div style={{ padding: "20px" }}>
            <ProductDetails product={product} />
        </div>
    );
}