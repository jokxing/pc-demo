<template>
    <div class="channel">
        <p>方式</p>
        
        <a-row class="pay_list">
            <ul>
                <li 
                    v-for="(item,index) in payList" 
                    :key="index"
                    v-if="item.status == 1"
                    :class="{ active: item.pname == payType.pname }"
                    @click="channelClick(item)">
                        <div class="recommend" v-if="item.rec == 1"></div>
                        <img :src="item.pimg" />
                        <p>{{ item.pname }}</p>
                </li>
            </ul>
        </a-row>

        <a-row class="deposit_btn">
            <button class="gradients_btn" @click="stepClick">上一步</button>
            <button class="gradients_btn" @click="rechargeSubmit">提交 {{ payMoney }}</button>
        </a-row>

        <a-spin v-show="showLoading"></a-spin>
    </div>
</template>

<script>
    export default {
        props: ['step', 'depositData', 'Paylimit', 'payMoney'],
        data () {
            return {
                showLoading: false,
                // 方式列表
                payList: [
                    {
                        pname: 'type1', 
                        pimg: require('../../assets/img/user/deposit/icon_type.png'),
                        code: "code1",
                        min: 0,
                        max: 0,
                        rec: 1,
                        sort: 1,
                        status:0,
                    },{
                        pname: 'type2', 
                        pimg: require('../../assets/img/user/deposit/icon_type.png'),
                        code: "code1",
                        min: 0,
                        max: 0,
                        rec: 0,
                        sort: 1,
                        status:0,
                    },{
                        pname: 'type3', 
                        pimg: require('../../assets/img/user/deposit/icon_type.png'),
                        code: "code1",
                        min: 0,
                        max: 0,
                        rec: 0,
                        sort: 1,
                        status:0,
                    }, {
                        pname: 'type4', 
                        pimg: require('../../assets/img/user/deposit/icon_type.png'),
                        code: "code2",
                        min: 0,
                        max: 0,
                        rec: 0,
                        sort: 1,
                        status:0,
                    }, {
                        pname: 'type5',
                        pimg: require('../../assets/img/user/deposit/icon_type.png'),
                        code: "code3",
                        min: 0,
                        max: 0,
                        rec: 0,
                        sort: 1,
                        status:0,
                    }
                ],
                // 选中方式
                payType: "",
            }
        },
        methods: {
            PaylimitInit () {
                var _this = this;
                var data = this.Paylimit;
                Object.keys(data).forEach(function(i,v){
                    if(i != 'code1'){
                        for(var j = 0; j < _this.payList.length; j++){
                            if(_this.payList[j].code == i){
                                _this.payList[j].sort = 1;
                                _this.payList[j].rec = data[i].is_recommend;
                                _this.payList[j].min = data[i].min;
                                _this.payList[j].max = data[i].max;
                                break
                            }
                        }
                    }else{
                        for(var j = 0; j < _this.payList.length; j++){
                            if(_this.payList[j].code == i){
                                var arrWay = data[i].way .split(',');
                                for(var h = 0; h < arrWay.length; h++){
                                    if(arrWay[h] == 1){
                                        if(_this.payList[j].pname == 'type1'){
                                            _this.payList[j].sort = 1;
                                            _this.payList[j].rec = data.code1.is_recommend;
                                            _this.payList[j].min = data.code1.min;
                                            _this.payList[j].max = data.code1.max;
                                        }
                                    }
                                    if(arrWay[h] == 2){
                                        if(_this.payList[j].pname == 'type2'){
                                            _this.payList[j].sort = 1;
                                            _this.payList[j].rec = data.code1.is_recommend;
                                            _this.payList[j].min = data.code1.min;
                                            _this.payList[j].max = data.code1.max;
                                        }
                                    }
                                    if(arrWay[h] == 3){
                                        if(_this.payList[j].pname == 'type3'){
                                            _this.payList[j].sort = 1;
                                            _this.payList[j].rec = data.code1.is_recommend;
                                            _this.payList[j].min = data.code1.min;
                                            _this.payList[j].max = data.code1.max;
                                        }
                                    }
                                }
                            }
                        }
                    }
                })
                this.payList = _this.insertSort(_this.payList);

                // 根据输入的数字进行方式最小和最大范围里面显示对应的方式
                var arr = [];
                for(var i = 0; i < this.payList.length; i++) {
                    if(this.payList[i].min <= parseInt(this.payMoney) && this.payList[i].max >= parseInt(this.payMoney)){
                        this.payList[i].status = 1
                    }
                    if(parseInt(this.payMoney) >= 10000){
                        if(this.payList[i].pname == 'type3'){
                            this.payList[i].status = 0
                        }
                    }
                    if(this.payList[i].status == 1){
                        arr.push(this.payList[i]);
                    }
                }
                this.payType = arr[0];
            },
            // 方式排序
            insertSort (arr) {
                var len = arr.length;
                for(var i = 0; i < len; i++){
                    for(var j = 0; j < len - 1 - i; j++){
                        if(arr[j].sort > arr[j+1].sort){
                            var temp = arr[j+1];
                            arr[j+1] = arr[j];
                            arr[j] = temp;
                        }
                    }
                }
                return arr;
            },
            // 选择方式
            channelClick (item) {
                this.payType = item;
            },
            // 提交
            rechargeSubmit () {
                var data = {
                    num: this.payMoney,
                    type: this.payType.pname
                }
                console.log(data)
                this.$message.success("提交成功")
            },
            // 上一步
            stepClick() {
                this.$emit('stepClick', 1)
            }
        },
        mounted () {
            this.PaylimitInit()
        }
    }
</script>