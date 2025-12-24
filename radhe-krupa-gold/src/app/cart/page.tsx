"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import styles from "./Cart.module.scss";

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, clearCart } = useCart();

    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [error, setError] = useState("");

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const applyCoupon = () => {
        if (coupon.toLowerCase() === "gift10") {
            setDiscount(total * 0.1);
            setError("");
        } else if (coupon.toLowerCase() === "gift20") {
            setDiscount(total * 0.2);
            setError("");
        } else {
            setDiscount(0);
            setError("Invalid coupon or gift card");
        }
    };

    const finalTotal = total - discount;

    if (items.length === 0) {
        return (
            <div className={styles.emptyWrapper}>
                <div className={styles.emptyCard}>
                    <h2>Your Cart is Empty</h2>
                    <p>
                        Looks like you haven’t added anything yet.
                        Let’s find something special ✨
                    </p>

                    <Link href="/" className={styles.shopBtn}>
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.cartPage}>
            <h1 className={styles.title}>Your Cart</h1>

            <div className={styles.cartList}>
                {items.map((item) => (
                    <div
                        key={`${item.id}-${item.weight}`}
                        className={styles.cartItem}
                    >
                        <Image
                            src={item.image}
                            alt={item.title}
                            width={80}
                            height={80}
                        />

                        <div className={styles.info}>
                            <h3 className={styles.itemTitle}>
                                {item.title}
                            </h3>
                            <p className={styles.itemText}>
                                Weight: {item.weight}
                            </p>
                            <p className={styles.itemText}>
                                ₹{item.price.toLocaleString("en-IN")}
                            </p>

                            <div className={styles.qtyRow}>
                                <input
                                    type="number"
                                    min={1}
                                    value={item.quantity}
                                    onChange={(e) =>
                                        updateQuantity(
                                            item.id,
                                            item.weight,
                                            Number(e.target.value)
                                        )
                                    }
                                />

                                <button
                                    onClick={() =>
                                        removeFromCart(item.id, item.weight)
                                    }
                                >
                                    Remove
                                </button>
                            </div>
                        </div>

                        <div className={styles.subtotal}>
                            ₹
                            {(item.price * item.quantity).toLocaleString(
                                "en-IN"
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* DISCOUNT / GIFTCARD */}
            <div className={styles.discountBox}>
                <h3>Gift Card / Discount</h3>

                <div className={styles.discountRow}>
                    <input
                        type="text"
                        placeholder="Enter gift card or coupon"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                    />
                    <button onClick={applyCoupon}>Apply</button>
                </div>

                {error && <p className={styles.error}>{error}</p>}
            </div>

            {/* SUMMARY */}
            <div className={styles.summary}>
                <div className={styles.totalRow}>
                    <span>Subtotal</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                </div>

                {discount > 0 && (
                    <div className={styles.discountAmount}>
                        <span>Discount</span>
                        <span>-₹{discount.toLocaleString("en-IN")}</span>
                    </div>
                )}

                <div className={styles.totalRow}>
                    <strong>Total</strong>
                    <strong>₹{finalTotal.toLocaleString("en-IN")}</strong>
                </div>

                <div className={styles.actions}>
                    <button
                        className={styles.clear}
                        onClick={clearCart}
                    >
                        Clear Cart
                    </button>

                    <Link href="/checkout">
                        <button className={styles.checkout}>
                            Proceed to Checkout
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
