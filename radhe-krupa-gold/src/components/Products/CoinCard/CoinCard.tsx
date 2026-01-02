"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ShoppingBag } from "lucide-react";
import styles from "./CoinCard.module.scss";
import { useCart } from "@/context/CartContext";
import { CoinProduct, WeightVariant } from "@/data/mock";
import { motion } from "framer-motion";
import Toast from "@/components/Toast/Toast";
// ✅ This is your universal hover image
import hoverImage from "@/components/Images/MaroonCardBack.png";

export default function CoinCard({ data }: { data: CoinProduct }) {
    const [selectedVariant, setSelectedVariant] = useState<WeightVariant>(data.variants[0]);
    const [hasSelected, setHasSelected] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const { addToCart } = useCart();

    // ✅ FORCE HOVER IMAGE EVERYWHERE
    // If hovered, always show the imported 'hoverImage'.
    // Otherwise, show the first image from the product data.
    const currentImage = isHovered ? hoverImage : data.imageUrls[0];

    const handleSelect = (e: React.MouseEvent, variant: WeightVariant) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedVariant(variant);
        setHasSelected(true);
        setIsOpen(false);
    };

    const toggleDropdown = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        addToCart({
            id: data.id,
            title: data.title,
            image: data.imageUrls[0],
            weight: selectedVariant.weight,
            price: selectedVariant.price,
            quantity: 1,
        });

        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className={styles.card}>
            <Toast
                isVisible={showToast}
                message={`${data.title} added to cart!`}
                onClose={() => setShowToast(false)}
            />

            <Link
                href={`/product/${data.id}`}
                className={styles.linkWrapper}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className={styles.imageContainer}>
                    <Image
                        src={currentImage}
                        alt={data.title}
                        fill
                        className={styles.productImage}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: "contain" }}
                        // Added priority for better LCP if many cards load at once
                        priority={false}
                    />
                </div>
            </Link>

            <div className={styles.actions}>
                <div className={styles.dropdownWrapper}>
                    <button
                        type="button"
                        className={styles.dropdownBtn}
                        onClick={toggleDropdown}
                    >
                        {selectedVariant.weight}
                        <ChevronDown size={16} />
                    </button>

                    {isOpen && (
                        <ul className={styles.dropdownMenu}>
                            {data.variants.map((variant) => (
                                <li
                                    key={variant.weight}
                                    onClick={(e) => handleSelect(e, variant)}
                                >
                                    {variant.weight}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <motion.button
                    className={styles.cartBtn}
                    whileTap={{ scale: 0.85 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    onClick={handleAddToCart}
                >
                    <ShoppingBag color="white" size={20} />
                </motion.button>
            </div>

            <Link href={`/product/${data.id}`} className={styles.linkWrapper}>
                <div className={styles.details}>
                    <h3>{data.title}</h3>
                    <p className={styles.price}>
                        {hasSelected ? (
                            `₹${selectedVariant.price.toLocaleString("en-IN")}`
                        ) : (
                            data.priceRange
                        )}
                    </p>
                </div>
            </Link>
        </div>
    );
}