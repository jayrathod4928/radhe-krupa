import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header/Header";
import Slider from "@/components/Slider/Slider";
import CoinCard from "@/components/CoinCard/CoinCard";
import ProductVariantSection from "@/components/ProductVariantCard/ProductVariantSection";

// CoinCard mock
import { MOCK_PRODUCTS as COIN_PRODUCTS } from "@/components/CoinCard/mock";

// ProductVariantCard mock (gm-based variants)
import { MOCK_PRODUCTS as VARIANT_PRODUCTS } from "@/components/ProductVariantCard/Mock";

import styles from "./page.module.scss";

// Slider images
import slide1 from "@/components/Images/Slide-4.jpg";
import slide2 from "@/components/Images/Slide-5.jpg";

export default function Page() {
    /* ===============================
       COIN CARD DATA
       =============================== */
    const COIN_VISIBLE_LIMIT = 8;
    const displayedCoinProducts = COIN_PRODUCTS.slice(0, COIN_VISIBLE_LIMIT);
    const showCoinViewMore = COIN_PRODUCTS.length > COIN_VISIBLE_LIMIT;

    return (
        <>
            <Header />

            <main>
                {/* ===== SLIDER ===== */}
                <Slider autoplay interval={4000}>
                    <Image
                        src={slide1}
                        alt="Slide 1"
                        priority
                        style={{ width: "100%", height: "auto", objectFit: "cover" }}
                    />
                    <Image
                        src={slide2}
                        alt="Slide 2"
                        style={{ width: "100%", height: "auto", objectFit: "cover" }}
                    />
                </Slider>

                {/* ===== COIN CARD SECTION ===== */}
                <section className={styles.coinSection}>
                    <div className={styles.sectionHeader}>
                        <h2>Extra Large Slim Gold Coins</h2>
                        <p>Sleek in Form, Grand in Value</p>
                    </div>

                    <div className={styles.grid}>
                        {displayedCoinProducts.map((product) => (
                            <CoinCard key={product.id} data={product} />
                        ))}
                    </div>

                    {showCoinViewMore && (
                        <div className={styles.viewMoreContainer}>
                            <Link
                                href="/collections/24k-extra-large-pure-gold-coins"
                                className={styles.viewMoreBtn}
                            >
                                View More
                            </Link>
                        </div>
                    )}
                </section>

                {/* ===== PRODUCT VARIANT CARD SECTION (REUSABLE) ===== */}
                <ProductVariantSection
                    title="Large Solid Gold Coins"
                    subtitle="Make a Statement with Solid Gold"
                    products={VARIANT_PRODUCTS}
                    visibleLimit={8}
                    viewMoreLink="/collections/24k-extra-large-pure-gold-coins"
                />
            </main>
        </>
    );
}