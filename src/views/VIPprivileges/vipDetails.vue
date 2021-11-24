<template>
    <div id="vipDetails">
        <headers></headers>

        <a-row class="vip_banner"></a-row>

        <a-row class="vip_title">
            <p>标 题</p>
        </a-row>

        <div v-if="q.length > 0">
            <a-row class="vip_tab">
                <ul>
                    <li v-for="(item,index) in q.slice(1,11)" :key="index" :class="{ 'tab_actvie': num == index }" @click="num = index">
                        <img src="../../assets/img/vip/vip_small_level1.png" width="36">
                        {{ item.vip_level }}
                    </li>
                </ul>
            </a-row>

            <a-row class="vip_inner">
                <a-row class="vip_level">
                    <div class="vip_level_img">
                        <img src="../../assets/img/vip/vip_level1.png" width="187">
                    </div>
                    <div class="vip_card gradients_bg">
                        <div class="level_name primary_color">{{ q[num+1].vip_level }}</div>
                        <div class="vip_level_name">VIP等级： {{ q[num+1].vip_level }}</div>
                        <div class="vip_upgrade_dpt">
                            <p>累计</p>
                            <h3>{{ q[num].member_vip.upgrade_dpt }}</h3>
                        </div>
                        <div class="vip_upgrade_beat">
                            <ul>
                                <li>
                                    <p>{{ q[num].member_vip.upgrade_beat }}</p>
                                    <span>要求要求</span>
                                </li>
                                <li>
                                    <p>{{ q[num].member_vip.save_beat }}</p>
                                    <span>要求要求</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="vip_privilege fix">
                        <ul>
                            <li>
                                <img src="../../assets/img/vip/vip_privilege1.png" width="62px">
                                <span class="fix">标题</span>
                                <h5>name：{{ q[num + 1].vip_info.upgrade_gift }}</h5>
                            </li>
                            <li>
                                <img src="../../assets/img/vip/vip_privilege1.png" width="62px">
                                <span class="fix">标题</span>
                                <h5>name：{{ q[num + 1].vip_info.every_month_gift }}</h5>
                                <h5>name：{{ q[num + 1].vip_info.every_month_gift }}</h5>
                            </li>
                            <li v-if="q[num + 1].vip_info.birth_gift > 0">
                                <img src="../../assets/img/vip/vip_privilege1.png" width="62px">
                                <span class="fix">标题</span>
                                <h5>name：{{ q[num + 1].vip_info.birth_gift }}</h5>
                            </li>
                        </ul>
                    </div>
                </a-row>

                <a-row class="vip_bonus">
                    <div class="vip_bonus_head">标题</div>
                    <div class="vip_bonus_innder">
                        <a-row class="vip_bonus_word">
                            <div class="left">优惠说明</div>
                            <div class="right">优惠说明</div>
                        </a-row>
                        <div class="vip_bonus_ul">
                            <ul>
                                <li 
                                    v-for="(v,index) in q[num + 1].vip_detail.slice(0,3)"
                                    :key="index"
                                    v-if="v.value != '0%'">
                                        {{ v.name }}：<span class="primary_color">{{ v.value }}</span>
                                </li>
                            </ul>
                            <ul>
                                <li 
                                    v-for="(v,index) in q[num + 1].vip_detail.slice(3,6)"
                                    :key="index"
                                    v-if="v.value != '0%'">
                                        {{ v.name }}：<span class="primary_color">{{ v.value }}</span>
                                </li>
                            </ul>
                            <ul>
                                <li>申请：<span class="primary_color">{{ q[num + 1].member_vip.bonus_apply_amount }}</span></li>
                                <li>可得：<span class="primary_color">{{ q[num + 1].member_vip.bonus_got_amount }}</span></li>
                                <li>要求：<span class="primary_color">{{ q[num + 1].member_vip.bonus_limit_amount }}</span></li>
                            </ul>
                        </div>
                        <button class="gradients_btn" @click="vipActapplyClick(q[num + 1].is_my_vip)">提交</button>
                    </div>
                </a-row>

                <a-row class="vip_table">
                    <div class="vip_table_title">
                        标 题
                    </div>
                    <table>
                        <tr>
                            <th>VIP等级</th>
                            <th v-for="(item,index) in q" :key="index">{{ item.vip_level }}</th>
                        </tr>
                        <tr v-for="(item,index) in q[0].vip_detail.slice(6,14)" :key="index">
                            <td>{{ item.name }}</td>
                            <td v-for="(v, i) in q" :key="i">
                                <span>{{ item.value }}</span>
                            </td>
                        </tr>
                    </table>
                </a-row>

                <a-row class="vip_table">
                    <div class="vip_table_title">
                        标 题
                    </div>
                    <table>
                        <tr>
                            <th>VIP等级</th>
                            <th v-for="(item,index) in q" :key="index">{{ item.vip_level }}</th>
                        </tr>
                        <tr>
                            <td>name</td>
                            <td v-for="(item,index) in q" :key="index">{{ item.vip_info.wtd_count }}</td>
                        </tr>
                        <tr>
                            <td>name</td>
                            <td v-for="(item,index) in q" :key="index">{{ item.vip_info.wtd_money }}</td>
                        </tr>
                    </table>
                </a-row>

                <a-row class="vip_rule">
                    <h5>活动的一般条款与规则:</h5>
                    <ul>
                        <li>
                            标题：
                            <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
                        </li>
                        <li>
                            标题：
                            <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
                        </li>
                    </ul>
                </a-row>
            </a-row>
        </div>

        <footers></footers>

        <a-spin v-show="showLoading"></a-spin>
    </div>
</template>

<script>
    import headers from '../../components/header'
    import footers from '../../components/footer'
    import { uservipinfoApi } from '../../http/api'
    export default {
        data() {
            return {
                showLoading: false,
                num: 0,
                q: []
            }
        },
        methods: {
            uservipinfo() {
                var _this = this;
                this.showLoading = true;
                var data = '';
                uservipinfoApi(data).then(res => {
                    _this.showLoading = false;
                    _this.q = res.data.message
                }).catch(err => {
                    console.log(err)
                    _this.showLoading = false
                })
            },
            // 申请
            vipActapplyClick(index){
                if(index == 1){
                    this.$info({
                        title:'信息',
                        content: "提交成功"
                    })
                }else{
                    this.$error({
                        title: '信息',
                        content: 'VIP等级不符'
                    })
                }
            }
        },
        mounted () {
            this.uservipinfo()
        },
        components: {
            headers,
            footers
        }
    }
</script>

<style scoped>
    @import url(../../assets/css/vipDetails.css);
</style>