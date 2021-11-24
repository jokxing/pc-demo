<template>
    <div class="mail">
        <a-row class="type_tab">
            <ul>
                <li 
                    v-for="(item,index) in typeTabs" 
                    :key="index"
                    :class="{ active: typeNum == index }"
                    @click="typeNum = index">{{ item }}</li>
            </ul>
        </a-row>

        <message v-if="typeNum == 0" @goVisible="goVisible"></message>

        <notice v-if="typeNum == 1" @goVisible="goVisible"></notice>

        <a-modal
            :title="data.title"
            :visible="visible"
            class="mail_modal"
            @ok="visible = false"
            @cancel="visible = false">
            <span class="tiemr">{{ data.created_at }}</span>
            <p v-html="data.content"></p>
        </a-modal>
    </div>
</template>

<script>
    import message from './components/message'
    import notice from './components/notice'
    export default {
        data() {
            return {
                typeTabs: ['通知', '公告'],
                typeNum: 0,
                // 弹窗
                visible: false,
                data: ""
            }
        },
        methods: {
            goVisible (msg) {
                this.visible = true;
                this.data = msg
            }
        },
        mounted () {
            if(this.$route.params.num){
                this.typeNum = this.$route.params.num
            }
        },
        components: {
            message,
            notice
        }
    }
</script>

<style scoped>
    @import url(../../assets/css/mail.css);
</style>