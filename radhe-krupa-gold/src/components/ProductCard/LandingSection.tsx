import React from 'react';
import ProductCard from './ProductCard';
import { mockProducts } from './mock';
import styles from './LandingSection.module.scss';

const LandingSection: React.FC = () => {
    return (
        <>
            {/* Banner Section */}
            <section className={styles.bannerSection}>
                <div className={styles.content}>
                    <h1 className={styles.mainTitle}>
                        High Finish. Impeccable Detail
                    </h1>
                    <p className={styles.description}>
                        At Earth Mint, every gold coin is a masterpiece. Our coins are known for their high-
                        finish quality, with sharp details and clear engravings that reflect precision
                        craftsmanship. From texture to shine, every element is perfected, Turning every coin
                        into more than a purchase a mark of excellence.
                    </p>
                    <button className={styles.viewProductsButton}>
                        View Products
                    </button>
                </div>
                {/* Products Section */}
                <section className={styles.productsSection}>
                    {mockProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </section>
            </section>

        </>
    );
};

export default LandingSection;
