<template>
    <div class="transfer">
        <div class="modesTab">
            <ul>
                <li 
                    v-for="(item,index) in modesTabs" 
                    :key="index"
                    :class="{ 'tab_actvie': modesTabNum == index }"
                    @click="patternClick(index)"
                >{{ item }}</li>
            </ul>
        </div>

        <a-row class="account">
            <p>主账户：</p>
            <span>{{ userMoney }}</span>
        </a-row>

        <a-row class="transfer_out" v-if="showTransfer">
            <a-col :span="7">
                <span class="label">转出</span>
                <a-select default-value="main" v-model="out_account" @change="outChange">
                    <a-select-option v-for="(item, index) in outAccountList" :key="index" :value="item.gameCode">
                        {{ item.gameTitle }}
                    </a-select-option>
                </a-select>
            </a-col>
            <a-col :span="7">
                <span class="label">转入</span>
                <a-select v-model="in_account">
                    <a-select-option v-for="(item,index) in inAccountList" :key="index" :value="item.gameCode">
                        {{ item.gameTitle }}
                    </a-select-option>
                </a-select>
            </a-col>
            <a-col :span="7">
                <span class="label">点数</span>
                <a-input placeholder="请输入转账点数" v-model="money"></a-input>
            </a-col>
            <a-col :span="3">
                <button class="gradients_btn" @click="mypurseClick">提交</button>
            </a-col>
        </a-row>

        <a-row class="vnue_list">
            <ul>
                <li v-for="(item, index) in gameArr.SportGame" :key="item.gameCode">
                    <p>{{ item.gameTitle }}</p>
                    <span :class="{ red: item.status == 2 }">{{ item.gameMoney }}</span>
                    <button class="primary_border_btn" v-if="item.gameMoney >= 1" @click="turnBackClick(item)">转回</button>
                </li>
                <li v-for="(item, index) in gameArr.RealPeopleGame" :key="item.gameCode" v-if="item.gameCode != 'code5'">
                    <p>{{ item.gameTitle }}</p>
                    <span :class="{ red: item.status == 2 }">{{ item.gameMoney }}</span>
                    <button class="primary_border_btn" v-if="item.gameMoney >= 1" @click="turnBackClick(item)">转回</button>
                </li>
                <li v-for="(item, index) in gameArr.ChessGame" :key="item.gameCode">
                    <p>{{ item.gameTitle }}</p>
                    <span :class="{ red: item.status == 2 }">{{ item.gameMoney }}</span>
                    <button class="primary_border_btn" v-if="item.gameMoney >= 1" @click="turnBackClick(item)">转回</button>
                </li>
                <li v-for="(item, index) in gameArr.LotteryGame" :key="item.gameCode">
                    <p>{{ item.gameTitle }}</p>
                    <span :class="{ red: item.status == 2 }">{{ item.gameMoney }}</span>
                    <button class="primary_border_btn" v-if="item.gameMoney >= 1" @click="turnBackClick(item)">转回</button>
                </li>
                <li v-for="(item, index) in gameArr.VideoGame" :key="item.gameCode" v-if="item.gameCode != 'code15'">
                    <p :class="{ red: item.status == 2 }">{{ item.gameTitle }}</p>
                    <span>{{ item.gameMoney }}</span>
                    <button class="primary_border_btn" v-if="item.gameMoney >= 1" @click="turnBackClick(item)">转回</button>
                </li>
                <li v-for="(item, index) in gameArr.EsportsGame" :key="item.gameCode">
                    <p :class="{ red: item.status == 2 }">{{ item.gameTitle }}</p>
                    <span>{{ item.gameMoney }}</span>
                    <button class="primary_border_btn" v-if="item.gameMoney >= 1" @click="turnBackClick(item)">转回</button>
                </li>
            </ul>
        </a-row>

        <a-spin v-show="showLoading"></a-spin>
    </div>
</template>

<script>
    import game from '../../assets/js/gameConfigure';
    import { accountApi } from '../../http/api';
    export default {
        data() {
            return {
                showLoading: false,
                modesTabs: ['普通模式', '免转模式'],
                modesTabNum: JSON.parse(localStorage.getItem('user')).wallet - 1,
                user: JSON.parse(localStorage.getItem('user')),
                // 开关参数
                is_on: 1,
                // 显示隐藏转账功能
                showTransfer: true,
                // main
                userMoney: localStorage.getItem('userMoney'),
                // 转出列表
                outAccountList: [
                    {
                        gameCode: 'main',
                        gameTitle: "主账户"
                    }
                ],
                // 转入列表
                inAccountList: [],
                // 转出参数
                out_account: "main",
                // 传入参数
                in_account: "请选择",
                // 输入金额
                money: "",
                // 获取所有本地
                gameArr: game.game,
            }
        },
        methods: {
            // 初始化
            transferInit () {
                var _this = this;
                for(let i in _this.gameArr){
                    for(let j = 0; j < _this.gameArr[i].length; j++) {
                        if(_this.gameArr[i][j].gameCode != 'code5' && _this.gameArr[i][j].gameCode != 'code15'){
                            _this.outAccountList.push(_this.gameArr[i][j]);
                            _this.inAccountList.push(_this.gameArr[i][j]);
                            accountApi({
                                p_code: _this.gameArr[i][j].gameCode,
                                type:"getStatus"
                            }).then(res => {
                                _this.gameArr[i][j].status = res.data.status_code;
                                if(res.data.status_code == 1){
                                    _this.gameArr[i][j].gameMoney = res.data.message;
                                }
                                if(res.data.status_code == 2){
                                    _this.gameArr[i][j].gameMoney = '维护中';
                                }
                            }).catch(err => {

                            })
                        }
                    }
                }

                // function getData(data) {
                //     return accountApi({p_code:data,type:"getStatus"})
                // }
                // async function asyncCall() {
                //     for (let j of Object.keys(_this.gameArr)){
                //         for(var i = 0; i < _this.gameArr[j].length; i++){
                //             var data = getData(_this.gameArr[j][i].gameCode)
                //             await data.then(res => {
                //                 _this.gameArr[j][i].status = res.data.status_code;
                //                 if(res.data.status_code == 1){
                //                     _this.gameArr[j][i].gameMoney = res.data.message;
                //                 }
                //                 if(res.data.status_code == 2){
                //                     _this.gameArr[j][i].gameMoney = '维护中';
                //                 }
                //             })
                //         }
                //     }
                // }
                // asyncCall()
            },
            // 普通和免转
            patternClick(index) {
                var _this = this;
                if(index == 1){
                    this.modesTabNum = index;
                    this.is_on = 2;
                    this.walletSubmit()
                }else{
                    this.$confirm({
                        title: '提示',
                        content: '关闭后自动免转后，你将需要手动操作，确定关闭自动免转？',
                        onOk() {
                            _this.modesTabNum = index;
                            _this.is_on = 1;
                            _this.walletSubmit()
                        },
                        onCancel() {
                            _this.modesTabNum = _this.user.wallet - 1
                        }
                    })
                }
            },
             // 开启关闭免转请求
            walletSubmit () {
                var _this = this;
                this.showLoading = true;
                var data = {
                    is_on: this.is_on
                }
                setTimeout(function(){
                    console.log(data)
                    _this.showLoading = false;

                    // 更新本地user信息
                    _this.user.wallet = _this.is_on;
					var userObj = JSON.stringify(_this.user);
                    localStorage.setItem('user',userObj);
                    
                    // 重置选择游戏和金额
                    _this.out_account = 'main';
					_this.in_account = '请选择';
                    _this.money = '';

                    // 显示隐藏转账功能
                    if(_this.is_on == 1){
                        _this.showTransfer = true
                    }else{
                        _this.showTransfer = false
                    }

                    // 更新header的user wallet
                    _this.$emit('upUserWallet', _this.is_on)
                },1000)
            },
            // 转出change
            outChange (value) {
                this.in_account = '请选择';
                this.inAccountList = [];
                for(var i = 0; i < this.outAccountList.length; i++) {
                    if(this.outAccountList[i].gameCode != value){
                        this.inAccountList.push(this.outAccountList[i])
                    }
                }
            },
            // 提交按钮
            mypurseClick () {
                var _this = this;
                var money = parseFloat(this.money);
                if(this.in_account == '请选择'){
                    this.$message.warning('请选择转入账户')
                }else if(this.money == ''){
                    this.$message.warning('请输入数字')
                }else if(Number.isInteger(money) == false || money < 1){
                    this.$message.warning('数字必须为整数！')
                }else {
                    this.$confirm({
                        title: "提示",
                        content: "本次" + this.money + "！",
                        onOk(){
                            _this.mypurseSubmit()
                        }
                    })
                }
            },
            // 提交
            mypurseSubmit () {
                var _this = this;
                this.showLoading = true;
                var inMoney = parseFloat(this.money)
                if(this.out_account != "main" && this.in_account != "main"){
                    this.showLoading = false;
                    this.money = "";
                    this.$message.success("成功")

                    Object.keys(_this.gameArr).forEach(function(j,k){
                        for(var i = 0; i < _this.gameArr[j].length; i++){
                            if(_this.gameArr[j][i].gameCode == _this.out_account){
                                _this.gameArr[j][i].gameMoney = parseFloat(_this.gameArr[j][i].gameMoney) - inMoney
                            }
                            if(_this.gameArr[j][i].gameCode == _this.in_account){
                                _this.gameArr[j][i].gameMoney = parseFloat(_this.gameArr[j][i].gameMoney) + inMoney
                            }
                        }
                    })
                }else{
                    var u = parseFloat(this.userMoney);
                    var m = parseFloat(this.money);
                    this.showLoading = false;
                    this.money = "";
                    this.$message.success("成功");

                    if(this.out_account == "main"){
                        var newUserMoney = u - m;
                        localStorage.setItem("userMoney",newUserMoney);
                        this.userMoney = newUserMoney;
                        this.$emit('updateUserMoney', this.userMoney)

                        Object.keys(_this.gameArr).forEach(function(j,k){
                            for(var i = 0; i < _this.gameArr[j].length; i++){
                                if(_this.gameArr[j][i].gameCode == _this.in_account){
                                    _this.gameArr[j][i].gameMoney = parseFloat(_this.gameArr[j][i].gameMoney) + m
                                }
                            }
                        })
                    };
                    
                    if(this.in_account == "main"){
                        var newUserMoney = u + m;
                        localStorage.setItem("userMoney",newUserMoney);
                        this.userMoney = newUserMoney;
                        this.$emit('updateUserMoney', this.userMoney)
                        
                        Object.keys(_this.gameArr).forEach(function(j,k){
                            for(var i = 0; i < _this.gameArr[j].length; i++){
                                if(_this.gameArr[j][i].gameCode == _this.out_account){
                                    _this.gameArr[j][i].gameMoney = parseFloat(_this.gameArr[j][i].gameMoney) - m
                                }
                            }
                        })
                    }
                }
            },
            // 转回
            turnBackClick(item) {
                var _this = this;
                this.$confirm({
                    title: "提示",
                    content: '确认转回主账户？',
                    onOk() {
                        _this.inAccountList.unshift({
                            gameCode: 'main',
                            gameTitle: "主账户"
                        })
                        _this.out_account = item.gameCode;
                        _this.in_account = "main";
                        _this.money = parseInt(item.gameMoney);
                        _this.mypurseSubmit()
                    }
                })
            },
        },
        mounted() {
            this.transferInit();

            // 显示隐藏转账功能
            if(this.patternNum == 1){
                this.showTransfer = false
            }else{
                this.showTransfer = true
            }
        },
    }
</script>

<style scoped>
    @import url(../../assets/css/transfer.css);
</style>