// src/data/mock.ts
import maroonCard from "@/components/Images/Maroon-Card.jpg";
import goldCard from "@/components/Images/Gold-Card.jpg";
import {StaticImageData} from "next/image";


export interface WeightVariant {
    weight: string;
    price: number;
    image: StaticImageData | undefined; // ✅ optional
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
    { weight: "50mg",   price: 1145, image: maroonCard },
    { weight: "100mg",  price: 1910, image: maroonCard },
    { weight: "200mg",  price: 3345, image: maroonCard },
    { weight: "300mg",  price: 4775, image: maroonCard },
    { weight: "500mg",  price: 7710, image: maroonCard },
    { weight: "1000mg", price: 14970, image: maroonCard },
    { weight: "2000mg", price: 29080, image: maroonCard },
];

export const MOCK_PRODUCTS: CoinProduct[] = [
    {
        id: "1",
        title: "GANESH JI",
        priceRange: "Rs. 1,145.00 - Rs. 29,080.00",
        // Using the same image multiple times for demonstration
        imageUrls: [maroonCard, goldCard, maroonCard, goldCard, maroonCard, goldCard, maroonCard, goldCard],
        isCertificate: true,
        variants: WEIGHT_VARIANTS,
    },
    {
        id: "2",
        title: "LAXMI JI",
        priceRange: "Rs. 1,145.00 - Rs. 29,080.00",
        imageUrls: [goldCard],
        isCertificate: false,
        variants: WEIGHT_VARIANTS,
    },
    {
        id: "3",
        title: "DO MURTI",
        priceRange: "Rs. 1,145.00 - Rs. 29,080.00",
        imageUrls: [maroonCard],
        isCertificate: false,
        variants: WEIGHT_VARIANTS,
    },
    {
        id: "4",
        title: "KALPAVRIKSHA",
        priceRange: "Rs. 1,910.00 - Rs. 1,19,760.00",
        imageUrls: [goldCard, maroonCard,goldCard, maroonCard,goldCard, maroonCard,goldCard, maroonCard],
        isCertificate: false,
        initialWeight: "0.1gm", // ✅ allowed
        variants: [
            { weight: "0.1gm", price: 1910, image: goldCard },
            { weight: "0.25gm", price: 4035, image: goldCard },
            { weight: "0.5gm", price: 7490, image: goldCard },
            { weight: "1gm", price: 14980, image: goldCard },
            { weight: "2gm", price: 119760, image: goldCard },
        ],
    },
    {
        id: "5",
        title: "GANESH JI",
        // This is the string shown BEFORE selection
        priceRange: "Rs. 1,145.00 - Rs. 29,080.00",
        imageUrls: [maroonCard],
        isCertificate: true,
        variants: WEIGHT_VARIANTS,
    },
    {
        id: "6",
        title: "LAXMI JI",
        priceRange: "Rs. 1,145.00 - Rs. 29,080.00",
        imageUrls: [goldCard],
        isCertificate: false,
        variants: WEIGHT_VARIANTS,
    },
    {
        id: "7",
        title: "DO MURTI",
        priceRange: "Rs. 1,145.00 - Rs. 29,080.00",
        imageUrls: [maroonCard],
        isCertificate: false,
        variants: WEIGHT_VARIANTS,
    },
    {
        id: "8",
        title: "KALPAVRIKSHA",
        priceRange: "Rs. 1,145.00 - Rs. 29,080.00",
        imageUrls: [goldCard],
        isCertificate: false,
        variants: WEIGHT_VARIANTS,
    },
    {
        id: "9",
        title: "GANESH JI",
        // This is the string shown BEFORE selection
        priceRange: "Rs. 1,145.00 - Rs. 29,080.00",
        imageUrls: [maroonCard],
        isCertificate: true,
        variants: WEIGHT_VARIANTS,
    },
    {
        id: "10",
        title: "LAXMI JI",
        priceRange: "Rs. 1,145.00 - Rs. 29,080.00",
        imageUrls: [goldCard],
        isCertificate: false,
        variants: WEIGHT_VARIANTS,
    },
    {
        id: "11",
        title: "DO MURTI",
        priceRange: "Rs. 1,145.00 - Rs. 29,080.00",
        imageUrls: [maroonCard],
        isCertificate: false,
        variants: WEIGHT_VARIANTS,
    },
    {
        id: "12",
        title: "KALPAVRIKSHA",
        priceRange: "Rs. 1,145.00 - Rs. 29,080.00",
        imageUrls: [goldCard],
        isCertificate: false,
        variants: WEIGHT_VARIANTS,
    },
];