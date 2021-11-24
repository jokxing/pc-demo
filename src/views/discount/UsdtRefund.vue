<template>
    <div class="UsdtRefund preferentialActivity_bg">
        <headers></headers>

        <a-row class="preferentialActivity_banner"></a-row>

        <a-row class="preferentialActivity_inner">
            <a-row class="activity_conditions">
                <h3 class="primary_color">活动内容</h3>
                <p>活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容</p>
            </a-row>

            <table
                cellspacing="0">
                <!-- 顶部title -->
                <tr>
                    <th>表头1</th>
                    <th>表头2</th>
                    <th>表头3</th>
                    <th>表头4</th>
                </tr>
                <!-- template不会被渲染 -->
                <template v-for="(item,index) in q.data">
                    <!-- 左侧跨行区域 -->
                    <tr>
                        <td :rowspan="item.list.length+1" class="td_left">{{ item.name.split(" ")[0] }} <br> {{ item.name.split(" ")[1] }} <br> {{ item.name.split(" ")[2] }}</td>
                    </tr>
                    <tr v-for="(child,index) in item.list">
                        <td>
                            {{child.deposit_money}}<br><span>({{ child.deposit_money*7 }})</span>
                        </td>
                        <td>
                            {{child.deposit_money}}<br><span>({{ child.deposit_money*7 }})</span>
                        </td>
                        <td>
                            {{child.monthly_rebate_rate}}<br><span>({{ child.monthly_rebate_rate*7 }})</span>
                        </td>
                    </tr>
                </template>
                <tr>
                    <td colspan="4">内容</td>
                </tr>
            </table>

            <a-row class="btn">
                <button class="gradients_btn" @click="applyClick">提交</button>
            </a-row>

            <a-row class="activity_rules">
                <h4>活动规则：</h4>
                <ul>
                    <li>
                        <span>1</span>
                        活动规则内容活动规则内容活动规则内容活动规则内容
                    </li>
                    <li>
                        <span>2</span>
                        活动规则内容活动规则内容活动规则内容活动规则内容
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
        data() {
            return {
                showLoading: false,
                is_token: false,
                q: '',
            }
        },
        methods: {
            ActGiftDetail () {
                var _this = this;
                this.showLoading = true;
                var data = '?type=UsdtRefund'
                ActGiftDetailApi(data).then(res => {
                    _this.showLoading = false;
                    _this.q = res.data.message
                }).catch(err => {
                    _this.showLoading = false
                })
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