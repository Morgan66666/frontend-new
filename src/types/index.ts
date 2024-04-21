export interface Product {
    name: string;
    category: string;
    price: string;
    options: string[];
    description: string;
}

export interface Activity {
    activityId: number;
    title: string;
    content?: string;
    bookBeginTime?: string;  // 使用ISO格式的日期字符串
    bookEndTime?: string;    // 使用ISO格式的日期字符串
    activityBeginTime: string;  // 使用ISO格式的日期字符串
    activityEndTime: string;    // 使用ISO格式的日期字符串
    createTime?: string;
    capacity?: number;
    participantsCount?: number;
    price: number;
    location: string;
    type?: string;
    organizerId?: number;
    description: string;
    img: string;
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
    activityId: number;
    title: string;
    content: string;
    bookBeginTime: string;  // 使用ISO格式的日期字符串
    bookEndTime: string;    // 使用ISO格式的日期字符串
    activityBeginTime: string;  // 使用ISO格式的日期字符串
    activityEndTime: string;    // 使用ISO格式的日期字符串
    createTime: string;
    capacity: number;
    participantsCount: number;
    price: number;
    location: string;
    type: string;
    organizerId: number;
    description: string;
    img: string;
}

export interface UserInfo {
        avatar: string,
        username: string,
        level: string,
        userId: string,
        userMassage: string,
}

export interface Post {
    id: number;
    title: string;
    content: string;
    date: string;
    thumbUp: number;
    isLiked: number;
    userInfo: UserInfo;
  }