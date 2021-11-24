<template>
    <div>
        <a-row class="mail_list">
            <table>
                <tbody>
                    <tr v-for="(item, index) in list" :key="index" @click="readClick(item)">
                        <td width="100">
                            <i class="iconfont" :class="{ 'icon-big-circle': !item.check, 'icon-check-circle primary_color': item.check }" v-show="showCheck" @click.stop="checkClick(item)"></i>
                            <img src="../../../assets/img/user/icon_notice.png" width="25">
                        </td>
                        <td>{{ item.title }}</td>
                        <td>
                            <span class="red" v-if="item.is_read == 0">未读</span>
                            <span v-if="item.is_read == 1">已读</span>
                        </td>
                        <td>{{ item.created_at }}</td>
                    </tr>
                </tbody>
            </table>
        </a-row>

        <a-row class="mail_bottom" v-if="list.length > 0">
            <div class="left">
                <ul v-show="!showCheck">
                    <li @click="showCheck = true"><a-icon type="edit" class="primary_color" />编辑</li>
                    <li @click="messageDel('allDel')"><i class="iconfont icon-del primary_color"></i>全部删除</li>
                </ul>
                <ul v-show="showCheck">
                    <li @click="allCheck">
                        <i class="iconfont" :class="{ 'icon-big-circle': !check, 'icon-check-circle primary_color': check }"></i>
                        全选
                    </li>
                    <li @click="messageDel('batchDel')"><i class="iconfont icon-del primary_color"></i>批量删除</li>
                    <li @click="showCheck = false">取消</li>
                </ul>
            </div>
        </a-row>

        <a-spin v-show="showLoading"></a-spin>
    </div>
</template>

<script>
    import { messageApi } from '../../../http/api'
    export default {
        data () {
            return {
                showLoading: false,
                showCheck: false,
                check: false,
                // 列表
                list: []
            }
        },
        methods: {
            messageInit () {
                var _this = this;
                this.showLoading = true
                var data = ''
                messageApi(data).then(res => {
                    _this.showLoading = false;
                    _this.list = res.data.message.list;
                    for(var i = 0; i < _this.list.length; i++){
                        _this.list[i]['check'] = false
                    }
                }).catch(err => {
                    _this.showLoading = false
                })
            },
            // 阅读
            readClick (item) {
                this.$emit('goVisible', item);
                item.is_read = 1
            },
            // 表格中的check
            checkClick (item) {
                item.check =! item.check;
                this.$forceUpdate() //强制刷新
            },
            // 全选
            allCheck () {
                this.check =! this.check;
                for(var i = 0; i < this.list.length; i++){
                    this.list[i].check =! this.list[i].check
                }
                this.$forceUpdate()
            },
            // 删除
            messageDel (type) {
                var _this = this;
                var ids = '';
                var arr = [];
                if(type == 'allDel'){
                    for(var i = 0; i < this.list.length; i++){
                        arr.push(this.list[i].id)
                    }
                    ids = arr.toString(',');
                }
                if(type == 'batchDel'){
                    for(var i = 0; i < this.list.length; i++){
                        if(this.list[i].check){
                            arr.push(this.list[i].id)
                        }
                    }
                    if(arr.length > 0){
                        ids = arr.toString(',');
                    };
                }

                if(ids != '') {
                    this.$confirm({
                        title: '提示',
                        content: '确认删除此条消息吗？',
                        onOk() {
                            _this.$confirm({
                                title: "提示",
                                content: "该消息已经删除。",
                                onOk() {
                                    _this.messageInit()
                                },
                                onCancel() {
                                    _this.messageInit()
                                }
                            })
                        },
                        onCancel() {},
                    });
                }
            },
        },
        mounted () {
            this.messageInit()
        }
    }
</script>