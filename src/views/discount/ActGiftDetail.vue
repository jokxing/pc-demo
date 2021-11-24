<template>
    <div class="ActGiftDetail preferentialActivity_bg">
        <headers></headers>

        <a-row class="preferentialActivity_banner"></a-row>

        <a-row class="sign">
            <h4 class="primary_color">签满7日得更多礼品</h4>

            <a-row class="progres">
                <ul>
                    <li v-for="(item, index) in progress" :key="index">
                        <div class="strip" 
                            :class="{ active: index + 1 < nextStep, last: index + 1 == nextStep, complete: signDay == 7 }">
                        </div>
                        <p>
                            <span v-if="index + 1 > signDay">未签</span>
                            <span v-if="index + 1 <= signDay">已签</span>
                        </p>
                        <div class="check" :class="{ active: index + 1 <= signDay }">
                            <img src="../../assets/img/discount/checkIcon.png">
                        </div>
                        <p>第{{ index + 1 }}天</p>
                    </li>
                </ul>
            </a-row>

            <a-row class="btn">
                <button class="gradients_btn" :disabled="q.info.signed == 1" @click="signClick">
                    <span v-if="q.info.signed == 0">点击签到</span>
                    <span v-if="q.info.signed == 1">已签到</span>
                </button>
                <p v-if="!is_token">请登录后查看</p>
                <p v-else>您已经连续签到 <span class="primary_color">{{ signDay }}</span> 天，再接再厉哦！</p>
            </a-row> 
        </a-row>

        <a-row class="activity_rules">
            <h4>活动细则</h4>

            <table v-if="q != ''">
                <thead>
                    <tr>
                        <th>时间</th>
                        <th>表头1</th>
                        <th>表头2</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(v, index) in q.list.list" :key="index">
                        <td>{{ v.day }}</td>
                        <td>{{ v.give_money }}</td>
                        <td>{{ v.give_money_2 }}</td>
                    </tr>
                </tbody>
            </table>

            <ul v-if="q != ''">
                <li>
                    <span>1</span>
                    内容内容内容内容内容内容
                </li>
                <li>
                    <span>2</span>
                    内容内容内容内容内容内容
                </li>
                <li>
                    <span>3</span>
                    内容内容内容内容内容内容
                </li>
            </ul>
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
        data() {
            return {
                showLoading: false,
                is_token: false,
                progress:['','','','','','',''],
                q:{
                    list:'',
                    info:'',
                },
                // 已签的天数
                signDay: "",
                nextStep: 0,
            }
        },
        methods: {
            ActGiftDetail () {
                var _this = this;
                this.showLoading = true;
                var data = '?type=SignBonus'
                ActGiftDetailApi(data).then(res => {
                    _this.showLoading = false;
                    _this.q = res.data.message;

                    if(res.data.message.info.content.length == 0){
                        _this.signDay = 0
                    }
                    if(res.data.message.info.content != ''){
                        var obj = Object.keys(res.data.message.info.content)
                        _this.signDay = obj[obj.length - 1]
                    }
                    if(localStorage.getItem('access_token')){
                        _this.nextStep = res.data.message.info.nextStep
                    }else{
                        _this.nextStep = 0
                    }
                }).catch(err => {
                    _this.showLoading = false
                })
            },
            // 签到
            signClick () {
                if(localStorage.getItem('access_token')){
                    this.nextStep++;
                    this.signDay++;
                    this.q.info.signed = 1
                }else{
                    this.$info({
                        title: '信息',
                        content: '请登入后再进行申请！',
                        onOk() {
                            _this.$router.push('/login')
                        }
                    })
                }
            },
        },
        mounted () {
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
        }
    }
</script>

<style scoped>
    @import url(../../assets/css/preferentialActivity.css);
</style>