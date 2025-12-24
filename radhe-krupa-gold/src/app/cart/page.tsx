"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import styles from "./Cart.module.scss";

export default function CartPage() {
    const {
        items,
        removeFromCart,
        updateQuantity,
        clearCart,
    } = useCart();

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (items.length === 0) {
        return (
            <div className={styles.empty}>
                <h2>Your Cart</h2>
                <p>Your cart is empty</p>
                <Link href="/">Continue shopping</Link>
            </div>
        );
    }

    return (
        <div className={styles.cartPage}>
            <h1>Your Cart</h1>

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
                            <h3>{item.title}</h3>
                            <p>Weight: {item.weight}</p>
                            <p>₹{item.price.toLocaleString("en-IN")}</p>

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

            <div className={styles.summary}>
                <div className={styles.totalRow}>
                    <span>Total</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
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
