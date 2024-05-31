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
    bookBeginTime?: string;  // 使用ISO格式的日期字符串
    bookEndTime?: string;    // 使用ISO格式的日期字符串
    capacity: number;
    createTime?: string;
    description: string;
    img: string;
    location: string;
    organizerId?: number;
    participantsCount: number;
    price: number;
    title: string;
    type?: string;
    status?: string;
    content?: string;
}

export interface Post {
    userId?: string;
    body: string;
    date: string;
    postId: number;
    isLiked: number;
    likes: number;
    title: string;
    type: string;
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
    intro: string;
}

export interface UserInfo {
        avatar: string,
        userName: string,
        gender: string,
        level: string,
        userId: string,
        intro: string,
        birth: string,
        account?: string,
}


export interface Order {
  orderId?: number;
  activityId: number;
  userId: number;
  amount?: number;
  tradeNumber?: number;
  createTime?: string; // 注意：因为TypeScript不直接支持LocalDateTime，可以使用ISO格式的字符串
  status?: number;
}



