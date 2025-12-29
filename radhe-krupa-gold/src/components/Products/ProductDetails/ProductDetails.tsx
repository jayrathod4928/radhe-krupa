"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
    FaChevronDown,
    FaLock,
    FaWhatsapp,
    FaFacebookF,
    FaPinterestP,
    FaEnvelope,
    FaLinkedinIn,
    FaInstagram
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
    ChevronLeft,
    ChevronRight,
    Share2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ProductDetails.module.scss";
import { CoinProduct, WeightVariant } from "@/data/mock";
import ReviewSummary from "./ReviewSummary/ReviewSummary";
import { useCart } from "@/context/CartContext";
import Toast from "@/components/Toast/Toast";
import {SiThreads} from "react-icons/si";

export default function ProductDetails({ product }: { product: CoinProduct }) {
    const [selectedVariant, setSelectedVariant] = useState<WeightVariant>(
        product.variants[0]
    );
    const [activeIndex, setActiveIndex] = useState(0);
    const [showDesc, setShowDesc] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showShare, setShowShare] = useState(false); // ✅ Share State
    const [qty, setQty] = useState(1);

    const { addToCart } = useCart();

    // Dynamically get the URL for sharing
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareTitle = encodeURIComponent(`Check out this ${product.title}`);

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            title: product.title,
            image: product.imageUrls[0],
            weight: selectedVariant.weight,
            price: selectedVariant.price,
            quantity: qty,
        });

        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const scrollRef = useRef<HTMLDivElement>(null);
    const showThumbNav = product.imageUrls.length > 5;
    const activeImage = product.imageUrls[activeIndex];

    const scroll = (dir: "left" | "right") => {
        scrollRef.current?.scrollBy({
            left: dir === "left" ? -200 : 200,
            behavior: "smooth",
        });
    };

    return (
        <>
            <Toast
                isVisible={showToast}
                message={`${product.title} (${selectedVariant.weight}) added to cart!`}
                onClose={() => setShowToast(false)}
            />

            <div className={styles.container}>
                {/* GALLERY */}
                <div className={styles.gallery}>
                    <div className={styles.mainImage}>
                        <Image src={activeImage} alt={product.title} fill className={styles.containImg} />
                    </div>

                    <div className={styles.thumbnailWrapper}>
                        {showThumbNav && (
                            <button className={`${styles.navBtn} ${styles.left}`} onClick={() => scroll("left")}>
                                <ChevronLeft />
                            </button>
                        )}

                        <div className={styles.thumbnailRow} ref={scrollRef}>
                            {product.imageUrls.map((img, i) => (
                                <div
                                    key={i}
                                    className={`${styles.thumb} ${i === activeIndex ? styles.activeThumb : ""}`}
                                    onClick={() => setActiveIndex(i)}
                                >
                                    <Image src={img} alt="" fill className={styles.containImgThumb} />
                                </div>
                            ))}
                        </div>

                        {showThumbNav && (
                            <button className={`${styles.navBtn} ${styles.right}`} onClick={() => scroll("right")}>
                                <ChevronRight />
                            </button>
                        )}
                    </div>
                </div>

                {/* DETAILS */}
                <div className={styles.details}>
                    <h1 className={styles.title}>{product.title}</h1>
                    <p className={styles.price}>
                        ₹{selectedVariant.price.toLocaleString("en-IN")}
                    </p>

                    <h5 className={styles.weightTitle}>Weight</h5>
                    <div className={styles.weights}>
                        {product.variants.map((v) => (
                            <button
                                key={v.weight}
                                className={`${styles.weightCard} ${
                                    v.weight === selectedVariant.weight ? styles.selected : ""
                                }`}
                                onClick={() => setSelectedVariant(v)}
                            >
                                <div className={styles.weightImg}>
                                    {v.image && (
                                        <Image src={v.image} alt={v.weight} fill />
                                    )}
                                </div>
                                <span className={styles.weightText}>{v.weight}</span>
                            </button>
                        ))}
                    </div>

                    <div className={styles.cartRow}>
                        <input
                            type="number"
                            min={1}
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                        />
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className={styles.addToCartBtn}
                            onClick={handleAddToCart}
                        >
                            Add to cart
                        </motion.button>
                    </div>

                    <div className={styles.metaRow}>
                        <span>SKU: ES-BL-1</span>
                    </div>

                        {/* ✅ SHARE SECTION */}
                        <div className={styles.shareWrapper}>
                            <Share2
                                size={18}
                                className={styles.shareIcon}
                                onClick={() => setShowShare(!showShare)}
                            />

                            <AnimatePresence>
                                {showShare && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className={styles.sharePopup}
                                    >
                                        {/* WhatsApp */}
                                        <a
                                            href={`https://wa.me/?text=${encodeURIComponent("Check this out: https://www.instagram.com/radhekrupaa")}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.whatsapp}
                                        >
                                            <FaWhatsapp />
                                        </a>

                                        {/* Instagram - Native Share (Best for DMs) */}
                                        <button
                                            className={styles.instagram}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                            onClick={() => {
                                                if (navigator.share) {
                                                    navigator.share({
                                                        title: 'Radhe Krupa',
                                                        url: 'https://www.instagram.com/radhekrupaa'
                                                    }).catch(() => {});
                                                } else {
                                                    // Fallback for desktop where share API isn't available
                                                    window.open("https://www.instagram.com/direct/inbox/", "_blank");
                                                }
                                            }}
                                        >
                                            <FaInstagram />
                                        </button>

                                        {/* LinkedIn */}
                                        <a
                                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://www.instagram.com/radhekrupaa")}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.linkedin}
                                        >
                                            <FaLinkedinIn />
                                        </a>

                                        {/* Threads */}
                                        <a
                                            href={`https://www.threads.net/intent/post?text=${encodeURIComponent("Check this out: https://www.instagram.com/radhekrupaa")}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.threads}
                                        >
                                            <SiThreads />
                                        </a>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                    <div className={styles.trustImage}>
                        <Image
                            src="https://cdn.shopify.com/s/files/1/0657/9391/7063/files/We_Are_Available_on_580_x_90_px_580_x_110_px_580_x_130_px.png?v=1749038697"
                            alt="Trust Badges"
                            width={580}
                            height={130}
                            className={styles.trustImg}
                            priority
                        />
                    </div>

                    <div className={styles.description}>
                        <button onClick={() => setShowDesc(!showDesc)}>
                            <span>Description</span>
                            <FaChevronDown className={`${styles.chevron} ${showDesc ? styles.open : ""}`} />
                        </button>

                        {showDesc && (
                            <div className={styles.descContent}>
                                <p><b>Extra-Large Slim Gold Coin</b></p>
                                <p><b>Purity</b> – Made from 24K (999) pure gold.</p>
                                <p><b>Weight Tolerance</b> – ZERO tolerance policy.</p>
                                <p><b>Certified by Earthmined</b> – sealed pack.</p>
                                <p><b>Buyback Guarantee </b> – 100% buyback as per brand policy.</p>
                                <p><b>Ideal for</b>– Perfect for festivals, religious occasions, and gifting.</p>
                            </div>
                        )}
                    </div>

                    <div className={styles.payment}>
                        <FaLock className={styles.lockIcon} />
                        <div className={styles.left}>
                            <span>Guaranteed <b>secure & safe</b> checkout</span>
                        </div>
                        <img
                            src="https://earthmintgold.com/cdn/shop/files/Untitled_240_x_240_px.png?v=1749623514&width=145"
                            alt="Razorpay"
                            className={styles.razorpayLogo}
                        />
                    </div>
                </div>
            </div>
            <ReviewSummary />
        </>
    );
}