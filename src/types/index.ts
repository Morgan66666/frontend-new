export interface Activity {
    activityBeginTime: string;  // 使用ISO格式的日期字符串
    activityEndTime: string;    // 使用ISO格式的日期字符串
    activityId: number;
    bookBeginTime?: string;  // 使用ISO格式的日期字符串
    bookEndTime?: string;    // 使用ISO格式的日期字符串
    capacity?: number;
    content?: string;
    createTime?: string;
    description: string;
    img: string;
    location: string;
    organizerId?: number;
    participantsCount?: number;
    price: number;
    title: string;
    type?: string;
}

export interface ActivityDetail {
    activityBeginTime: string;  // 使用ISO格式的日期字符串
    activityEndTime: string;    // 使用ISO格式的日期字符串
    activityId: number;
    bookBeginTime: string;  // 使用ISO格式的日期字符串
    bookEndTime: string;    // 使用ISO格式的日期字符串
    capacity: number;
    content: string;
    createTime: string;
    description: string;
    img: string;
    location: string;
    organizerId: number;
    participantsCount: number;
    price: number;
    title: string;
    type: string;
}

export interface Post {
    body: string;
    date: string;
    postId: number;
    isLiked: number;
    thumbUp: number;
    title: string;
    userInfo: UserInfo;
}

export interface Product {
    category: string;
    description: string;
    name: string;
    options: string[];
    price: string;
}

export interface SignatureInfo {
    accessid: string;
    dir: string;
    expire: number;
    host: string;
    policy: string;
    signature: string;
}

export interface UserInfo {
        avatar: string,
        userName: string,
        gender: string,
        level: string,
        userId: string,
        signature: string,
        birth: string,
        account?: string,
}


