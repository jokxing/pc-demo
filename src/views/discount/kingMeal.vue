<template>
    <div class="kingMeal preferentialActivity_bg">
        <headers></headers>

        <a-row class="preferentialActivity_banner"></a-row>

        <a-row class="preferentialActivity_inner">
            <table class="math">
                <thead>
                    <tr>
                        <th>表头1</th>
                        <th>表头2</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <p>{{ q.matchTitle }}</p>
                            <p>{{ q.matchStartTime }}</p>
                        </td>
                        <td>
                            <span>
                                <img :src="q.hostTeamIcon" height="80">
                                <i>{{ q.hostTeamName }}</i>
                            </span>
                            <em>-</em>
                            <span>
                                <img :src="q.guestTeamIcon" height="80">
                                <i>{{ q.guestTeamName }}</i>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <a-row class="activity_conditions">
                <p>活动对象：<span class="primary_color"></span></p>
                <p>活动平台：<span class="primary_color"></span></p>
                <p>活动时间：<span class="primary_color"></span></p>
                <p>活动条件：<span class="primary_color"></span></p>
            </a-row>

            <table>
                <thead>
                    <tr>
                        <th>表头1</th>
                        <th>表头2</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in q.bonus" :key="index">
                        <td>{{ item.name }}</td>
                        <td>{{ item.money }}</td>
                    </tr>
                </tbody>
            </table>

            <p class="activity_remarks">注：内容内容内容内。</p>

            <a-row class="activity_rules">
                <h4>活动规则：</h4>
                <ul>
                    <li>
                        <span>1</span>
                        内容内容内容
                    </li>
                    <li>
                        <span>2</span>
                        内容内容内容
                    </li>
                    <li>
                        <span>3</span>
                        内容内容内容
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
    import { KingMealInfoApi } from '../../http/api'
    export default {
        data () {
            return {
                showLoading: false,
                q: "",
            }
        },
        methods: {
            KingMealInfo() {
                var _this = this;
                this.showLoading = true;
                KingMealInfoApi().then(res => {
                    _this.showLoading = false;
                    _this.q = res.data.message
                }).catch(err => {
                    _this.showLoading = false;
                })
            },
        },
        mounted () {
            this.KingMealInfo()
        },
        components:{
            headers,
            footers
        }
    }
</script>

<style scoped>
    @import url(../../assets/css/preferentialActivity.css);
</style>