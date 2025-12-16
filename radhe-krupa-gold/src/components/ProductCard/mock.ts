// mock.ts

export interface Product {
    id: number;
    name: string;
    priceRange: string;
    imageUrl: string;
}

export const mockProducts: Product[] = [
    {
        id: 1,
        name: "GANESH JI",
        priceRange: "Rs. 1,910.00 - Rs. 139,800.00",
        imageUrl: "/images/ganesh_ji_coin.jpg", // Replace with actual image path
    },
    {
        id: 2,
        name: "HAWA MAHAL",
        priceRange: "Rs. 3,345.00 - Rs. 4,775.00",
        imageUrl: "/images/hawa_mahal_coin.jpg", // Replace with actual image path
    },
    {
        id: 3,
        name: "PEACOCK",
        priceRange: "Rs. 29,180.00 - Rs. 139,800.00",
        imageUrl: "/images/peacock_coin.jpg", // Replace with actual image path
    },
];