"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import styles from "./Header.module.scss";

import Logo from "@/components/Images/Radhe-Krupa-Gold.png";

import MenuIcon from "@/components/Icons/MenuIcon";
import CloseIcon from "@/components/Icons/CloseIcon";
import SearchIcon from "@/components/Icons/SearchIcon";
import UserIcon from "@/components/Icons/UserIcon";
import CartIcon from "@/components/Icons/CartIcon";

export default function Header() {
    const pathname = usePathname();

    const [menuOpen, setMenuOpen] = useState(false);
    const [productsOpen, setProductsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

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

                {/* ===== DESKTOP / TABLET NAV ===== */}
                <nav
                    className={`${styles.desktopNav} ${
                        scrolled ? styles.desktopNavScrolled : ""
                    }`}
                >
                    <Link
                        href="/"
                        className={pathname === "/" ? styles.active : ""}
                    >
                        Home
                    </Link>

                    <div
                        className={`${styles.dropdown} ${
                            pathname.startsWith("/products") ? styles.active : ""
                        }`}
                    >
            <span>
              Products <span className={styles.arrow}>▼</span>
            </span>

                        <div className={styles.dropdownContent}>
                            <Link
                                href="#"
                                className={pathname === "/products/large-gold-coin" ? styles.active : ""}
                            >
                                Large Gold Coin
                            </Link>
                            <Link
                                href="#"
                                className={pathname === "/products/extra-large-slim-gold-coin" ? styles.active : ""}
                            >
                                Extra-Large Slim Gold Coin
                            </Link>
                            <Link
                                href="#"
                                className={pathname === "/products" ? styles.active : ""}
                            >
                                All Items
                            </Link>
                        </div>
                    </div>

                    <Link
                        href="/bulk-orders"
                        className={pathname === "/bulk-orders" ? styles.active : ""}
                    >
                        Bulk Orders
                    </Link>

                    <Link
                        href="/jewellery-store-tie-ups"
                        className={pathname === "/jewellery-store-tie-ups" ? styles.active : ""}
                    >
                        Jewellery Store Tie-ups
                    </Link>

                    <Link
                        href="/about-us"
                        className={pathname === "/about-us" ? styles.active : ""}
                    >
                        About Us
                    </Link>

                    <Link
                        href="/contact"
                        className={pathname === "/contact" ? styles.active : ""}
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

                <Link
                    href="/"
                    className={pathname === "/" ? styles.active : ""}
                    onClick={() => setMenuOpen(false)}
                >
                    Home
                </Link>

                <div className={styles.sideNavItem}>
                    <button onClick={() => setProductsOpen(!productsOpen)}>
                        Products{" "}
                        <span className={styles.arrow}>
              {productsOpen ? "▼" : "▶"}
            </span>
                    </button>

                    <div
                        className={`${styles.sideDropdown} ${
                            productsOpen ? styles.open : ""
                        }`}
                    >
                        <Link
                            href="#"
                            className={pathname === "/products/large-gold-coin" ? styles.active : ""}
                            onClick={() => setMenuOpen(false)}
                        >
                            Large Gold Coin
                        </Link>
                        <Link
                            href="#"
                            className={pathname === "/products/extra-large-slim-gold-coin" ? styles.active : ""}
                            onClick={() => setMenuOpen(false)}
                        >
                            Extra-Large Slim Gold Coin
                        </Link>
                        <Link
                            href="#"
                            className={pathname === "/products" ? styles.active : ""}
                            onClick={() => setMenuOpen(false)}
                        >
                            All Items
                        </Link>
                    </div>
                </div>

                <Link
                    href="/bulk-orders"
                    className={pathname === "/bulk-orders" ? styles.active : ""}
                    onClick={() => setMenuOpen(false)}
                >
                    Bulk Orders
                </Link>

                <Link
                    href="/jewellery-store-tie-ups"
                    className={pathname === "/jewellery-store-tie-ups" ? styles.active : ""}
                    onClick={() => setMenuOpen(false)}
                >
                    Jewellery Store Tie-ups
                </Link>

                <Link
                    href="/about-us"
                    className={pathname === "/about" ? styles.active : ""}
                    onClick={() => setMenuOpen(false)}
                >
                    About Us
                </Link>

                <Link
                    href="/contact"
                    className={pathname === "/contact" ? styles.active : ""}
                    onClick={() => setMenuOpen(false)}
                >
                    Contact Us
                </Link>
            </nav>
        </>
    );
}
