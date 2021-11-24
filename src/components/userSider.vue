<template>
    <div class="user_sider">
        <div class="user_index">
            <div class="user_private fix">
                <img class="head" src="../assets/img/header/imageAvatar.png">
                <div class="user_name">
                    <p>{{ user.name }} <img :src="user.vip_level_logo" height="22"></p>
                    <p>加入平台第{{ totalDay }}天</p>
                </div>
            </div>
            <div class="user_wallet fix">
                <p>main</p>
                <span>{{ userMoney }}</span>
            </div>
            <div class="user_menu">
                <ul>
                    <li v-for="(item,index) in menuList" :key="index" @click="walletClick(item)">
                        <router-link :to="item.url">
                            <img :src="item.img">
                            <p>{{ item.text }}</p>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="user_wallet_menu">
            <ul>
                <li 
                    v-for="(item, index) in walletList" 
                    :key="index"
                    :class="{ active: item.url == $route.path }"
                    @click="walletClick(item)">
                    <router-link :to="item.url">
                        <img :src="item.img">
                        {{ item.text }}
                        <span v-if="item.MsgCount > 0">{{ item.MsgCount }}</span>
                    </router-link>
                </li>
            </ul>
        </div>

        <a-spin v-show="showLoading"></a-spin>
    </div>
</template>

<script>
    export default {
        props: ['userTitle','userSubTitle'],
        data() {
            return {
                // 加入会员的天数
                totalDay: 0,
                showLoading: false,
                user: JSON.parse(localStorage.getItem('user')),
                userMoney: localStorage.getItem('userMoney'),
                menuList: [
                    {
                        text: "存款",
                        img: require('../assets/img/user/user_icon_wtd.png'),
                        title: "存款",
                        subTitle: "小标题",
                        url: "/rmbDeposit"
                    },
                    {
                        text: "提款",
                        img: require('../assets/img/user/user_icon_wtd.png'),
                        title: "提款",
                        subTitle: "小标题",
                        url: "/rmbWithdraw"
                    },
                    {
                        text: "转账",
                        img: require('../assets/img/user/user_icon_wtd.png'),
                        title: "转账",
                        subTitle: "小标题",
                        url: "/transfer"
                    },
                ],
                walletList: [
                    {
                        text: '转账记录',
                        title: "转账记录",
                        subTitle: "",
                        img: require("../assets/img/user/user_beat.png"),
                        url: '/accountRecord'
                    },
                    {
                        text: '提款记录',
                        title: "提款记录",
                        subTitle: "",
                        img: require("../assets/img/user/user_beat.png"),
                        url: '/tradeRecord'
                    },
                    {
                        text: '消息中心',
                        title: "消息中心",
                        img: require("../assets/img/user/user_message.png"),
                        url: '/mail',
                        MsgCount: 0
                    },
                    {
                        text: '变更资料',
                        title: "变更资料",
                        subTitle: "",
                        img: require("../assets/img/user/user_message.png"),
                        url: '/changeData'
                    },
                    {
                        text: 'VIP特权与福利',
                        title: "VIP等级特权",
                        subTitle: "",
                        img: require("../assets/img/user/user_message.png"),
                        url: '/myVip'
                    },
                ]
            }
        },
        methods: {
            // 修改父组件的标题
            walletClick(item) {
                var data = [item.title, item.subTitle]
                this.$emit('goUserTitle', data)
            },
        },
        mounted() {
            // 初始化给父组件的标题复制
            for(var i = 0; i < this.menuList.length; i++){
                if(this.menuList[i].url == this.$route.path){
                    var data = [this.menuList[i].title, this.menuList[i].subTitle]
                    this.$emit('goUserTitle', data)
                }
                if(this.$route.path == '/usdtWithdraw'){
                    var data = [this.menuList[1].title, this.menuList[1].subTitle]
                    this.$emit('goUserTitle', data)
                }
                if(this.$route.path == '/usdtDeposit'){
                    var data = [this.menuList[0].title, this.menuList[0].subTitle]
                    this.$emit('goUserTitle', data)
                }
            }
            for(var i = 0; i < this.walletList.length; i++){
                if(this.walletList[i].url == this.$route.path){
                    var data = [this.walletList[i].title, this.walletList[i].subTitle]
                    this.$emit('goUserTitle', data)
                }
            };

            // 加入会员的天数
            var created_at = this.user.created_at
            var totalGetTime = new Date().getTime() - new Date(created_at).getTime()
            this.totalDay = Math.floor(totalGetTime/86400000)
        },
        watch: {
            $route(to, from){
                for(var i = 0; i < this.menuList.length; i++){
                    if(this.menuList[i].url == to.path){
                        var data = [this.menuList[i].title, this.menuList[i].subTitle]
                        this.$emit('goUserTitle', data)
                    }
                    if(to.path == '/usdtWithdraw'){
                        var data = [this.menuList[1].title, this.menuList[1].subTitle]
                        this.$emit('goUserTitle', data)
                    }
                    if(to.path == '/usdtDeposit'){
                        var data = [this.menuList[0].title, this.menuList[0].subTitle]
                        this.$emit('goUserTitle', data)
                    }
                }
                for(var i = 0; i < this.walletList.length; i++){
                    if(this.walletList[i].url == to.path){
                        var data = [this.walletList[i].title, this.walletList[i].subTitle]
                        this.$emit('goUserTitle', data)
                    }
                };
                if(to.path == '/UsdtAbout'){
                    this.$emit('goUserTitle', '')
                }
            }
        }
    }
</script>