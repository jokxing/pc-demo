import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'home',
    redirect: '/home',
    // component: () => import('../views/home/home.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/password',
    name: 'password',
    component: () => import('../views/login/password.vue')
  },
  {
    path: '/vipDetails',
    name: 'vipDetails',
    component: () => import('../views/VIPprivileges/vipDetails.vue')
  },
  {
    path: '/sponsor',
    name: 'sponsor',
    component: () => import('../views/sponsorZone/sponsor.vue')
  },
  {
    path: '/help',
    name: 'help',
    redirect: '/aboutUs/1',
    component: () => import('../views/help/help.vue'),
    children:[
    ]
  },

  
  {
    path: '/venue',
    name: 'venue',
    redirect: 'game1',
    component: () => import('../views/game/venue.vue'),
    children:[
      {
        path: '/game1',
        name: 'game1',
        component: () => import('../views/game/game.vue')
      },
      {
        path: '/game2',
        name: 'game2',
        component: () => import('../views/game/game.vue')
      },
      {
        path: '/game3',
        name: 'game3',
        component: () => import('../views/game/game.vue')
      },
      {
        path: '/game4',
        name: 'game4',
        component: () => import('../views/game/game.vue')
      },
      {
        path: '/game5',
        name: 'game5',
        component: () => import('../views/game/game.vue')
      },
      {
        path: '/game6',
        name: 'game6',
        component: () => import('../views/game/game.vue')
      },
    ]
  },

  
  {
    path: '/help',
    name: 'helps',
    redirect: '/aboutUs/1',
    component: () => import('../views/help/help.vue'),
    children:[
      {
        path: '/aboutUs/:id',
        name: 'aboutUs',
        component: () => import('../views/help/aboutUs.vue')
      },
      {
        path: '/termsOfService',
        name: 'termsOfService',
        component: () => import('../views/help/termsOfService.vue')
      },
      {
        path: '/product/:id',
        name: 'product',
        component: () => import('../views/help/product.vue')
      },
      {
        path: '/contactUs',
        name: 'contactUs',
        component: () => import('../views/help/contactUs.vue')
      },
    ]
  },

  // 优惠活动
  {
    path: '/preferentialActivity',
    name: 'preferentialActivity',
    component: () => import('../views/discount/preferentialActivity.vue')
  },
  {
    path: '/kingMeal',
    name: 'kingMeal',
    component: () => import('../views/discount/kingMeal.vue')
  },
  {
    path: '/ChessRank',
    name: 'ChessRank',
    component: () => import('../views/discount/ChessRank.vue')
  },
  {
    path: '/ChessSave',
    name: 'ChessSave',
    component: () => import('../views/discount/ChessSave.vue')
  },
  {
    path: '/ChessHand',
    name: 'ChessHand',
    component: () => import('../views/discount/ChessHand.vue')
  },
  {
    path: '/DptGift',
    name: 'DptGift',
    component: () => import('../views/discount/DptGift.vue')
  },
  {
    path: '/UsdtDptBonus',
    name: 'UsdtDptBonus',
    component: () => import('../views/discount/UsdtDptBonus.vue')
  },
  {
    path: '/UsdtRefund',
    name: 'UsdtRefund',
    component: () => import('../views/discount/UsdtRefund.vue')
  },
  {
    path: '/ActGiftDetail',
    name: 'ActGiftDetail',
    component: () => import('../views/discount/ActGiftDetail.vue')
  },

  {
    path: '/user',
    name: 'user',
    redirect: '/deposit',
    component: () => import('../views/user/user.vue'),
    children:[
      {
        path: '/deposit',
        name: '存款',
        redirect: '/rmbDeposit',
        component: () => import('../views/user/deposit.vue'),
        children: [
          {
            path: '/rmbDeposit',
            name: 'rmbDeposit',
            meta:{
              requireAuth: true,
            },
            component: () => import('../views/user/rmbDeposit.vue')
          },
          {
            path: '/usdtDeposit',
            name: 'usdtDeposit',
            meta:{
              requireAuth: true,
            },
            component: () => import('../views/user/usdtDeposit.vue')
          }
        ]
      },
      {
        path: '/withdraw',
        name: '提款',
        redirect: '/rmbWithdraw',
        component: () => import('../views/user/withdraw.vue'),
        children: [
          {
            path: '/rmbWithdraw',
            name: 'rmbWithdraw',
            meta:{
              requireAuth: true,
            },
            component: () => import('../views/user/rmbWithdraw.vue')
          },
          {
            path: '/usdtWithdraw',
            name: 'usdtWithdraw',
            meta:{
              requireAuth: true,
            },
            component: () => import('../views/user/usdtWithdraw.vue')
          },
        ]
      },
      {
        path: '/transfer',
        name: 'transfer',
        meta:{
          requireAuth: true,
        },
        component: () => import('../views/user/transfer.vue')
      },
      {
        path: '/accountRecord',
        name: 'accountRecord',
        meta:{
          requireAuth: true,
        },
        component: () => import('../views/user/accountRecord.vue')
      },
      {
        path: '/tradeRecord',
        name: '提款记录',
        meta:{
          requireAuth: true,
        },
        component: () => import('../views/user/tradeRecord.vue')
      },
      {
        path: '/changeData',
        name: '变更资料',
        meta:{
          requireAuth: true,
        },
        component: () => import('../views/user/changeData.vue')
      },
      {
        path: '/mail',
        name: 'mail',
        meta:{
          requireAuth: true,
        },
        component: () => import('../views/user/mail.vue')
      },
      {
        path: '/myVip',
        name: 'VIP特权与福利',
        meta:{
          requireAuth: true,
        },
        component: () => import('../views/user/myVip.vue')
      }
    ]
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from,savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to,from,next)=>{
	if(to.meta.requireAuth){
    if(localStorage.getItem("access_token")) {
      next()
    }else{
      next('/home')
    }
	}else{
    if(localStorage.getItem("access_token") && to.path == '/login') {
      next('/home')
    }else{
      next()
    }
  }
});

//路由跳转后，页面回到顶部
router.afterEach(() => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})


export default router
