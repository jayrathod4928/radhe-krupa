"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import styles from "./Checkout.module.scss";

export default function CheckoutPage() {
    const { items, clearCart } = useCart();

    const [shipping, setShipping] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        apartment: "",
        city: "",
        state: "GJ",
        pin: "",
        country: "India",
    });

    const [billingSame, setBillingSame] = useState(true);
    const [billing, setBilling] = useState({ ...shipping });

    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        type: "shipping" | "billing"
    ) => {
        const { name, value } = e.target;
        if (type === "shipping") setShipping({ ...shipping, [name]: value });
        else setBilling({ ...billing, [name]: value });
    };

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if ((window as any).Razorpay) return resolve(true);

            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        if (items.length === 0) return alert("Cart is empty");

        const res = await fetch("/api/razorpay", {
            method: "POST",
            body: JSON.stringify({ amount: total }),
        });
        const data = await res.json();

        if (!data.id) return alert("Payment failed. Try again!");

        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) return alert("Failed to load Razorpay SDK");

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
            amount: data.amount,
            currency: "INR",
            order_id: data.id,
            name: "Radhe Krupa Gold",
            description: "Jewellery Purchase",
            handler: () => {
                alert("Payment successful!");
                clearCart();
                window.location.href = "/success";
            },
            prefill: {
                name: shipping.firstName + " " + shipping.lastName,
                email: shipping.email,
                contact: shipping.phone,
            },
            theme: { color: "#b89b5e" },
        };

        new (window as any).Razorpay(options).open();
    };

    return (
        <div className={styles.checkoutPage}>
            <h1>Checkout</h1>
            <div className={styles.container}>
                {/* ---------------- SHIPPING FORM ---------------- */}
                <div className={styles.formSection}>
                    <h2>Contact</h2>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email or mobile phone number"
                        value={shipping.email}
                        onChange={(e) => handleChange(e, "shipping")}
                    />

                    <h2>Delivery Address</h2>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={shipping.firstName}
                        onChange={(e) => handleChange(e, "shipping")}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={shipping.lastName}
                        onChange={(e) => handleChange(e, "shipping")}
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={shipping.address}
                        onChange={(e) => handleChange(e, "shipping")}
                    />
                    <input
                        type="text"
                        name="apartment"
                        placeholder="Apartment, suite, etc. (optional)"
                        value={shipping.apartment}
                        onChange={(e) => handleChange(e, "shipping")}
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={shipping.city}
                        onChange={(e) => handleChange(e, "shipping")}
                    />

                    <div className={styles.row}>
                        <select
                            name="state"
                            value={shipping.state}
                            onChange={(e) => handleChange(e, "shipping")}
                        >
                            <option value="GJ">Gujarat</option>
                        </select>
                        <input
                            type="text"
                            name="pin"
                            placeholder="PIN code"
                            value={shipping.pin}
                            onChange={(e) => handleChange(e, "shipping")}
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={shipping.phone}
                            onChange={(e) => handleChange(e, "shipping")}
                        />
                    </div>

                    <label className={styles.checkbox}>
                        <input
                            type="checkbox"
                            checked={billingSame}
                            onChange={(e) => setBillingSame(e.target.checked)}
                        />
                        Billing address same as shipping
                    </label>

                    {!billingSame && (
                        <div className={styles.billingForm}>
                            <h2>Billing Address</h2>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First name"
                                value={billing.firstName}
                                onChange={(e) => handleChange(e, "billing")}
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last name"
                                value={billing.lastName}
                                onChange={(e) => handleChange(e, "billing")}
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={billing.address}
                                onChange={(e) => handleChange(e, "billing")}
                            />
                            <input
                                type="text"
                                name="apartment"
                                placeholder="Apartment, suite, etc. (optional)"
                                value={billing.apartment}
                                onChange={(e) => handleChange(e, "billing")}
                            />
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={billing.city}
                                onChange={(e) => handleChange(e, "billing")}
                            />
                            <div className={styles.row}>
                                <select
                                    name="state"
                                    value={billing.state}
                                    onChange={(e) => handleChange(e, "billing")}
                                >
                                    <option value="GJ">Gujarat</option>
                                </select>
                                <input
                                    type="text"
                                    name="pin"
                                    placeholder="PIN code"
                                    value={billing.pin}
                                    onChange={(e) => handleChange(e, "billing")}
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone"
                                    value={billing.phone}
                                    onChange={(e) => handleChange(e, "billing")}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* ---------------- ORDER SUMMARY ---------------- */}
                <div className={styles.summarySection}>
                    <h2>Order Summary</h2>
                    {items.map((item) => (
                        <div key={`${item.id}-${item.weight}`} className={styles.item}>
                            <span>
                                {item.title} ({item.weight}) x {item.quantity}
                            </span>
                            <span>₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                        </div>
                    ))}

                    <div className={styles.total}>
                        <span>Total</span>
                        <span>₹{total.toLocaleString("en-IN")}</span>
                    </div>

                    <button className={styles.payBtn} onClick={handlePayment}>
                        Pay Now
                    </button>

                    <p className={styles.paymentInfo}>
                        All transactions are secure and encrypted via Razorpay.
                    </p>
                </div>
            </div>
        </div>
    );
}
