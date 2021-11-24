<template>
    <div>
        <headers ref="user" 
            @updateUserMoney='updateUserMoney($event)' 
            @listenInit='listenInit($event)'
            @upAccount="upAccount"></headers>

        <a-row class="user_inner">
            <userSider 
                ref="userSider" 
                :userTitle="userTitle" 
                :userSubTitle="userSubTitle" 
                @goUserTitle="goUserTitle($event)" 
                @updateUserMoney="updateUserMoney($event)"
                @upAllGameAccount="upAllGameAccount"></userSider>

            <a-layout-content>
                <h3 v-if="userTitle != '' && userTitle">{{ userTitle }}<span>{{ userSubTitle }}</span></h3>
                <router-view 
                    ref="view" 
                    @updateUserMoney="updateUserMoney($event)" 
                    @updateMsgCount="updateMsgCount"
                    @upUserWallet="upUserWallet($event)" />
            </a-layout-content>
        </a-row>

        <footers></footers>
    </div>
</template>

<script>
    import headers from '../../components/header'
    import userSider from '../../components/userSider'
    import footers from '../../components/footer'
    import { listenApi } from '../../http/api'
    export default {
        data() {
            return {
                userTitle: "",
                userSubTitle: "",
            }
        },
        methods: {
            listenInit (code) {
                var _this = this;
                listenApi().then(res => {
                    for(var i = 0; i < _this.$refs.userSider.walletList.length; i++){
                        if(_this.$refs.userSider.walletList[i].url == '/mail'){
                            _this.$refs.userSider.walletList[i].MsgCount = res.data.message.MsgCount
                        }
                    }
                    _this.$refs.user.userMoney = res.data.message.Money;
                    _this.$refs.userSider.userMoney = res.data.message.Money;
                    _this.$refs.view.userMoney = res.data.message.Money
                    // 更新userMoney
                    localStorage.setItem('userMoney', res.data.message.Money)
                }).catch(err => {

                })
            },
            goUserTitle (msg) {
                this.userTitle = msg[0];
                this.userSubTitle = msg[1]
            },
            updateUserMoney (msg) {
                this.$refs.user.userMoney = msg;
                this.$refs.userSider.userMoney = msg;
                this.$refs.view.userMoney = msg
            },
            updateMsgCount(msg) {
                for(var i = 0; i < this.$refs.userSider.walletList.length; i++){
                    if(this.$refs.userSider.walletList[i].url == '/mail'){
                        this.$refs.userSider.walletList[i].MsgCount = this.$refs.userSider.walletList[i].MsgCount - msg
                    }
                }
            },
            upUserWallet(msg){
                this.$refs.user.user.wallet = msg
            },
            upAllGameAccount () {
                this.$refs.view.upGameAccount()
            },
            upAccount () {
                this.$refs.view.transferInit()
            }
        },
        mounted () {
            this.listenInit()
        },
        components: {
            headers,
            userSider,
            footers
        },
        watch: {
            localstorage(val){
                console.log("val")
            }
        }
    }
</script>

<style scoped>
    @import url(../../assets/css/user.css);
</style>