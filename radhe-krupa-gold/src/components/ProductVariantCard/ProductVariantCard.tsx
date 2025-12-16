// ProductVariantCard.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ShoppingBag } from "lucide-react";
import styles from "./ProductVariantCard.module.scss";
import { CoinProduct, WeightVariant } from "./Mock";

export default function ProductVariantCard({ data }: { data: CoinProduct }) {

    // TS error fixed by the updated mock.ts
    const initialVariant = data.variants.find(v => v.weight === data.initialWeight) || data.variants[0];
    const [selectedVariant, setSelectedVariant] = useState<WeightVariant>(initialVariant);
    const [hasSelected, setHasSelected] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Effect to close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (variant: WeightVariant) => {
        setSelectedVariant(variant);
        setHasSelected(true);
        setIsOpen(false);
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img
                    src={data.imageUrl}
                    alt={data.title + " gold coin"}
                    className={styles.productImage}
                />
            </div>

            <div className={styles.actions}>
                <div
                    className={styles.dropdownWrapper}
                    ref={dropdownRef}
                >
                    <button
                        type="button"
                        className={styles.dropdownBtn}
                        onClick={toggleDropdown}
                    >
                        {selectedVariant.weight}
                        <ChevronDown
                            size={16}
                            style={{
                                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: '0.2s'
                            }}
                        />
                    </button>

                    {isOpen && (
                        <ul className={styles.dropdownMenu}>
                            {data.variants.map((variant) => (
                                <li
                                    key={variant.weight}
                                    onClick={() => handleSelect(variant)}
                                >
                                    {variant.weight}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <button type="button" className={styles.cartBtn}>
                    <ShoppingBag color="white" size={20} />
                </button>
            </div>

            <div className={styles.details}>
                <h3>{data.title}</h3>
                <p className={styles.price}>
                    {hasSelected ? selectedVariant.price : data.priceRange}
                </p>
                {/* ✅ ADDED: Purity line at the bottom */}
                <p className={styles.purity}>
                    999.9 Purity
                </p>
            </div>
        </div>
    );
}