import React from "react";
import Header from "@/components/Header/Header";
import CoinCard from "@/components/CoinCard/CoinCard";
import { MOCK_PRODUCTS } from "@/components/CoinCard/mock";
// You can reuse the styles from your main page or create a new css module
import styles from "@/app/page.module.scss";

export default function CollectionPage() {
    return (
        <>
            <Header />

            <main style={{ paddingTop: "2rem" }}>
                <section className={styles.coinSection}>
                    <div className={styles.sectionHeader}>
                        <h1>24k Extra Large Pure Gold Coins</h1>
                        <p>Viewing all {MOCK_PRODUCTS.length} products</p>
                    </div>

                    {/* Show ALL products here (no slice) */}
                    <div className={styles.grid}>
                        {MOCK_PRODUCTS.map((product) => (
                            <CoinCard key={product.id} data={product} />
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}