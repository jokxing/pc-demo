<template>
    <div class="myVip">
        <div v-if="q.length > 0">
            <a-row class="level">
                <div class="line"></div>

                <a-row class="top">
                    <div class="medal">{{ currentLevel }}</div>
                    <h5>当前等级：{{ currentLevel }}</h5>
                    <a-row class="cumulative">
                        <p>累计type1：<span>{{ completed_dpt }}元</span></p>
                        <p>累计type2：<span>{{ completed_beat }}元</span></p>
                    </a-row>
                    <p class="ts">提示：您需要完成{{ upgrade_dpt }}type1和{{ upgrade_beat }}type2升级至{{ nextLevel }}</p>
                    <div class="vip_details" @click="$router.push('/vipDetails')">查看VIP详情<a-icon type="double-right" /></div>
                </a-row>

                <a-row class="level_name">
                    <ul>
                        <li v-for="(item,index) in q" :key="index" :class="{ active: item.is_my_vip == 1}">{{ item.vip_level }}</li>
                    </ul>

                    <a-progress stroke-linecap="square" :percent="levelPercent" :showInfo=false strokeColor="#EFA870" :strokeWidth="12" />
                </a-row>

                <p class="next_level">距离下一等级：{{ nextLevel }}</p>

                <a-row class="bottom">
                    <span>type1</span>
                    <a-progress stroke-linecap="square" :percent="dptPercent" :showInfo=false strokeColor="#EFA870" :strokeWidth="8" />
                    <span>还需{{ upgrade_dpt }}</span>
                </a-row>

                <a-row class="bottom">
                    <span>type2</span>
                    <a-progress stroke-linecap="square" :percent="beatPercent" :showInfo=false strokeColor="#EFA870" :strokeWidth="8" />
                    <span>还需{{ upgrade_beat }}</span>
                </a-row>
            </a-row>

            <a-row class="vip_enjoy">
                <h5 class="title">VIP{{ currentLevel }}尊享<button class="gradients_btn" @click="$router.push('/vipDetails')">申请福利</button></h5>
                <ul>
                    <li>
                        <img src="../../assets/img/user/promotion_gift.png">
                        <p class="item_num">{{ vip_info.wtd_count }}</p>
                        <p>name</p>
                    </li>
                    <li>
                        <img src="../../assets/img/user/promotion_gift.png">
                        <p class="item_num">{{ vip_info.wtd_money }}</p>
                        <p>name</p>
                    </li>
                    <li>
                        <img src="../../assets/img/user/promotion_gift.png">
                        <p class="item_num">{{ vip_info.upgrade_gift }}</p>
                        <p>name</p>
                    </li>
                    <li>
                        <img src="../../assets/img/user/promotion_gift.png">
                        <p class="item_num">{{ vip_info.birth_gift }}</p>
                        <p>name</p>
                    </li>
                    <li>
                        <img src="../../assets/img/user/promotion_gift.png">
                        <p class="item_p">name</p>
                        <span>name： {{ vip_info.every_month_gift }}</span>
                        <span>name： {{ vip_info.every_month_gift }}</span>
                    </li>
                    <li>
                        <img src="../../assets/img/user/promotion_gift.png">
                        <p class="item_p">name</p>
                        <span>name：{{ vip_info.dpt_count }}</span>
                        <span>name：{{ vip_info.dpt_rate }}</span>
                    </li>
                </ul>
            </a-row>

            <a-row class="vip_promotion">
                <h5 class="title">VIP晋级优惠</h5>
                <ul>
                    <li v-for="(item,index) in vip_detail" :key="index">
                        <span class="primary_color">{{ item.value }}</span>
                        <span>{{ item.name }}</span>
                    </li>
                </ul>
            </a-row>
        </div>

        <a-spin v-show="showLoading"></a-spin>
    </div>
</template>

<script>
    import { uservipinfoApi } from '../../http/api'
    export default {
        data () {
            return {
                showLoading: false,
                q: [],
                // 当前等级
                currentLevel: '',
                // 下一个等级
                nextLevel: '',
                // 需要完成type1和type2
                upgrade_dpt: '',
                upgrade_beat: '',
                // 已完成type1和type2
                completed_dpt: '',
                completed_beat: '',
                // 等级进度
                levelPercent: 0,
                // type1进度
                dptPercent: 0,
                // type2进度
                beatPercent: 0,
                // VIP尊享
                vip_info: '',
                // VIP晋级优惠
                vip_detail: []
            }
        },
        methods: {
            uservipinfo () {
                var _this = this;
                this.showLoading = true;
                var data = '';
                uservipinfoApi(data).then(res => {
                    _this.showLoading = false;
                    _this.q = res.data.message;
                    for(var i = 0; i < _this.q.length; i++){
                        if(_this.q[i].is_my_vip == 1){
                            _this.currentLevel = _this.q[i].vip_level;
                            _this.upgrade_dpt = _this.q[i].member_vip.upgrade_dpt;
                            _this.upgrade_beat = _this.q[i].member_vip.upgrade_beat;
                            _this.completed_dpt = _this.q[i].member_vip.completed_dpt;
                            _this.completed_beat = _this.q[i].member_vip.completed_beat;
                            
                            _this.levelPercent = i * 10;
                            _this.dptPercent = (100 / _this.upgrade_dpt) * _this.completed_dpt;
                            _this.beatPercent = (100 / _this.upgrade_beat) * _this.completed_beat;

                            _this.nextLevel = _this.q[i+1].vip_level;

                            _this.vip_info = _this.q[i].vip_info;

                            _this.vip_detail = _this.q[i].vip_detail
                        }
                    }
                }).catch(err => {
                    _this.showLoading = false;
                })
            }
        },
        mounted () {
            this.uservipinfo()
        }
    }
</script>

<style scoped>
    @import url(../../assets/css/myVip.css);
</style>