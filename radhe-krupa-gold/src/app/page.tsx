import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header/Header";
import Slider from "@/components/Slider/Slider";
import CoinCard from "@/components/CoinCard/CoinCard";
import { MOCK_PRODUCTS } from "@/components/CoinCard/mock"; // Ensure your mock file is here
import styles from "./page.module.scss";

// Import your slider images
import slide1 from "@/components/Images/Slide-4.jpg";
import slide2 from "@/components/Images/Slide-5.jpg";

export default function Page() {
    // 1. LIMIT DATA: Only take the first 8 items for the grid
    const VISIBLE_LIMIT = 8;
    const displayedProducts = MOCK_PRODUCTS.slice(0, VISIBLE_LIMIT);

    // 2. CHECK OVERFLOW: Do we have more than 8 items?
    const showViewMore = MOCK_PRODUCTS.length > VISIBLE_LIMIT;

    return (
        <>
            <Header />

            <main>
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

                <section className={styles.coinSection}>
                    <div className={styles.sectionHeader}>
                        <h2>Extra Large Slim Gold Coins</h2>
                        <p>Sleek in Form, Grand in Value</p>
                    </div>

                    <div className={styles.grid}>
                        {displayedProducts.map((product) => (
                            <CoinCard key={product.id} data={product} />
                        ))}
                    </div>

                    {/* 3. CONDITIONAL BUTTON: Only shows if showViewMore is true */}
                    {showViewMore && (
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
            </main>
        </>
    );
}