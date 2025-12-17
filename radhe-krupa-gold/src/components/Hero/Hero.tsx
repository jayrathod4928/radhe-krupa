import React from 'react';
import Link from 'next/link';
import styles from './Hero.module.scss';

const products = [
    { id: 1, name: "GANESH JI", price: "Rs. 1,910.00 - Rs. 139,800.00", img: "https://earthmintgold.com/cdn/shop/files/Untitled_design_1.png?v=1749015953&width=200" }, // Replace with actual coin imgs
    { id: 2, name: "HAWA MAHAL", price: "Rs. 3,345.00 - Rs. 4,775.00", img: "https://earthmintgold.com/cdn/shop/files/Untitled_design_1.png?v=1749015953&width=200" },
    { id: 3, name: "PEACOCK", price: "Rs. 29,180.00 - Rs. 139,800.00", img: "https://earthmintgold.com/cdn/shop/files/Untitled_design_1.png?v=1749015953&width=200" },
];

const Hero: React.FC = () => {
    return (
        <div className={styles.container}>
            {/* LEFT ANIMATED HERO */}
            <section className={styles.heroSection}>
                <div className={styles.backgroundLayer} />
                <div className={styles.contentBox}>
                    <h2>High Finish. Impeccable Detail</h2>
                    <p>
                        At Earth Mint, every gold coin is a masterpiece. Our coins are known for
                        their high-finish quality, with sharp details and clear engravings.
                    </p>
                    <Link href="/products" className={styles.viewBtn}>
                        View Products
                    </Link>
                </div>
            </section>

            {/* RIGHT STATIC PRODUCT LIST */}
            <aside className={styles.productList}>
                {products.map((item) => (
                    <div key={item.id} className={styles.productItem}>
                        <div className={styles.info}>
                            <h3>{item.name}</h3>
                            <p>{item.price}</p>
                            <div className={styles.cartIcon}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
                                </svg>
                            </div>
                        </div>
                        <img src={item.img} alt={item.name} className={styles.prodImg} />
                    </div>
                ))}
            </aside>
        </div>
    );
};

export default Hero;