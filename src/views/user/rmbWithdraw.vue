<template>
    <div class="withdraw_box">
        <div>
            <a-row class="bank_list">
                <ul>
                    <li v-for="(item, index) in q.list" :key="item.id" @click="selectBank(item)">
                        <a-row class="bank_type">
                            <div class="bank_logo">
                            </div>
                            <span>{{ item.name }}</span>
                        </a-row>
                        <p>0000 **** **** {{ item.mun }}</p>
                        <i class="close check" v-if="item.is_selected == 1"><img src="../../assets/img/green_check.svg" width="20"></i>
                        <i class="close" v-else @click.stop="delBankCard(item)"><img src="../../assets/img/primary_close.svg" width="20"></i>
                    </li>
                </ul>
            </a-row>

            <a-row class="money">
                <dl class="fix">
                    <dt>name：</dt>
                    <dd :class="{ red: q.fee1 != 0 }">
                        <em v-if="q.fee1 != 0">-</em>{{ q.fee1 }}
                        <button class="gradients_btn" @click="showAudit = true">详细</button>
                    </dd>
                </dl>
                <dl class="fix">
                    <dt>name：</dt>
                    <dd :class="{ red: q.fee2 != 0 }">
                        <em v-if="q.fee2 != 0">-</em>{{ q.fee2 }}
                    </dd>
                </dl>
                <dl class="fix">
                    <dt>name：</dt>
                    <dd>
                        <span class="primary_color" :class="{ red: finalMoney < 0 }">
                            {{ finalMoney }}
                        </span>
                        <span class="red" v-show="finalMoney < 0">*请重新输入</span>
                    </dd>
                </dl>
                <dl class="fix">
                    <dt>输入：</dt>
                    <dd>
                        <a-input 
                            v-if="q != ''"
                            @keyup="tkjeKeyup" 
                            onkeyup="value=value.replace(/[^\d]/g,'')" 
                            onKeypress="if (event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;" 
                            :maxLength="q.unionPayCardMaxMoney.length" 
                            :placeholder="'最低' + q.unionPayCardMinMoney"
                            v-model="t.money" />
                        <span class="red" v-show="showTkMoneyTs">{{ tkMoneyTsText }}</span>
                    </dd>
                </dl>
            </a-row>

            <a-row class="btn">
                <button class="gradients_btn" :disabled="zdtkDis" @click="wdwBtn('0')">申请1</button>
                <button class="gradients_btn" :disabled="rgtkDis" @click="wdwBtn('1')">申请2</button>
            </a-row>

            <a-row class="be_careful">
                <ul>
                    <li>
                        <span class="primary_bg_color">1</span>
                        内容内容内容
                    </li>
                    <li>
                        <span class="primary_bg_color">2</span>
                        内容内容内容
                    </li>
                </ul>
            </a-row>
        </div>

        <!-- 详细 -->
        <a-modal
            title="详细"
            :visible="showAudit"
            :width="600"
            @cancel="showAudit = false"
            >
            <table border="">
                <tr>
                    <th>表头1</th>
                    <th>表头2</th>
                    <th>表头3</th>
                    <th>表头4</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                </tr>
            </table>
            <template slot="footer">
                <div class="modal_one_btn">
                    <a-button key="submit" 
                        class="gradients_btn" 
                        style="width:340px"
                        @click="showAudit = false">确认</a-button>
                </div>
            </template>
        </a-modal>

        <a-spin v-show="showLoading"></a-spin>
    </div>
</template>

<script>
    import { withdrawInitApi } from '../../http/api'
    export default {
        data() {
            return {
                showLoading: false,
                // main
                userMoney: JSON.parse(localStorage.getItem('userMoney')),
                // 初始化获取数据
                q: "",
                // 详细
                showAudit: false,
                // 最终
                finalMoney: 0,
                showTkMoneyTs: false,
                tkMoneyTsText: "",
                // 输入的值
                t: {
                    money: ""
                },
                // 禁止按钮
                zdtkDis: false,
                rgtkDis: false,
            }
        },
        methods: {
            // 初始化
            withdrawInit () {
                var _this = this;
                this.showLoading = true;
                withdrawInitApi().then(res => {
                    _this.showLoading = false;
                    _this.q = res.data.message
                }).catch(err => {
                    _this.showLoading = false;
                })
            },
            // 选中
            selectBank(item) {
                if(item.is_selected != 1){
					for(var i = 0; i < this.q.list.length; i++){
						this.q.list[i].is_selected = 0
						if(this.q.list[i].id == item.id){
							this.q.list[i].is_selected = 1
						}
					}
	    		}
            },
            // 删除
            delBankCard(item) {
                var _this = this;
                this.$confirm({
                    title: "提示",
                    content: '是否确定要删除？',
                    onOk() {
                        _this.q.list = _this.q.list.filter(v => v.id !== item.id);
                        _this.$message.success("删除成功")
                    }
                })
            },
            // keyup事件
            tkjeKeyup () {
                var _this = this
                if (_this.t.money == '') {
                    _this.finalMoney = 0
                } else {
                    var t = parseFloat(_this.t.money)
                    var a = t - _this.q.fee1 - _this.q.fee2
                    _this.finalMoney = a
                }
                
                var moneyInput = _this.t.money.replace(/[^\d]/g, '')
                if (parseInt(moneyInput) < parseInt(_this.q.unionPayCardMinMoney) || parseInt(moneyInput) > parseInt(_this.q.unionPayCardMaxMoney)) {
                    _this.showTkMoneyTs = true;
                    if(parseInt(_this.t.money) < parseInt(_this.q.unionPayCardMinMoney)){
                        _this.tkMoneyTsText = "最低" + _this.q.unionPayCardMinMoney + "点";
                        _this.zdtkDis = true;
                        _this.rgtkDis = true
                    }
                    if(parseInt(moneyInput) > parseInt(_this.q.unionPayCardMaxMoney)){
                        _this.tkMoneyTsText = "最高" + _this.q.unionPayCardMaxMoney + "点";
                    }
                } else {
                    _this.showTkMoneyTs = false;
                    if (_this.q.fee1 != 0 || _this.q.fee2 != 0) {
                        if (parseFloat(moneyInput) > parseFloat(_this.userMoney)) {
                            _this.zdtkDis = true;
                            _this.rgtkDis = true;
                            _this.showTkMoneyTs = true;
                            _this.tkMoneyTsText = "*点数不能大于余额";
                            _this.finalMoney = 0
                        }else if(_this.finalMoney < 0){
                            _this.zdtkDis = true;
                            _this.rgtkDis = true;
                            _this.showTkMoneyTs = false
                        } else {
                            _this.zdtkDis = false;
                            _this.rgtkDis = false;
                            _this.showTkMoneyTs = false
                        };
                    }else{
                        if (parseFloat(moneyInput) > parseFloat(_this.userMoney)) {
                            _this.showTkMoneyTs = true;
                            _this.tkMoneyTsText = "*点数不能大于余额";
                            _this.finalMoney = 0
                        } else {
                            _this.showTkMoneyTs = false
                        };
                
                        if (moneyInput < parseInt(_this.q.unionPayCardMinMoney) || parseFloat(moneyInput) > parseFloat(_this.userMoney)) {
                            _this.zdtkDis = true
                            _this.rgtkDis = true
                        } else {
                            _this.zdtkDis = false
                            _this.rgtkDis = false
                        };
                        if (moneyInput > parseInt(_this.q.unionPayCardMaxMoney)) {
                            _this.showTkMoneyTs = true;
                            _this.tkMoneyTsText = "最高" + _this.q.unionPayCardMaxMoney + "点";
                        } else {
                            _this.showTkMoneyTs = false
                        };
                        if (moneyInput == '') {
                            _this.showTkMoneyTs = false
                            _this.zdtkDis = false
                            _this.rgtkDis = false
                        }
                    }
                };
            },
            // 按钮-过滤+确认
            wdwBtn(type){
                var _this = this;
                if(this.t.money == '') {
                    this.$message.warning('请填写金额！')
                }else{
                    if(type == '0'){
                        const h = this.$createElement;
                        var a = h('div', {}, [
                                    h('p', '内容内容'),
                                    h('p', {}, [
                                        h('span', '请您确认'),
                                        h('span', { staticClass: 'red' }, '最终' + _this.t.money),
                                        h('span', '点数无误，谢谢！'),
                                    ]),
                                ])
                        var b = h('div', {}, [
                                    h('p', {}, [
                                        h('span', '内容内容'),
                                        h('span', { staticClass: 'red' }, '内容内容'),
                                        h('span', '内容内容'),
                                    ]),
                                ])
                        this.$confirm({
                            title: '提示',
                            content: a,
                            onOk() {
                                _this.$confirm({
                                    title: '提示',
                                    content: b,
                                    okText: '确认',
                                    cancelText: "我再想想",
                                    onOk() {
                                        _this.$info({
                                            title:"提示",
                                            content: "申请成功",
                                            onOk() {
                                                _this.$router.push("/tradeRecord")
                                            }
                                        })
                                    },
                                    onCancel() {},
                                });
                            },
                            onCancel() {},
                        });
                    }else{
                        this.$confirm({
                            title: '提示',
                            content: "内容内容",
                            onOk() {
                                _this.$info({
                                    title:"提示",
                                    content: "申请成功",
                                    onOk() {
                                        _this.$router.push("/tradeRecord")
                                    }
                                })
                            },
                            onCancel() {},
                        });
                    }
                }
            },
        },
        mounted () {
            this.withdrawInit()
        },
    }
</script>