"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./Header.module.scss";

import Logo from "@/components/Images/Radhe-Krupa-Gold.png";

import MenuIcon from "@/components/Icons/MenuIcon";
import CloseIcon from "@/components/Icons/CloseIcon";
import SearchIcon from "@/components/Icons/SearchIcon";
import UserIcon from "@/components/Icons/UserIcon";
import CartIcon from "@/components/Icons/CartIcon";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [productsOpen, setProductsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState("/");

    // ✅ Scroll listener
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header className={styles.header}>
                {/* ===== TOP BAR ===== */}
                <div className={`${styles.topBar} ${scrolled ? styles.hideTopBar : ""}`}>
                    <div className={styles.leftIcons}>
                        <button
                            className={styles.menuToggle}
                            onClick={() => setMenuOpen(true)}
                            aria-label="Open menu"
                        >
                            <MenuIcon />
                        </button>

                        <button className={styles.iconBtn}>
                            <SearchIcon width={20} height={20} />
                        </button>
                    </div>

                    <div className={styles.logo}>
                        <Link href="/">
                            <Image
                                src={Logo}
                                alt="Radhe Krupa"
                                width={60}
                                height={60}
                                priority
                            />
                        </Link>
                        <span>Radhe Krupa</span>
                    </div>

                    <div className={styles.rightIcons}>
                        <UserIcon width={20} height={20} />
                        <CartIcon width={20} height={20} />
                    </div>
                </div>

                {/* ===== DESKTOP NAV ===== */}
                <nav className={`${styles.desktopNav} ${scrolled ? styles.desktopNavScrolled : ""}`}>
                    <Link
                        href="/"
                        className={activeLink === "/" ? styles.active : ""}
                        onClick={() => setActiveLink("/")}
                    >
                        Home
                    </Link>

                    <div className={styles.dropdown}>
                        <span>
                            Products <span className={styles.arrow}>▼</span>
                        </span>

                        <div className={styles.dropdownContent}>
                            <Link href="#" onClick={() => setActiveLink("product-1")}>
                                Large Gold Coin
                            </Link>
                            <Link href="#" onClick={() => setActiveLink("product-2")}>
                                Extra-Large Slim Gold Coin
                            </Link>
                            <Link href="#" onClick={() => setActiveLink("product-3")}>
                                All Items
                            </Link>
                        </div>
                    </div>

                    <Link
                        href="/bulk-orders"
                        className={activeLink === "/bulk-orders" ? styles.active : ""}
                        onClick={() => setActiveLink("/bulk-orders")}
                    >
                        Bulk Orders
                    </Link>

                    <Link
                        href="#"
                        className={activeLink === "tieups" ? styles.active : ""}
                        onClick={() => setActiveLink("tieups")}
                    >
                        Jewellery Store Tie-ups
                    </Link>

                    <Link
                        href="#"
                        className={activeLink === "about" ? styles.active : ""}
                        onClick={() => setActiveLink("about")}
                    >
                        About Us
                    </Link>

                    <Link
                        href="#"
                        className={activeLink === "contact" ? styles.active : ""}
                        onClick={() => setActiveLink("contact")}
                    >
                        Contact Us
                    </Link>
                </nav>
            </header>

            {/* ===== OVERLAY ===== */}
            {menuOpen && (
                <div
                    className={styles.overlay}
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* ===== MOBILE SIDE NAV ===== */}
            <nav className={`${styles.sideNav} ${menuOpen ? styles.open : ""}`}>
                <button
                    className={styles.closeBtn}
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu"
                >
                    <CloseIcon width={24} height={24} />
                </button>

                <Link href="/" onClick={() => setMenuOpen(false)}>
                    Home
                </Link>

                <div className={styles.sideNavItem}>
                    <button onClick={() => setProductsOpen(!productsOpen)}>
                        Products{" "}
                        <span className={styles.arrow}>
                            {productsOpen ? "▼" : "▶"}
                        </span>
                    </button>

                    <div className={`${styles.sideDropdown} ${productsOpen ? styles.open : ""}`}>
                        <Link href="#" onClick={() => setMenuOpen(false)}>
                            Large Gold Coin
                        </Link>
                        <Link href="#" onClick={() => setMenuOpen(false)}>
                            Extra-Large Slim Gold Coin
                        </Link>
                        <Link href="#" onClick={() => setMenuOpen(false)}>
                            All Items
                        </Link>
                    </div>
                </div>

                <Link href="/bulk-orders" onClick={() => setMenuOpen(false)}>
                    Bulk Orders
                </Link>
                <Link href="#" onClick={() => setMenuOpen(false)}>
                    Jewellery Store Tie-ups
                </Link>
                <Link href="#" onClick={() => setMenuOpen(false)}>
                    About Us
                </Link>
                <Link href="#" onClick={() => setMenuOpen(false)}>
                    Contact Us
                </Link>
            </nav>
        </>
    );
}
