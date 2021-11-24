<template>
    <div class="account_record">
        <div class="user_params">
            <a-row>
                <a-col :span="10">
                    <span class="label">选择：</span>
                    <a-select default-value="" v-model="ddlCode">
                        <a-select-option value="">全部</a-select-option>
                        <a-select-option v-for="(item,index) in gameArr" :key="index" :value="item.gameCode">{{ item.gameTitle }}</a-select-option>
                    </a-select>
                </a-col>
            </a-row>

            <a-row>
                <a-col :span="10">
                    <span class="label">时间：</span>
                    <a-radio-group v-model="checkDate" @change="checkDateChange">
                        <a-radio-button value="1">今天</a-radio-button>
                        <a-radio-button value="2">昨天</a-radio-button>
                    </a-radio-group>
                </a-col>
                <a-col :span="10">
                    <span class="label">时间筛选：</span>
                    <a-range-picker 
                    v-model="defaultendValue"
                    :format="dateFormat"
                    @change='openChange' />
                </a-col>
                <a-col :span="4">
                    <button class="gradients_btn" @click="accountRecordInit">查询</button>
                </a-col>
            </a-row>
        </div>

        <div class="user_table">
            <a-table 
                :columns="columns" 
                :data-source="data" 
                :pagination="pagination"
                :rowKey="data => data.msgid"
                :locale="{emptyText: '暂无记录'}"
                @change="pageChange"></a-table>
        </div>

        <a-spin v-show="showLoading"></a-spin>
    </div>
</template>

<script>
    import moment from 'moment';
    import game from '../../assets/js/gameConfigure';
    import { mypurseGetApi } from '../../http/api'
    export default {
        data() {
            var toDay = new Date().toLocaleDateString().replace(/\//g,  "-")
            return {
                showLoading: false,
                // 
                ddlCode: "",
                gameArr: [],
                // 时间
                defaultendValue: [moment(toDay, 'YYYY-MM-DD'), moment(toDay, 'YYYY-MM-DD')],
                sDate: toDay,
                eDate: toDay,
                dateFormat: 'YYYY-MM-DD',
                checkDate: '1',
                // 分页
                page: 1,
                pagination: {
                    total: 0,
                    pageSize: 0,
                },
                // 表格
                columns: [
                    {
                        title: '时间',
                        dataIndex: "created_at"
                    },
                    {
                        title: '转出',
                        dataIndex: "outAccountText"
                    },
                    {
                        title: '转入',
                        dataIndex: "inAccountText"
                    },
                    {
                        title: '数字',
                        dataIndex: "money"
                    },
                ],
                data: []
            }
        },
        methods: {
            moment,
            // 下拉获取本地
            getGames () {
                var _this = this;
                var games = game.game;
                Object.keys(games).forEach(function(j,k){
                    for(var i = 0; i < games[j].length; i++){
                        _this.gameArr.push(games[j][i])
                    }
                })
            },
            // 初始化
            accountRecordInit () {
                var _this = this;
                this.showLoading = true;
                var data = "?sDate=" + this.sDate + '&eDate=' + _this.eDate + '&ddlCode=' + _this.ddlCode + '&page=' + _this.page;
                mypurseGetApi(data).then(res => {
                    _this.showLoading = false;
                    _this.data = res.data.message.list
                    for(var i = 0; i < _this.gameArr.length; i++) {
                        for(var j = 0; j < _this.data.length; j++){
                            if(_this.data[j].out_account == _this.gameArr[i].gameCode){
                                _this.data[j].outAccountText = _this.gameArr[i].gameTitle
                            }
                            if(_this.data[j].in_account == _this.gameArr[i].gameCode){
                                _this.data[j].inAccountText = _this.gameArr[i].gameTitle
                            }
                            if(_this.data[j].out_account == 'main'){
                                _this.data[j].outAccountText = '主账户'
                            }
                            if(_this.data[j].in_account == 'main'){
                                _this.data[j].inAccountText = '主账户'
                            }
                        }
                    }

                    _this.pagination.total = res.data.message.total;
                    _this.pagination.pagesize = res.data.message.pagesize
                }).catch(err => {
                    _this.showLoading = false
                })
            },
            // 选择时间
            checkDateChange (e) {
                var myDate = new Date();
                var toDay = myDate.toLocaleDateString().replace(/\//g,  "-")
                if(e.target.value == 1){
                    this.defaultendValue = [moment(toDay, 'YYYY-MM-DD'), moment(toDay, 'YYYY-MM-DD')];
                    this.sDate = toDay;
                    this.eDate = toDay;
                }else{
                    var yesterday = myDate.getTime() - 24*60*60*1000;
                    this.defaultendValue = [moment(this.getDate(yesterday), 'YYYY-MM-DD'), moment(this.getDate(yesterday), 'YYYY-MM-DD')]
                    this.sDate = this.getDate(yesterday);
                    this.eDate = this.getDate(yesterday);
                }
            },
            // 计算时间戳
            getDate: function (time) {
                var myDate = new Date(time);
                var year = myDate.getFullYear();
                var month = myDate.getMonth() + 1;
                var day = myDate.getDate();
                return year + "-" + month + "-" + day;
            },
            // 选择日期
            openChange(value, dateString){
                this.checkDate = "0";
                this.sDate = dateString[0]
                this.eDate = dateString[1]
            },
            // 表格分页
            pageChange(pagination){
                this.page = pagination.current;
                this.accountRecordInit()
            }
        },
        mounted () {
            this.getGames();
            this.accountRecordInit()
        }
    }
</script>