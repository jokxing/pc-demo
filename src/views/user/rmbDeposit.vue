<template>
    <div>
        <div class="deposit_money" v-if="step == 1">
            <dl class="fix">
                <dt>选择1：</dt>
                <dd>
                    <ul>
                        <li 
                            v-for="(item, index) in smallMoney" 
                            :key="index" 
                            :class="{ active: item.b }"
                            @click="moneyClick(item)">{{ item.text }}</li>
                    </ul>
                </dd>
            </dl>
            <dl class="fix" v-if="showBigMoney">
                <dt>选择2：</dt>
                <dd>
                    <ul>
                        <li 
                            v-for="(item, index) in bifMoney" 
                            :key="index" 
                            :class="{ active: item.b }"
                            @click="moneyClick(item)">{{ item.text }}</li>
                    </ul>
                </dd>
            </dl>
            <dl class="fix">
                <dt></dt>
                <dd>
                    <span>￥</span>
                    <a-input placeholder="请输入其他" v-model="payMoney" @keyup="moneyKeyup"/>
                    <p class="red" v-show="showMoneyTs">{{ moneyTsText }}</p>
                </dd>
            </dl>
            <dl class="fix">
                <dt></dt>
                <dd>
                    <button class="gradients_btn" :disabled="payMoney == '' || payMoney < 0" @click="nextClick">下一步</button>
                </dd>
            </dl>
        </div>

        <rmbDepositChannel v-if="step == 2" :step="step" :depositData="q" :Paylimit="Paylimit" :payMoney="payMoney" @upDataMoney="upDataMoney($event)" @stepClick="stepClick($event)"></rmbDepositChannel>

        <a-spin v-show="showLoading"></a-spin>
    </div>
</template>

<script>
    import rmbDepositChannel from './rmbDepositChannel.vue';
    import { depositInitApi } from '../../http/api'
    export default {
        data () {
            return {
                showLoading: false,
                step: 0,
                smallMoney: [],
                bifMoney: [],
                showBigMoney: false,
                // 输入
                payMoney: "",
                showMoneyTs: false,
                moneyTsText: "",
                moneyMin: "",
                moneyMax: "",
                // 初始化数据
                q: {},
                Paylimit: "",
            }
        },
        methods: {
            depositInit () {
                var _this = this;
                this.showLoading = true;
                depositInitApi().then(res => {
                    _this.showLoading = false;
                    if(res.data.message.is_dpting == 1){
                        _this.dpt = res.data.message.dpt;
                        _this.step = 3;
                    }else {
                        _this.q = res.data.message;
                        _this.step = 1;
                        for(var i = 0; i < _this.q.money.length; i++){
                            var moneyArr = {text: _this.q.money[i], b: false};
                            _this.smallMoney.push(moneyArr)
                        }
                        for(var i = 0; i < _this.q.nmoney.length; i++){
                            var moneyArr = {text: _this.q.nmoney[i], b: false};
                            _this.bifMoney.push(moneyArr)
                        }

                        _this.Paylimit = res.data.message.Paylimit;

                        var minArr = [];
                        var maxArr = [];

                        Object.keys(_this.Paylimit).forEach(function(j, k){
                            // 判断code1有值显示大额金额
                            if(j == 'code1'){
                                _this.showBigMoney = true;
                            }
                            // 最小值数组
                            minArr.push(_this.Paylimit[j].min);
                            // 最大值数组
                            maxArr.push(_this.Paylimit[j].max)
                        })
                        // 获取最小值
                        _this.moneyMin = Math.min.apply(null, minArr);
                        // 获取最大值
                        _this.moneyMax = Math.max.apply(null, maxArr);
                    }
                }).catch(err => {
                    _this.showLoading = false;
                })
            },
            // 选择事件
            moneyClick (item) {
                for(var i = 0; i < this.smallMoney.length; i++){
                    this.smallMoney[i].b = false
                };
                for(var i = 0; i < this.smallMoney.length; i++){
                    this.bifMoney[i].b = false
                };
                item.b = true;
                this.payMoney = item.text
            },
            // 输入金额事件
            moneyKeyup () {
                for(var i = 0; i < this.smallMoney.length; i++){
                    this.smallMoney[i].b = false
                };
                for(var i = 0; i < this.smallMoney.length; i++){
                    this.bifMoney[i].b = false
                };
                // 金额大于最大值提示
                if(parseInt(this.payMoney) > this.moneyMax){
                    this.showMoneyTs = true;
                    this.moneyTsText = "金额不能大于" + this.moneyMax;
                    this.payMoney = this.moneyMax
                }else{
                    // 隐藏输入金额提示
                    this.showMoneyTs = false
                }
            },
            // 下一步
            nextClick() {
                if (parseInt(this.payMoney) < this.moneyMin) {
                    this.$message.error("不能少于" + this.moneyMin)
                }else if (parseInt(this.payMoney) > this.moneyMax) {
                    this.$message.error('不能大于' + this.moneyMax)
                }else{
                    this.step = 2;
                }
            },
            // 步骤事件
            stepClick(msg) {
                this.step = msg
                if(msg == 0){
                    this.smallMoney = [];
                    this.bifMoney = [];
                    this.depositInit();
                }
            },
            // 子组件更新数字
            upDataMoney (msg) {
                this.payMoney = msg
            },
        },
        mounted () {
            this.depositInit()
        },
        components: {
            rmbDepositChannel,
        }
    }
</script>