import React from 'react';
import Link from 'next/link';
import styles from './Hero.module.scss';

const Hero: React.FC = () => {
    return (
        <section className={styles.heroSection}>
            <div className={styles.contentBox}>
                <h2>High Finish. Impeccable Detail</h2>
                <p>
                    At Earth Mint, every gold coin is a masterpiece. Our coins are known for
                    their high-finish quality, with sharp details and clear engravings that
                    reflect precision craftsmanship. From texture to shine, every element is
                    perfected, turning every coin into more than a purchase—a mark of excellence.
                </p>
                <Link href="/products" className={styles.viewBtn}>
                    View Products
                </Link>
            </div>
        </section>
    );
};

export default Hero;