<template>
    <div id="header" @mouseleave="headerOut">
        <!-- 下拉场馆 -->
        <transition name="header-venueContent-slide" v-for="(item, index) in venueList" :key="index">
            <div class="header_venueContent" v-show="item.show">
                <div class="header_venueContent_inner" :class="[item.class]">
                    <div v-for="(v,i) in item.gameArr" :key="i" class="header_venueRegion">
                        <div class="header_venueContent_title" :style="{'width': item.width + 'px'}">
                            <h4>{{ v.gameTitle }}</h4>
                            <p>{{ v.gameBrief }}</p>
                        </div>
                        <img :src="v.headerImg" :width="item.imgWidth">
                        <div class="maintain" v-if="v.status == 2">维护中</div>
                    </div>
                    <div class="header_venueInfo" v-if="item.type != 'Lottery'">
                        <h5>{{ item.name }}</h5>
                        <p>{{ item.english }}</p>
                    </div>
                </div>
            </div>     
        </transition>

        <!-- 其他下拉 -->
        <transition name="header-venueContent-slide">
            <div class="header_venueContent" v-show="showDiscount">
                <div class="header_venueContent_inner header_venueContent_inner2">
                    <div class="header_venueRegion">
                        <router-link to="/DptGift">
                            <div class="header_venueContent_title" style="width: 225px">
                                <h4>礼品</h4>
                                <p>小标题</p>
                            </div>
                            <img src="../assets/img/header/header_img.png" width="150">
                        </router-link>
                    </div>
                    <div class="header_venueRegion">
                        <router-link to="/preferentialActivity">
                            <div class="header_venueContent_title" style="width: 225px">
                                <h4>优惠</h4>
                                <p>小标题</p>
                            </div>
                            <img src="../assets/img/header/header_img.png" width="150">
                        </router-link>
                    </div>
                    <div class="header_venueRegion" @click="goVipClick">
                            <div class="header_venueContent_title" style="width: 225px">
                                <h4>VIP</h4>
                                <p>小标题</p>
                            </div>
                            <img src="../assets/img/header/header_img.png" width="150">
                    </div>
                </div>
            </div>     
        </transition>
        <transition name="header-venueContent-slide">
            <div class="header_venueContent" v-show="showSupport">
                <div class="header_venueContent_inner header_venueContent_inner1">
                    <router-link to="/sponsor">
                        <div class="header_venueRegion header_venueRegion_center">
                            <img src="../assets/img/header/header_img.png" width="220">
                            <div class="header_venueContent_title">
                                <h4 style="margin-top: 98px;">广告名称</h4>
                                <p>小标题小标题小标题小标题小标题小标题小标题小标题小标题小标题</p>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>     
        </transition>
        <transition name="header-venueContent-slide">
            <div class="header_venueContent" v-show="showAPP">
                <div class="header_venueContent_inner header_venueContent_inner1">
                    <div class="header_venueRegion header_venueRegion_center header_APP">
                        <img src="../assets/img/header/header_img.png" width="220">
                        <div class="header_venueContent_title">
                            <h4 class="fix">
                                大标题
                                <br>
                                <span>小标题 小标题</span>
                            </h4>
                            <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
                        </div>
                    </div>
                    <div class="header_venueRegion header_venueRegion_center header_APP">
                        <img src="../assets/img/header/header_img.png" width="220">
                        <div class="header_venueContent_title">
                            <h4 class="fix">
                                大标题
                                <br>
                                <span>小标题 小标题</span>
                            </h4>
                            <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
                        </div>
                    </div>
                </div>
            </div>     
        </transition>
        <transition name="header-venueContent-slide">
            <div class="header_venueContent" v-show="showGift">
                <div class="header_venueContent_inner header_venueContent_inner1">
                    <router-link to="/gift">
                        <div class="header_venueRegion header_venueRegion_center">
                            <img src="../assets/img/header/header_img.png" width="220">
                            <div class="header_venueContent_title">
                                <h4 style="margin-top: 98px;">大标题 大标题</h4>
                                <p>小标题，小标题</p>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>     
        </transition>

        <!-- 导航 -->
        <div class="header" :class="{ 'header_active': isHeaderActive, 'home_active': isHomeActive }">
            <div class="header_inner">
                <div class="header_logo">
                    <router-link to="/home">
                        <img src="../assets/img/logo_white.png" height="46" v-show="!isHeaderActive">
                        <img src="../assets/img/logo.png" height="46" v-show="isHeaderActive">
                    </router-link>
                </div>
                <div class="header_nemu">
                    <ul>
                        <li 
                            v-for="(item, index) in nemuList" :key="index" 
                            :class="{ active: item.isActive }"
                            @mouseover="venueContentOver(item.type)"
                            @click="$router.push(item.url)">
                            {{ item.text }}
                            <a-icon type="down" v-if="item.isDown" />
                        </li>
                    </ul>
                </div>
                <div class="mid_empty" @mouseover="headerOut"></div>
                <div class="header_right">
                    <div class="header_activity">
                        <ul>
                            <li @mouseover="headerOut">
                                <a-dropdown placement="bottomCenter">
                                    <div class="ant-dropdown-link">
                                        <img :src="require('../assets/img/header/' + (isHeaderActive ? 'building-3-fill_on' : 'building-3-fill') + '.png')" height="24">
                                        客服
                                    </div>
                                    <a-menu slot="overlay">
                                        <a-menu-item>
                                            <img src="../assets/img/header/building-3-fill_on.png" width="18" /> name
                                        </a-menu-item>
                                        <a-menu-item>
                                            <img src="../assets/img/header/building-3-fill_on.png" width="18" /> name
                                        </a-menu-item>
                                    </a-menu>
                                </a-dropdown>
                            </li>
                            <li 
                                @mouseover="headerOver('discount')">
                                <img :src="require('../assets/img/header/' + (isHeaderActive ? 'building-3-fill_on' : 'building-3-fill') + '.png')" height="24">
                                活动
                            </li>
                            <li 
                                @mouseover="headerOver('support')" >
                                <img :src="require('../assets/img/header/' + (isHeaderActive ? 'building-3-fill_on' : 'building-3-fill') + '.png')" height="24">
                                广告
                            </li>
                            <li 
                                @mouseover="headerOver('app')" >
                                <img :src="require('../assets/img/header/' + (isHeaderActive ? 'building-3-fill_on' : 'building-3-fill') + '.png')" height="24">
                                其他
                            </li>
                        </ul>
                    </div>
                    <div class="header_loginReg" v-if="!isToken">
                        <div class="register_btn" @click="$router.push('/register')">注册</div>
                        <div class="primary_btn" @click="$router.push('/login')">登录</div>
                    </div>
                    <div class="header_personalInfo" v-if="isToken" @mouseover="headerOut">
                        <ul>
                            <li :class="{ 'primary_bg_color': isHeaderActive }">
                                <router-link to="/rmbDeposit">充值</router-link>
                            </li>
                            <li :class="{ 'primary_bg_color': isHeaderActive }">
                                <router-link to="/rmbWithdraw">提款</router-link>
                            </li>
                            <li :class="{ 'primary_bg_color': isHeaderActive }">
                                <router-link to="/transfer">转账</router-link>
                            </li>
                        </ul>
                        <div class="header_moneyBag">
                            <div>
                                <span>{{ user.name }} </span>
                                <img :src="user.vip_level_logo" width="42px">
                            </div>
                            <span>主账户：{{ userMoney }} <a-icon type="sync" @click="userData" /></span>
                        </div>
                        <div class="header_personalHeader">
                            <img src="../assets/img/header/imageAvatar.png" width="42">
                            <div class="header_infoList">
                                <div class="header_infoList_inner fix">
                                    <div class="header_currentTime">
                                        {{ user.name }} 早上好！
                                    </div>
                                    <ul>
                                        <li>
                                            <router-link to="/mail">
                                                <div>
                                                    <img src="../assets/img/header/header_message.png" width="24">
                                                    消息中心
                                                </div>
                                                <a-icon type="right" />
                                            </router-link>
                                        </li>
                                        <li>
                                            <router-link to="/tradeRecord">
                                                <div>
                                                    <img src="../assets/img/header/header_message.png" width="24">
                                                    提款记录
                                                </div>
                                                <a-icon type="right" />
                                            </router-link>
                                        </li>
                                        <li>
                                            <router-link to="/myVip">
                                                <div>
                                                    <img src="../assets/img/header/header_message.png" width="24">
                                                    VIP 详情
                                                </div>
                                                <a-icon type="right" />
                                            </router-link>
                                        </li>
                                        <li>
                                            <router-link to="/changeData">
                                                <div>
                                                    <img src="../assets/img/header/header_message.png" width="24">
                                                    个人资料
                                                </div>
                                                <a-icon type="right" />
                                            </router-link>
                                        </li>
                                        <li @click="logoutClick">
                                            <div>
                                                <img src="../assets/img/header/header_message.png" width="24">
                                                退出登录
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 提示登录 -->
        <a-modal
            title="温馨提示"
            :visible="showLoginTs"
            :width="360"
            @cancel="showLoginTs = false"
            >
            <p>请先登录账号,才能了解更多</p>
            <template slot="footer">
                <div class="modal_one_btn">
                    <a-button key="submit" class="gradients_btn" @click="$router.push('/login')">确认</a-button>
                </div>
            </template>
        </a-modal>

        <a-spin v-show="showLoading"></a-spin>
    </div>
</template>

<script>
    import game from '../assets/js/gameConfigure.js'
    import { initApi, userApi, logoutApi, accountApi, mypursePostApi } from '../http/api'
    export default {
        data() {
            return {
                showLoading: false,
                // 整个header的样式
                isHeaderActive: false,
                isHomeActive: false,
                // 导航
                nemuList:[
                    {
                        text: '首页',
                        isDown: false,
                        isActive: true,
                        type: "home",
                        url: '/home'
                    },
                    {
                        text: '标题',
                        isDown: true,
                        isActive: false,
                        type: "Sport",
                        url: '/game1'
                    },
                    {
                        text: '标题',
                        isDown: true,
                        isActive: false,
                        type: "RealPeople",
                        url: '/game2'
                    },
                    {
                        text: '标题',
                        isDown: true,
                        isActive: false,
                        type: "Chess",
                        url: '/game3'
                    },
                    {
                        text: '标题',
                        isDown: true,
                        isActive: false,
                        type: "Lottery",
                        url: '/game4'
                    },
                    {
                        text: '标题',
                        isDown: true,
                        isActive: false,
                        type: "Video",
                        url: '/game5'
                    },
                    {
                        text: '标题',
                        isDown: true,
                        isActive: false,
                        type: "Esports",
                        url: '/game6'
                    },
                ],
                isToken: localStorage.getItem('access_token') ? true : false,
                // 下拉场馆
                venueList:[
                    {
                        type: 'Sport',
                        name: '标题',
                        english: 'title',
                        class: "header_venueContent_inner2",
                        imgWidth: "150",
                        width: "191",
                        show: false,
                        gameArr: game.game.SportGame
                    },
                    {
                        type: 'RealPeople',
                        name: '标题',
                        english: 'title',
                        class: "header_venueContent_inner2",
                        imgWidth: "173",
                        width: "173px",
                        show: false,
                        gameArr: game.game.RealPeopleGame
                    },
                    {
                        type: 'Chess',
                        name: '标题',
                        english: 'title',
                        class: "header_venueContent_inner2",
                        imgWidth: "170",
                        width: "300",
                        show: false,
                        gameArr: game.game.ChessGame
                    },
                    {
                        type: 'Lottery',
                        name: '',
                        english: '',
                        class: "header_venueContent_inner2",
                        imgWidth: "170",
                        width: "316",
                        show: false,
                        gameArr: game.game.LotteryGame
                    },
                    {
                        type: 'Video',
                        name: '标题',
                        english: 'title',
                        class: "header_venueContent_inner2",
                        imgWidth: "140",
                        width: "140",
                        show: false,
                        gameArr: game.game.VideoGame
                    },
                    {
                        type: 'Esports',
                        name: '标题',
                        english: 'title',
                        class: "header_venueContent_inner1",
                        imgWidth: "200",
                        width: "",
                        show: false,
                        gameArr: game.game.EsportsGame
                    },
                ],
                // 获取游戏配置
                gameAll: game.game,
                // 
                showDiscount: false,
                // 
                showSupport: false,
                // 
                showAPP: false,
                // 
                showGift: false,
                // 下拉类型
                headerType: "",
                // 用户信息
                user:"",
                userMoney: 0,
                // 提示登录
                showLoginTs: false,
            }
        },
        methods: {
            // 用户信息初始化
            userInit () {
                if(localStorage.getItem('user')){
                    var users = localStorage.getItem('user');
                    this.user = JSON.parse(users);
                    var userMoney = localStorage.getItem('userMoney')
                    this.userMoney = Math.floor(userMoney * 100) / 100
                }else{
                    this.userData()
                }
            },
            userData () {
                var _this = this;
                this.showLoading = true;
                userApi().then(res => {
                    _this.showLoading = false;
                    _this.user = res.data;
                    _this.userMoney = res.data.money;
                    _this.user.wallet = res.data.meta.wallet;
                    var userObj = {
                        id: res.data.id,
                        bound_paypwd: res.data.bound_paypwd,
                        is_voicepass: res.data.is_voicepass,
                        vip_level_logo: res.data.vip_level_logo,
                        vip_level_name: res.data.vip_level_name,
                        nickname: res.data.nickname,
                        is_bind: res.data.is_bind,
                        name: res.data.name,
                        wechat: res.data.wechat,
                        qq: res.data.qq,
                        created_at: res.data.created_at,
                        wallet: res.data.meta.wallet
                    };
                    var users = JSON.stringify(userObj);
                    localStorage.setItem("user", users)
                    localStorage.setItem("userMoney",res.data.money);
                    if(res.data.mobile != ""){
                        localStorage.setItem("mobile",res.data.mobile);
                    }
                }).catch(err => {
                    _this.showLoading = false
                })
            },
            // 下拉场馆事件
            venueContentOver (type) {
                if(this.$route.path == '/home'){
                    if(window.pageYOffset > 0){
                        this.isHeaderActive = false;
                    }
                }else{
                    if(type == 'home'){
                        this.isHeaderActive = true;
                        this.isHomeActive = true;
                    }else{
                        this.isHeaderActive = false;
                        this.isHomeActive = false;
                    }
                }

                this.showDiscount = false;
                this.showSupport = false;
                this.showAPP = false;
                this.showGift = false;

                for(var i = 0; i < this.venueList.length; i++){
                    if(this.venueList[i].type == type){
                        this.venueList[i].show = true
                    }
                    if(this.venueList[i].type != type){
                        this.venueList[i].show = false
                    }
                }
                this.headerType = type
            },
            // 上拉所有的
            headerOut() {
                for(var i = 0; i < this.venueList.length; i++){
                    this.venueList[i].show = false
                }
                this.headerType = '';

                this.showDiscount = false;
                this.showSupport = false;
                this.showAPP = false;
                this.showGift = false;

                if(this.$route.path == '/home'){
                    if(window.pageYOffset > 0){
                        this.isHeaderActive = true;
                    }
                }else{
                    this.isHeaderActive = true;
                    this.isHomeActive = false
                }
            },
            // 其他下拉
            headerOver (type) {
                if(this.$route.path == '/home'){
                    if(window.pageYOffset > 0){
                        this.isHeaderActive = false;
                    }
                }else{
                    this.isHeaderActive = false;
                }

                for(var i = 0; i < this.venueList.length; i++){
                    this.venueList[i].show = false
                }
                this.headerType = '';

                if(type == 'discount'){
                    this.showSupport = false;
                    this.showAPP = false;
                    this.showGift = false;
                    this.showDiscount = true;
                }
                if(type == 'support'){
                    this.showDiscount = false;
                    this.showAPP = false;
                    this.showGift = false;
                    this.showSupport = true;
                }
                if(type == 'app'){
                    this.showDiscount = false;
                    this.showSupport = false;
                    this.showGift = false;
                    this.showAPP = true;
                }
                if(type == 'gift'){
                    this.showDiscount = false;
                    this.showSupport = false;
                    this.showAPP = false;
                    this.showGift = true;
                }
            },
            listenerFunction(e) {
                document.addEventListener('scroll', this.handleScroll, true);
            },
            handleScroll () {
                if(window.pageYOffset <= 50){
                    this.isHeaderActive = false
                }else{
                    this.isHeaderActive = true;
                }
            },
            // vip
            goVipClick () {
                if(localStorage.getItem('access_token')){
                    this.$router.push('/vipDetails')
                }else{
                    this.showLoginTs = true;
                }
            },
            // 登出
            logoutClick() {
                localStorage.removeItem('access_token');
                localStorage.removeItem('expires_time');
                localStorage.removeItem('user');
                localStorage.removeItem('userMoney');
                localStorage.removeItem('mobile');
                this.$cookies.remove('games');
                this.$cookies.remove('dptName');
                this.$router.push('/login')
                logoutApi().then(res => {

                }).catch(err => {

                })
            }
        }, 
        created () {
            if(this.$route.path == '/home'){
                this.listenerFunction();
                if(window.pageYOffset <= 0){
                    this.isHeaderActive = false
                }else{
                    this.isHeaderActive = true;
                }
            }else{
                this.isHeaderActive = true;
                this.nemuList[0].isActive = false
            }
            
            for(var i = 0; i < this.nemuList.length; i++) {
                if(this.nemuList[i].url == this.$route.path){
                    this.nemuList[i].isActive = true
                }
            };

            if(localStorage.getItem('access_token')){
                this.userInit();
            }
        },
        watch: {
            $route(to, from) {
                for(var i = 0; i < this.nemuList.length; i++) {
                    this.nemuList[i].isActive = false;
                    if(this.nemuList[i].url == to.path){
                        this.nemuList[i].isActive = true
                    }
                };
            }
        },
        beforeDestroy () {
            document.removeEventListener("scroll", this.listenerFunction);
        },
    }
</script>

<style scoped>
    @import url(../assets/css/header.css);
</style>