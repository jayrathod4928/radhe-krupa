"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ShoppingBag } from "lucide-react";
import styles from "./CoinCard.module.scss";
import { useCart } from "@/context/CartContext";
import { CoinProduct, WeightVariant } from "@/data/mock";
import { motion } from "framer-motion"; // ✅ ADD THIS

export default function CoinCard({ data }: { data: CoinProduct }) {
    // Access the first variant and first image from the arrays
    const [selectedVariant, setSelectedVariant] = useState<WeightVariant>(data.variants[0]);
    const [hasSelected, setHasSelected] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { addToCart } = useCart();


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

    return (
        <div className={styles.card}>
            <Link href={`/product/${data.id}`} className={styles.linkWrapper}>
                <div className={styles.imageContainer}>
                    {/* FIXED: Use data.imageUrls[0] instead of data.imageUrl */}
                    <Image
                        src={data.imageUrls[0]}
                        alt={data.title}
                        fill
                        className={styles.productImage}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: "contain" }}
                    />
                    {data.isCertificate && (
                        <span className={styles.badge}>CERTIFICATE</span>
                    )}
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
                    onClick={(e) => {
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
                    }}
                >
                    <ShoppingBag color="white" size={20} />
                </motion.button>
            </div>

            <Link href={`/product/${data.id}`} className={styles.linkWrapper}>
                <div className={styles.details}>
                    <h3>{data.title}</h3>
                    <p className={styles.price}>
                        {hasSelected ? selectedVariant.price : data.priceRange}
                    </p>
                </div>
            </Link>
        </div>
    );
}