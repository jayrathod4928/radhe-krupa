"use client";

import React, { useState } from "react";
import { ChevronDown, ShoppingBag } from "lucide-react";
import styles from "./CoinCard.module.scss";
import { CoinProduct, WeightVariant } from "./mock";

export default function CoinCard({ data }: { data: CoinProduct }) {
    // Default to the first variant (50mg) for the dropdown text
    const [selectedVariant, setSelectedVariant] = useState<WeightVariant>(data.variants[0]);

    // New state to track if user has actually chosen something
    const [hasSelected, setHasSelected] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (variant: WeightVariant) => {
        setSelectedVariant(variant);
        setHasSelected(true); // User made a choice, switch to specific price
        setIsOpen(false);
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <div className={styles.placeholder}>
                    <div className={styles.circle}></div>
                    <span>{data.isCertificate ? "CERTIFICATE" : "EARTH MINT"}</span>
                </div>
            </div>

            <div className={styles.actions}>
                <div className={styles.dropdownWrapper}>
                    <button
                        type="button"
                        className={styles.dropdownBtn}
                        onClick={toggleDropdown}
                    >
                        {selectedVariant.weight}
                        <ChevronDown
                            size={16}
                            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.2s' }}
                        />
                    </button>

                    {isOpen && (
                        <ul className={styles.dropdownMenu}>
                            {data.variants.map((variant) => (
                                <li key={variant.weight} onClick={() => handleSelect(variant)}>
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
                {/* LOGIC: Show Range if not touched, Specific Price if touched */}
                <p className={styles.price}>
                    {hasSelected ? selectedVariant.price : data.priceRange}
                </p>
            </div>
        </div>
    );
}