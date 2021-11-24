<template>
    <div class="luxury_gift DptGift">
        <headers></headers>

        <a-row class="preferentialActivity_banner"></a-row>

        <a-row class="my_money" v-if="is_token">
            <p class="primary_color"></p>
        </a-row>

        <a-row class="luxury_gift_list">
            <ul class="fix">
                <li v-for="v in list.moneyList" :key="v.id">
                    <img :src="v.picUrl" />
                    <div class="img_select">
                        <a-tooltip v-for="(item,index) in v.pic" :key="index">
                            <template slot="title">
                                {{ item.name }}
                            </template>
                            <img :src="item.url" :class="{ active: item.name == v.picName }" @click="selectImgClick(v,item)" />
                        </a-tooltip>
                    </div>
                    <h5>{{ v.gift }}</h5>
                    <h4 class="primary_color">{{ v.money }}</h4>
                    <button class="gradients_btn" @click="applyClick">立即兑换</button>
                </li>
            </ul>
        </a-row>

        <a-row class="activity_rules">
            <h4>活动规则：</h4>
            <ul>
                <li>
                    <span>1</span>
                    内容内容内容
                </li>
                <li>
                    <span>2</span>
                    内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                </li>
                <li>
                    <span>3</span>
                    内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
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
        data () {
            return {
                showLoading: false,
                is_token: false,
                list: [],
            }
        },
        methods: {
            ActGiftDetail() {
                var _this = this;
                this.showLoading = true;
                var data = '?type=DptGift';
                ActGiftDetailApi(data).then(res => {
                    _this.showLoading = false;
                    _this.list = res.data.message;
                    for(var i = 0; i < _this.list.moneyList.length; i++){
                        for(var j = 0; j < _this.list.giftList.length; j++){
                            if(_this.list.moneyList[i].id == _this.list.giftList[j].id){
                                _this.list.moneyList[i]['picUrl'] = _this.list.giftList[j].pic[0].url;
                                _this.list.moneyList[i]['picName'] = _this.list.giftList[j].pic[0].name;
                                _this.list.moneyList[i]['pic'] = _this.list.giftList[j].pic
                            }
                        }
                    }
                }).catch(err => {
                    _this.showLoading = false;
                })
            },
            selectImgClick(v,item) {
                v.picName = item.name; 
                v.picUrl = item.url
                this.$forceUpdate()
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