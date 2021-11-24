import Service from './axios.js'

// 登录
export const loginApi = data => {
    return Service({
        url: '/api/authorizations',
        method: 'post',
        data
    })
};

// 注册
export const usersApi = data => {
    return Service({
        url: '/api/users_v2',
        method: 'post',
        data
    })
};

// init信息
export const initApi = data => {
    return Service({
        url: '/api/init?host=' + document.domain + "&llweb=1",
        method: 'get',
    })
}

// 用户信息
export const userApi = data => {
    return Service({
        url: '/api/user',
        method: 'get',
    })
}

// 个人讯息初始化
export const messageApi = data => {
    return Service({
        url: '/api/message' + data,
        method: 'get',
    })
}

// main
export const accountApi = data => {
    const time = new Date().getTime();
    return Service({
        url: '/api/account?_=' + time,
        method: 'post',
        data
    })
}

// 转账提交
export const mypursePostApi = data => {
    const time = new Date().getTime();
    return Service({
        url: '/api/mypurse?_=' + time,
        method: 'post',
        data
    })
}

// 转账
export const mypurseGetApi = data => {
    return Service({
        url: '/api/mypurse' + data,
        method: 'get',
    })
}

// 提款出事换
export const withdrawInitApi = data => {
    return Service({
        url: '/api/withdrawInit',
        method: 'get',
    })
}

// 充值初始化
export const depositInitApi = data => {
    return Service({
        url: '/api/depositInit',
        method: 'post',
        data
    })
}

// 转账记录
export const tradeRecApi = data => {
    return Service({
        url: '/api/tradeRec',
        method: 'post',
        data
    })
}

// 公告专区
export const announcementApi = data => {
    return Service({
        url: '/api/announcement' + data,
        method: 'get',
    })
}

// 新消息
export const listenApi = data => {
    return Service({
        url: '/api/listen',
        method: 'get',
    })
}

// 登出
export const logoutApi = data => {
    return Service({
        url: '/api/logout',
        method: 'get',
    })
}

// 优惠活动
export const ActGiftDetailApi = data => {
    return Service({
        url: '/api/ActGiftDetail' + data,
        method: 'get',
    })
}

// kingMeal
export const KingMealInfoApi = data => {
    return Service({
        url: '/api/KingMealInfo',
        method: 'get',
    })
}

// VIP详情
export const uservipinfoApi = data => {
    return Service({
        url: '/api/uservipinfo' + data,
        method: 'get',
    })
}