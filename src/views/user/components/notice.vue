<template>
    <div>
        <div class="notice_type fix">
            <ul>
                <li v-for="(item,index) in noticeType" :key="index" :class="{ active: type == item}" @click="tabClick(item)">{{ item }}</li>
            </ul>
        </div>
        <a-row class="mail_list">
            <table>
                <tbody>
                    <tr v-for="(item, index) in q" :key="item.id" @click="readClick(item)">
                        <td width="520">{{ item.content }}</td>
                        <td>{{ item.date }}</td>
                    </tr>
                </tbody>
            </table>
        </a-row>

        <a-spin v-show="showLoading"></a-spin>
    </div>
</template>

<script>
    import { announcementApi } from '../../../http/api'
    export default {
        data () {
            return {
                showLoading: false,
                noticeType: ['资讯','维护','信息'],
                type: "资讯",
                q: ""
            }
        },
        methods: {
            announcementInit () {
                var _this = this;
                this.showLoading = true;
                var data = '?type=' + this.type + '&host=' + window.location.host;
                announcementApi(data).then(res => {
                    _this.showLoading = false;
                    _this.q = res.data.message
                }).catch(err => {
                    _this.showLoading = false
                })
            },
            tabClick(item) {
                this.type = item;
                this.announcementInit()
            },
            readClick(item) {
                this.$emit('goVisible', item);
            }
        },
        mounted () {
            this.announcementInit()
        }
    }
</script>