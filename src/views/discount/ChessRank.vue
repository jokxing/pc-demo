<template>
    <div class="ChessRank preferentialActivity_bg">
        <headers></headers>

        <a-row class="preferentialActivity_banner"></a-row>

        <a-row class="preferentialActivity_inner">
            <a-row class="activity_conditions">
                <h3>活动说明</h3>
                <p>活动对象：<span class="primary_color">对象</span></p>
                <p>活动时间：<span class="primary_color">{{ q.start_time }} ~ {{ q.end_time }}</span></p>
                <p>活动内容：<span class="primary_color">活动内容活动内容活动内容。</span></p>
            </a-row>

            <a-row class="ChessRank_Duel">
                <h3 class="primary_color">标题</h3>
                <div class="count_down fix">
                    倒计时
                    <span>{{ date1 }}</span>
                    天
                    <span>{{ date2 }}</span>
                    <span>{{ date3 }}</span>
                    时
                    <span>{{ date4 }}</span>
                    <span>{{ date5 }}</span>
                    分
                    <span>{{ date6 }}</span>
                    <span>{{ date7 }}</span>
                    秒
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>排行榜单</th>
                            <th>表头1</th>
                            <th>表头2</th>
                            <th>表头3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="startTime > curTime" v-for="v in list">
                            <td>—</td>
                            <td>—</td>
                            <td>—</td>
                            <td>—</td>
                        </tr>
                        <tr v-if="startTime < curTime" v-for="v in list" :key="v.id">
                            <td>{{ v.id }}</td>
                            <td>{{ v.name }}</td>
                            <td>{{ v.betAmount }}</td>
                            <td>{{ v.handsel }}</td>
                        </tr> 
                    </tbody>
                </table>

                <div class="duel_more primary_color fix" v-if="list.length < allList.length" @click="moreClick">点击加载更多</div>
                <div class="duel_more primary_color fix" v-if="list.length >= allList.length && startTime < curTime" @click="retractClick">点击收起</div>
            </a-row>

            <a-row class="activity_rules">
                <h4>活动规则：</h4>
                <ul>
                    <li>
                        <span>1</span>
                        内容内容内容；
                    </li>
                    <li>
                        <span>2</span>
                        内容内容内容；
                    </li>
                </ul>
            </a-row>
        </a-row>

        <footers></footers>

        <a-spin v-show="showLoading"></a-spin>
    </div>
</template>

<script>
    import headers from '../../components/header';
    import footers from '../../components/footer';
    import { ActGiftDetailApi } from '../../http/api'
    export default {
        data () {
            return {
                showLoading: false,
                is_token: false,
                date1: 0,
                date2: 0,
                date3: 0,
                date4: 0,
                date5: 0,
                date6: 0,
                date7: 0,
                q: "",
                ulist: {
                    betAmount: 0,
                    handsel: 0,
                    id: 0
                },
                allList: [],
                list: [],
                set: null,
                curTime: "",
                startTime: "",
                endTime: "",
                i: 20,
                j: 20,
            }
        },
        methods: {
            ActGiftDetail() {
                var _this = this;
                this.showLoading = true;
                var data = "?type=ChessRank";
                ActGiftDetailApi(data).then(res => {
                    _this.showLoading = false;
                    _this.q = res.data.message;
                    _this.ulist = res.data.message.ulist;

                    _this.allList = res.data.message.list;
                    _this.list = res.data.message.list.slice(0,20);

                    _this.curTime = res.data.message.curTime;
                    _this.startTime = res.data.message.start_time_str;
                    _this.endTime = res.data.message.end_time_str;
                    if(_this.startTime > _this.curTime){
                        // 开始之前
                        _this.list.length = 20
                    }else{ //开始之后
                        // 倒计时已结束
                        if(_this.endTime <= _this.curTime){
                            _this.date1 = 0;
                            _this.date2 = 0;
                            _this.date3 = 0;
                            _this.date4 = 0;
                            _this.date5 = 0;
                            _this.date6 = 0;
                            _this.date7 = 0;
                        }else{ //倒计时
                            var t = _this.endTime - _this.curTime;
                            _this.getRTime(t)
                            _this.set = window.setInterval(function(){
                                _this.curTime++
                                var t = _this.endTime - _this.curTime;
                                _this.getRTime(t)
                                if(_this.endTime <= _this.curTime){
                                    window.clearInterval(_this.set)
                                }
                            },1000)
                        }
                    }   
                }).catch(err => {
                    _this.showLoading = false;
                })
            },
            getRTime: function (t){
                var d = Math.floor(t/60/60/24);//天
                var h = Math.floor(t/60/60%24);//时
                var m = Math.floor(t/60%60);//分
                var s = Math.floor(t%60);//秒
                this.date1 = d;
                if(h < 10){
                    this.date2 = 0;
                    this.date3 = h;
                }else{
                    this.date2 = ("" + h).slice(0,1)
                    this.date3 = ("" + h).slice(1,2)
                }
                if(m < 10){
                    this.date4 = 0;
                    this.date5 = m;
                }else{
                    this.date4 = ("" + m).slice(0,1)
                    this.date5 = ("" + m).slice(1,2)
                }
                if(s < 10){
                    this.date6 = 0;
                    this.date7 = s;
                }else{
                    this.date6 = ("" + s).slice(0,1)
                    this.date7 = ("" + s).slice(1,2)
                }
            },
            // 点击加载更多
            moreClick: function () {
                this.i += 20
                this.list.push(...this.allList.slice(this.j,this.i))
                this.j = this.i
            },
            // 点击收起
            retractClick: function () {
                this.i = 20;
                this.j = 20;
                this.list = this.list.slice(0,20)
            },
        },
        mounted() {
            if(localStorage.getItem('access_token')){
                this.is_token = true
            }else{
                this.is_token = false
            }

            this.ActGiftDetail()
        },
        components: {
            headers,
            footers
        },
        beforeDestroy() {
            window.clearInterval(this.set)
            this.set = null
        },
    }
</script>

<style scoped>
    @import url(../../assets/css/preferentialActivity.css);
</style>