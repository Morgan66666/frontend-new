export interface Product {
    name: string;
    category: string;
    price: string;
    options: string[];
    description: string;
}

export interface Activity {
    id: string
    title: string;
    description: string;
    location: string;
    date: string;
    img: string;
    price: string;
}

export interface SignatureInfo {
    dir: string;
    policy: string;
    accessid: string;
    signature: string;
    host: string;
    expire: number;
}

export interface ActivityDetail {
    id: string
    title: string;
    description: string;
    location: string;
    date: string;
    img: string;
    price: string;
    content: string;
    capacity: number;
    remaining: number;

}