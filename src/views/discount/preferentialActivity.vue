<template>
    <div id="preferentialActivity">
        <headers></headers>

        <div class="preferentialActivity_banner_par">
            <div class="preferentialActivity_banner"></div>
        </div>

        <a-layout-content class="preferentialActivity_inner">
            <div class="sider">
                <ul>
                    <li 
                        v-for="(item, index) in siderTabs" 
                        :key="index"
                        :class="{ 'tab_actvie':siderTabNum == index}"
                        @click="siderTabNum = index; stateText = item.name">{{ item.name }}</li>
                </ul>
            </div>

            <a-row class="tab">
                <ul>
                    <li 
                        v-for="(item,index) in tabs" 
                        :key="index"
                        :class="{ 'tab_actvie': tabNum == index }"
                        @click="tabNum = index;type = item.type">
                        <img :src="tabNum == index ? item.iconActive : item.icon" width="28">
                        {{ item.name }}
                    </li>
                </ul>
            </a-row>

            <a-row class="list" v-if="showDiscountList">
                <ul>
                    <li 
                        v-for="(item,index) in discountList" 
                        :key="index" 
                        v-if="(type == '' || item.type == type) && (stateText == '全部' || item.stateText == stateText)">
                            <router-link :to="item.url">
                                <div class="imgBox">
                                    <img :src="item.img" :onerror="defaultImg">
                                </div>
                                <div class="itemText">
                                    <h5>{{ item.title }}</h5>
                                    <p>{{ item.date }}</p>
                                    <em :class="{red: item.time == '已结束', green: item.time == '进行中'}">{{ item.time }}</em>
                                </div>
                                <span class="state" :class='"state_" + item.state' v-if="item.state == 0">新人</span>
                                <span class="state" :class='"state_" + item.state' v-if="item.state == 1">日常</span>
                                <span class="state" :class='"state_" + item.state' v-if="item.state == 2">最新</span>
                            </router-link>
                    </li>
                </ul>
            </a-row>
        </a-layout-content>

        <footers></footers>

        <a-spin v-show="showLoading"></a-spin>
    </div>
</template>

<script>
    import headers from '../../components/header'
    import footers from '../../components/footer'
    import { ActGiftDetailApi } from '../../http/api'
    export default {
        data() {
            return {
                showLoading: false,
                showDiscountList: false,
                siderTabs: [
                    {
                        name: '全部',
                    },
                    {
                        name: '进行中',
                    },
                    {
                        name: '未开始',
                    },
                    {
                        name: '已结束',
                    },
                ],
                stateText: "全部",
                siderTabNum: 0,
                tabs: [
                    {
                        name: '全部',
                        type: '',
                        icon: require('../../assets/img/discount/icon_all.png'),
                        iconActive: require('../../assets/img/discount/icon_all_on.png'),
                    },
                    {
                        name: 'tab1',
                        type: 'dpt',
                        icon: require('../../assets/img/discount/icon_policy.png'),
                        iconActive: require('../../assets/img/discount/icon_policy_on.png'),
                    },
                    {
                        name: 'tab2',
                        type: 'beat',
                        icon: require('../../assets/img/discount/icon_policy.png'),
                        iconActive: require('../../assets/img/discount/icon_policy_on.png'),
                    },
                    {
                        name: 'tab3',
                        type: 'digital',
                        icon: require('../../assets/img/discount/icon_policy.png'),
                        iconActive: require('../../assets/img/discount/icon_policy_on.png'),
                    },
                    {
                        name: 'tab4',
                        type: 'insu',
                        icon: require('../../assets/img/discount/icon_policy.png'),
                        iconActive: require('../../assets/img/discount/icon_policy_on.png'),
                    },
                ],
                type: '',
                tabNum: 0,
                // 列表
                discountList: [
                    {
                        type: 'insu',
                        state: 2,
                        img: require("../../assets/img/discount/kingMeal_img.png"),
                        title: "标题1",
                        date: "",
                        url: '/kingMeal',
                        time: "",
                        stateText: "",
                        sort: 1
                    },
                    {
                        type: "beat",
                        state: 1,
                        img: require("../../assets/img/discount/kingMeal_img.png"),
                        title: "标题2",
                        date: "",
                        url: '/ChessRank',
                        time: "",
                        stateText: "",
                        sort: 1
                    },
                    {
                        type: "beat",
                        state: 1,
                        img: require("../../assets/img/discount/kingMeal_img.png"),
                        title: "标题3",
                        date: "",
                        url: '/ChessSave',
                        time: "",
                        stateText: "",
                        sort: 1
                    },
                    {
                        type: "beat",
                        state: 1,
                        img: require("../../assets/img/discount/kingMeal_img.png"),
                        title: "标题4",
                        date: "",
                        url: '/ChessHand',
                        time: "",
                        stateText: "",
                        sort: 1
                    },
                    {
                        type: "dpt",
                        state: 0,
                        img: require("../../assets/img/discount/kingMeal_img.png"),
                        title: "标题5",
                        date: "长期活动",
                        url: '/DptGift',
                        time: "进行中",
                        stateText: "进行中",
                        sort: 1
                    },
                    {
                        type: "digital",
                        state: 2,
                        img: require("../../assets/img/discount/kingMeal_img.png"),
                        title: "标题6",
                        date: "未开始",
                        time: '敬请期待',
                        url: '/UsdtDptBonus',
                        stateText: "未开始",
                        sort: 1
                    },
                    {
                        type: "digital",
                        state: 2,
                        img: require("../../assets/img/discount/kingMeal_img.png"),
                        title: "标题7",
                        date: "长期活动",
                        url: '/UsdtRefund',
                        time: "进行中",
                        stateText: "进行中",
                        sort: 1
                    },
                    {
                        type: "beat",
                        state: 1,
                        img: require("../../assets/img/discount/kingMeal_img.png"),
                        title: "标题8",
                        date: "长期活动",
                        url: '/ActGiftDetail',
                        time: "进行中",
                        stateText: "进行中",
                        sort: 1
                    },
                ],
                defaultImg: 'this.src="' + require('../../assets/img/discount/preferentialActivity_loading.png') + '"',
            }
        },
        methods: {
            // 列表
            ActGiftDetailList () {
                var _this = this;
                this.showLoading = true;
                var data = '?type=List';
                ActGiftDetailApi(data).then(res => {
                    _this.showLoading = false;
                    var myGetTime = new Date().getTime() / 1000;
                    // 标题2获取时间戳
                    var chess_sTime = res.data.message.chess.start_time_str;
                    var chess_eTime = res.data.message.chess.end_time_str;
                    // 标题4获取时间戳
                    var chess_hand_sTime = res.data.message.chess_hand.start_time_str;
                    var chess_hand_eTime = res.data.message.chess_hand.end_time_str;
                    // 标题3获取时间戳
                    var chess_save_sTime = res.data.message.chess_save.start_time_str;
                    var chess_save_eTime = res.data.message.chess_save.end_time_str;
                    // 标题1获取时间戳
                    var beat_time = res.data.message.beat.beat_time_str;

                    for(let i = 0; i < _this.discountList.length; i++){
                        // 标题2倒计时
                        if(_this.discountList[i].url == '/ChessRank'){
                            _this.discountList[i].date = res.data.message.chess.start_time + "~" + res.data.message.chess.end_time
                            if(myGetTime < chess_sTime){
                                var t = chess_sTime - myGetTime;
                                _this.discountList[i].time = _this.getRTime(t);
                                _this.discountList[i].stateText = '未开始';
                                var chessSet = setInterval(function(){
                                    myGetTime ++
                                    var t = chess_sTime - myGetTime;
                                    if(_this.discountList[i].url == '/ChessRank'){
                                        _this.discountList[i].time = _this.getRTime(t);
                                        if(myGetTime > chess_sTime){
                                            clearInterval(chessSet);
                                            _this.discountList[i].time = "进行中";
                                            _this.discountList[i].stateText = '进行中';
                                        }
                                    }
                                },1000) 
                            }
                            if(myGetTime > chess_sTime && myGetTime < chess_eTime){
                                _this.discountList[i].time = "进行中";
                                _this.discountList[i].stateText = '进行中';
                            } 
                            if (myGetTime > chess_eTime) {
                                _this.discountList[i].time = "已结束";
                                _this.discountList[i].stateText = '已结束';
                            }
                        }

                        // 标题4赛倒计时
                        if(_this.discountList[i].url == '/ChessHand'){
                            _this.discountList[i].date = res.data.message.chess_hand.start_time + "~" + res.data.message.chess_hand.end_time;
                            if(myGetTime < chess_hand_sTime){
                                var t = chess_hand_sTime - myGetTime;
                                _this.discountList[i].time = _this.getRTime(t);
                                _this.discountList[i].stateText = '未开始';
                                var chessHandSet = setInterval(function(){
                                    myGetTime ++
                                    var t = chess_hand_sTime - myGetTime;
                                    _this.discountList[i].time = _this.getRTime(t);
                                    if(myGetTime > chess_hand_sTime){
                                        clearInterval(chessHandSet);
                                        _this.discountList[i].time = "进行中";
                                        _this.discountList[i].stateText = '进行中';
                                    }
                                },1000) 
                            }
                            if(myGetTime > chess_hand_sTime && myGetTime < chess_hand_eTime){
                                _this.discountList[i].time = "进行中";
                                _this.discountList[i].stateText = '进行中';
                            } 
                            if (myGetTime > chess_hand_eTime) {
                                _this.discountList[i].time = "已结束";
                                _this.discountList[i].stateText = '已结束';
                            }
                        };

                        // 标题3金倒计时
                        if(_this.discountList[i].url == '/ChessSave'){
                            _this.discountList[i].date = res.data.message.chess_save.start_time + "~" + res.data.message.chess_save.end_time;
                            if(myGetTime < chess_save_sTime){
                                var t = chess_save_sTime - myGetTime;
                                _this.discountList[i].time = _this.getRTime(t);
                                _this.discountList[i].stateText = '未开始';
                                var chessSaveSet = setInterval(function(){
                                    myGetTime ++
                                    var t = chess_save_sTime - myGetTime;
                                    if(_this.discountList[i].url == '/ChessSave'){
                                        _this.discountList[i].time = _this.getRTime(t);
                                        if(myGetTime > chess_save_sTime){
                                            clearInterval(chessSaveSet);
                                            _this.discountList[i].time = "进行中";
                                            _this.discountList[i].stateText = '进行中';
                                        }
                                    }
                                },1000) 
                            }
                            if(myGetTime > chess_save_sTime && myGetTime < chess_save_eTime){
                                _this.discountList[i].time = "进行中";
                                _this.discountList[i].stateText = '进行中';
                            } 
                            if (myGetTime > chess_save_eTime) {
                                _this.discountList[i].time = "已结束";
                                _this.discountList[i].stateText = '已结束';
                            }
                        };

                        // 标题1倒计时
                        if(_this.discountList[i].url == '/kingMeal'){
                            _this.discountList[i].date = res.data.message.beat.beat_time;
                            if(myGetTime < beat_time){
                                var t = beat_time - myGetTime;
                                _this.discountList[i].time = _this.getRTime(t);
                                _this.discountList[i].stateText = '进行中';
                                var beatTimeSet = setInterval(function(){
                                    myGetTime ++
                                    var t = beat_time - myGetTime;
                                    if(_this.discountList[i].url == '/kingMeal'){
                                        _this.discountList[i].time = _this.getRTime(t);
                                        if(myGetTime > beat_time){
                                            clearInterval(beatTimeSet);
                                            _this.discountList[i].time = "已结束";
                                            _this.discountList[i].stateText = '已结束';
                                        }
                                    }
                                },1000) 
                            }else{
                                _this.discountList[i].time = "已结束";
                                _this.discountList[i].stateText = '已结束';
                            }
                             // 标题1固定第一
                            _this.discountList[i].sort = 1
                        }else{
                            // 根据进行中-长期活动-未开始-结束顺序
                            if(_this.discountList[i].time == '进行中'){
                                _this.discountList[i].sort = 2
                            }
                            if(_this.discountList[i].date == '长期活动'){
                                _this.discountList[i].sort = 3
                            }
                            if(_this.discountList[i].time != '进行中' && _this.discountList[i].time != '已结束' && _this.discountList[i].date != '长期活动'){
                                _this.discountList[i].sort = 4
                            }
                            if(_this.discountList[i].time == '已结束'){
                                _this.discountList[i].sort = 5
                            }
                        }
                    }
                    _this.discountList = _this.insertSort(_this.discountList);
                    _this.showDiscountList = true;
                }).catch(err => {
                    _this.showLoading = false;
                })
            },
            // 处理排序
            insertSort (arr) {
                var len = arr.length;
                for(var i = 0; i < len; i++){
                    for(var j = 0; j < len - 1 - i; j++){
                        if(arr[j].sort > arr[j+1].sort){
                            var temp = arr[j+1];
                            arr[j+1] = arr[j];
                            arr[j] = temp;
                        }
                    }
                }
                return arr;
            },
            // 倒计时格式化
            getRTime (t){
                var d = Math.floor(t/60/60/24);//天
                var h = Math.floor(t/60/60%24);//时
                var m = Math.floor(t/60%60);//分
                var s = Math.floor(t%60);//秒
                this.date1 = d;
                if(h < 10){
                    h = "0" + h
                }
                if(m < 10){
                    m = "0" + m
                }
                if(s < 10){
                    s = "0" + s
                }
                var text
                if(d == 0){
                    text = h + "小时" + m + "分钟" + s + "秒"
                }else if(d == 0 && h == 0){
                    text = m + "分钟" + s + "秒"
                }else if(d == 0 && h == 0 && m == 0){
                    text = s + "秒"
                }else{
                    text = d + "天" + h + "小时" + m + "分钟" + s + "秒"
                }
                return text
            },
        },
        mounted () {
            this.ActGiftDetailList()
        },
        components: {
            headers,
            footers
        }
    }
</script>

<style scoped>
    @import url(../../assets/css/preferentialActivity.css);
</style>