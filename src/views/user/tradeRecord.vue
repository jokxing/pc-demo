<template>
    <div class="trade_record">
        <div class="user_params">
            <a-row>
                <a-col :span="10">
                    <span class="label">类型：</span>
                    <a-select default-value="0" v-model="TransferType" @change="TransferTypeChange">
                        <a-select-option value="0">
                            全部
                        </a-select-option>
                        <a-select-option value="1">
                            type1
                        </a-select-option>
                        <a-select-option value="2">
                            type2
                        </a-select-option>
                        <a-select-option value="3">
                            type3
                        </a-select-option>
                        <a-select-option value="4">
                            type4
                        </a-select-option>
                        <a-select-option value="5">
                            type5
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="10">
                    <span class="label">时间：</span>
                    <a-radio-group default-value="3" v-model="time" @change="timeChange">
                        <a-radio-button value="3">今天</a-radio-button>
                        <a-radio-button value="4">昨天</a-radio-button>
                        <a-radio-button value="1">本周</a-radio-button>
                        <a-radio-button value="2">上周</a-radio-button>
                    </a-radio-group>
                </a-col>
                <a-col :span="4">
                    <button class="gradients_btn" @click="tradeRecInit">查询</button>
                </a-col>
            </a-row>
        </div>

        <div class="user_table">
            <a-table 
                :columns="columns" 
                :data-source="data" 
                :locale="{emptyText: '暂无记录'}">
                    <div slot="状态" slot-scope="status">
                        <span class="orang" v-if="status == 0">处理中</span>
                        <span class="green" v-if="status == 1">成功</span>
                        <span class="red" v-if="status == 2">失败</span>
                        <span class="hui" v-if="status == 3">已撤销</span>
                    </div>
                    <div slot="操作" slot-scope="text,record">
                        <a-icon type="delete" @click="deleteClick(record)" />
                    </div>
            </a-table>
        </div>

        <a-spin v-show="showLoading"></a-spin>
    </div>
</template>

<script>
    import { tradeRecApi } from '../../http/api'
    export default {
        data() {
            return {
                showLoading: false,
                TransferType: "0",
                time: "3",
                columns: [
                    {
                        title: '时间',
                        dataIndex: "created_at",
                    },
                    {
                        title: '订单号',
                        dataIndex: "fundsn"
                    },
                    {
                        title: '类别',
                        dataIndex: "type"
                    },
                    {
                        title: '数字',
                        dataIndex: "apply_amount"
                    },
                    {
                        title: '状态',
                        dataIndex: "status",
                        scopedSlots: { customRender: '状态' },
                    },
                    {
                        title: '操作',
                        dataIndex: "id",
                        scopedSlots: { customRender: '操作' },
                    },
                ],
                data: [],
            }
        },
        methods: {
            tradeRecInit () {
                var _this = this;
                var data = {
                    TransferType: this.TransferType,
                    time: this.time
                }
                this.showLoading = true;
                tradeRecApi(data).then(res => {
                    _this.showLoading = false;
                    _this.data = res.data.message.list;
                    for(var i = 0; i < res.data.message.list.length; i++){
                        for(var j = 0; j < _this.data.length; j++){
                            if(_this.data[j].id == res.data.message.list[i].id){
                                _this.data[j]['key'] = res.data.message.list[i].id
                            }
                        }
                    }
                }).catch(err => {
                    _this.showLoading = false;
                    if(err){
                        _this.$message.error(err.message)
                    }
                })
            },
            // 类型
            TransferTypeChange(val) {
                this.TransferType = val.target.value;
            },
            // 选择时间
            timeChange(val){
                this.time = val.target.value
            },
            // 删除
            deleteClick (record) {
                this.$confirm({
                    title: '信息',
                    content: "确认删除此条吗？",
                    onOk() {
                    }
                })
            },
        },
        mounted () {
            this.tradeRecInit()
        }
    }
</script>