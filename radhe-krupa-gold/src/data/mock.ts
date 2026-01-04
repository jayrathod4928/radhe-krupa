import maroonCard from "@/components/Images/Radha-Krishna.png";
import maroonCard1 from "@/components/Images/Laxmi-ji.png";
import maroonCard2 from "@/components/Images/Trishul.png";
import maroonCard3 from "@/components/Images/Kalpavriksha.png";
import maroonCard4 from "@/components/Images/Mahal.png";
import maroonCard5 from "@/components/Images/Do-Murti.png";
import maroonCard6 from "@/components/Images/George.png";
import maroonCard7 from "@/components/Images/Tree.png";
import maroonCard8 from "@/components/Images/Ganpati.png";
import maroonCard9 from "@/components/Images/Jagannath.png";
import maroonCard10 from "@/components/Images/Hawa-Mahal.png";
import maroonCard11 from "@/components/Images/Couple.png";
import maroonCard12 from "@/components/Images/Rose.png";

import hoverImage from "@/components/Images/MaroonCardBack.png";

import {StaticImageData} from "next/image";

export interface WeightVariant {
    weight: string;
    price: number;
    image: StaticImageData | undefined;
}

export interface CoinProduct {
    id: string;
    title: string;
    imageUrls: StaticImageData[];
    isCertificate: boolean;
    priceRange: string;
    initialWeight?: string; // ✅ optional (THIS IS THE FIX)
    variants: WeightVariant[];
    /** Optional fields */
    imageUrl?: StaticImageData;
}

export const WEIGHT_VARIANTS: WeightVariant[] = [
    { weight: "25mg",   price: 830, image: maroonCard },
    { weight: "50mg",  price: 1310, image: maroonCard },
    { weight: "100mg",  price: 2050, image: maroonCard },
    { weight: "200mg",  price: 3450, image: maroonCard },
    { weight: "300mg",  price: 4850, image: maroonCard },
    { weight: "400mg", price: 6250, image: maroonCard },
    { weight: "500mg", price: 7800, image: maroonCard },
    { weight: "1000mg", price: 14950, image: maroonCard },
];

export const MOCK_PRODUCTS: CoinProduct[] = [
    {
        id: "1",
        title: "GANESH JI",
        priceRange: "Rs. 830.00 - Rs. 14,950.00",
        // Using the same image multiple times for demonstration
        imageUrls: [maroonCard8, hoverImage],
        isCertificate: true,
        variants: WEIGHT_VARIANTS,
    },
    {
        id: "2",
        title: "LAXMI JI",
        priceRange: "Rs. 830.00 - Rs. 14,950.00",
        imageUrls: [maroonCard1, hoverImage],
        isCertificate: false,
        variants: WEIGHT_VARIANTS,
    },
    {
        id: "3",
        title: "RADHA KRISHNA",
        priceRange: "Rs. 830.00 - Rs. 14,950.00",
        imageUrls: [maroonCard, hoverImage],
        isCertificate: false,
        variants: WEIGHT_VARIANTS,
    },
    {
        id: "4",
        title: "PEACOCK",
        priceRange: "Rs. 830.00 - Rs. 14,950.00",
        imageUrls: [maroonCard3, hoverImage],
        isCertificate: false,
        variants: WEIGHT_VARIANTS,
    },
    {
        id: "5",
        title: "TRISHUL",
        // This is the string shown BEFORE selection
        priceRange: "Rs. 830.00 - Rs. 14,950.00",
        imageUrls: [maroonCard2, hoverImage],
        isCertificate: true,
        variants: WEIGHT_VARIANTS,
    },
    {
        id: "6",
        title: "MECCA MADINA",
        priceRange: "Rs. 830.00 - Rs. 14,950.00",
        imageUrls: [maroonCard4, hoverImage],
        isCertificate: false,
        variants: WEIGHT_VARIANTS,
    },
    {
        id: "7",
        title: "DO MURTI",
        priceRange: "Rs. 830.00 - Rs. 14,950.00",
        imageUrls: [maroonCard5, hoverImage],
        isCertificate: false,
        variants: WEIGHT_VARIANTS,
    },
    {
        id: "8",
        title: "GEORGE V. KING",
        priceRange: "Rs. 830.00 - Rs. 14,950.00",
        imageUrls: [maroonCard6, hoverImage],
        isCertificate: false,
        variants: WEIGHT_VARIANTS,
    },
    {
        id: "9",
        title: "KALPAVRIKSHA",
        // This is the string shown BEFORE selection
        priceRange: "Rs. 830.00 - Rs. 14,950.00",
        imageUrls: [maroonCard7, hoverImage],
        isCertificate: true,
        variants: WEIGHT_VARIANTS,
    },
    {
        id: "10",
        title: "TIRUPATI BALAJI",
        priceRange: "Rs. 830.00 - Rs. 14,950.00",
        imageUrls: [maroonCard9, hoverImage],
        isCertificate: false,
        variants: WEIGHT_VARIANTS,
    },
    {
        id: "11",
        title: "HAWA MAHAL",
        priceRange: "Rs. 830.00 - Rs. 14,950.00",
        imageUrls: [maroonCard10, hoverImage],
        isCertificate: false,
        variants: WEIGHT_VARIANTS,
    },
    {
        id: "12",
        title: "MARRIED COUPLES",
        priceRange: "Rs. 830.00 - Rs. 14,950.00",
        imageUrls: [maroonCard11, hoverImage],
        isCertificate: false,
        variants: WEIGHT_VARIANTS,
    },
    {
        id: "13",
        title: "ROSE",
        priceRange: "Rs. 830.00 - Rs. 14,950.00",
        imageUrls: [maroonCard12, hoverImage],
        isCertificate: false,
        variants: WEIGHT_VARIANTS,
    },
];