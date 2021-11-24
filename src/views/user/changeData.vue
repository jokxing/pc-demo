<template>
    <div class="change_data">
        <a-row class="type_tab">
            <ul>
                <li 
                    v-for="(item,index) in typeTabs" 
                    :key="index"
                    :class="{ active: type == item }"
                    @click="type = item">{{ item }}</li>
            </ul>
        </a-row>

        <a-row class="from" v-if="type == '手机号'">
            <div v-show="showOldMobile">
                <dl>
                    <dd>原手机号：</dd>
                    <dt>
                        <a-input :maxLength=11 v-model="oldMobile" disabled></a-input>
                        <button class="small gradients_btn" @click="oldMobileCodeClick">{{ oldMobileCodeText }}</button>
                    </dt>
                </dl>
                <dl>
                    <dd>验证码：</dd>
                    <dt>
                        <a-input :maxLength=4 v-model="oldMobileCode"></a-input>
                    </dt>
                </dl>
                <dl>
                    <dd></dd>
                    <dt>
                        <button class="gradients_btn" :disabled="oldMobileCode.length < 4" @click="oldMobileClick">下一步</button>
                    </dt>
                </dl>
            </div>
            <div v-show="!showOldMobile">
                <dl>
                    <dd>新手机号：</dd>
                    <dt>
                        <a-input :maxLength=11 v-model="newMobile"></a-input>
                        <button class="small gradients_btn" @click="newMobileCodeClick">{{ newMobileCodeText }}</button>
                    </dt>
                </dl>
                <dl>
                    <dd>验证码：</dd>
                    <dt>
                        <a-input :maxLength=4 v-model="newMobileCode"></a-input>
                    </dt>
                </dl>
                <dl>
                    <dd></dd>
                    <dt>
                        <button class="gradients_btn" :disabled="newMobileCode.length < 4" @click="modifyMobileSubmit">确认</button>
                    </dt>
                </dl>
            </div>
        </a-row>

        <a-row class="from" v-if="type == '新账号密码'">
            <dl>
                <dd>会员账号：</dd>
                <dt>
                    <a-input v-model="user.name" disabled :maxLength=11></a-input>
                </dt>
            </dl>
            <dl>
                <dd>旧密码：</dd>
                <dt>
                    <a-input type="password" placeholder="请填写旧密码" :maxLength=15 v-model="oldPassword"></a-input>
                </dt>
            </dl>
            <dl>
                <dd>新密码：</dd>
                <dt>
                    <a-input type="password" placeholder="密码必须输入8-15个英、数字符" :maxLength=15 v-model="newPassword"></a-input>
                </dt>
            </dl>
            <dl>
                <dd>确认密码：</dd>
                <dt>
                    <a-input type="password" placeholder="请再次输入新密码" :maxLength=15 v-model="confirmPassword"></a-input>
                </dt>
            </dl>
            <dl v-if="is_mobile">
                <dd>手机号：</dd>
                <dt>
                    <a-input :disabled="is_mobile" v-model="mobile"></a-input>
                    <button class="small gradients_btn" @click="pwdMobileCodeClick">{{ pwdMobileCodeText }}</button>
                </dt>
            </dl>
            <dl v-if="is_mobile">
                <dd>验证码：</dd>
                <dt>
                    <a-input :maxLength=4 v-model="pwdMobileCode"></a-input>
                </dt>
            </dl>
            <dl>
                <dd></dd>
                <dt>
                    <button 
                        class="gradients_btn" 
                        :disabled="oldPassword == '' || newPassword == '' || confirmPassword == ''"
                        @click="chgdataSubmit('password')">确认</button>
                </dt>
            </dl>
        </a-row>

        <a-row class="from" v-if="type == '微信账号'">
            <dl>
                <dd>微信账号：</dd>
                <dt>
                    <a-input placeholder="请输入微信账号" :maxLength=25 v-model="wechat"></a-input>
                </dt>
            </dl>
            <dl>
                <dd></dd>
                <dt>
                    <button class="gradients_btn" @click="chgdataSubmit('wechat')">确认</button>
                </dt>
            </dl>
        </a-row>

        <a-row class="from" v-if="type == 'QQ账号'">
            <dl>
                <dd>QQ账号：</dd>
                <dt>
                    <a-input placeholder="请输入QQ账号" :maxLength=25 v-model="qq"></a-input>
                </dt>
            </dl>
            <dl>
                <dd></dd>
                <dt>
                    <button class="gradients_btn" @click="chgdataSubmit('qq')">确认</button>
                </dt>
            </dl>
        </a-row>

        <a-spin v-show="showLoading"></a-spin>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                showLoading: false,
                btnLoading: false,
                typeTabs: localStorage.getItem('mobile') ? ['手机号','新账号密码','微信账号','QQ账号'] : ['新账号密码','微信账号','QQ账号'],
                type: localStorage.getItem('mobile') ? '手机号' : '新账号密码',
                user: JSON.parse(localStorage.getItem('user')),
                // 手机
                showOldMobile: true,
                // 旧手机号
                oldMobile: localStorage.getItem('mobile'),
                oldMobileCodeText: "获取验证码",
                oldMobileCode: "",
                oldMobileKey: "",
                oldTimer: null,
                // 新手机号
                newMobile: "",
                newMobileCodeText: "获取验证码",
                newMobileCode: "",
                newMobileKey: "",
                newTimer: null,
                // 新账号密码
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
                is_mobile: false,
                mobile: '',
                pwdMobileCodeText: '获取验证码',
                pwdMobileCode: '',
                pwdMobileKey: '',
                pwdTimer: null,
                // 微信
                wechat: JSON.parse(localStorage.getItem('user')).wechat,
                // QQ
                qq: JSON.parse(localStorage.getItem('user')).qq,
                // 提交数据
                c:{
                    type: "submit"
                }
            }
        },
        methods: {
            // 旧手机号的验证码
            oldMobileCodeClick() {
                var _this = this;
                if(this.oldMobileCodeText == '获取验证码' || this.oldMobileCodeText == '重发验证码'){
                    this.oldMobileCodeText = '发送中';
                    setTimeout(function(){
                        var couns = 90;
                        _this.oldTimer = window.setInterval(function(){
                            couns--
                            _this.oldMobileCodeText = couns + "s"
                            if(couns < 0){
                                window.clearInterval(_this.oldTimer);
                                _this.oldMobileCodeText = "重发验证码";
                            }
                        },1000)
                    },2000)
                }
            },
            // 旧手机号的下一步
            oldMobileClick() {
                var _this = this;
                if(this.oldMobileKey == ''){
                    this.$message.warning('请获取验证码')
                }else{
                }
            },
            // 新手机号的验证码
            newMobileCodeClick () {
                var _this = this;
                var tel = /^1[3456789]\d{9}$/;
                if(this.newMobile == ''){
                    this.$message.warning('请输入手机号码！')
                }else if(!tel.test(this.newMobile)) {
                    this.$message.warning('手机格式不正确！')
                }else{
                    if(this.newMobileCodeText == "获取验证码" || this.newMobileCodeText == "重发验证码"){
                        this.newMobileCodeText = '发送中';
                        setTimeout(function(){
                            var couns = 90;
                            _this.newTimer = window.setInterval(function(){
                                couns--;
                                _this.newMobileCodeText = couns + "s"
                                if(couns < 0){
                                    window.clearInterval(_this.newTimer);
                                    _this.newMobileCodeText = "重发验证码";
                                }
                            },1000)
                        },1000)
                    }
                }
            },
            // 修改手机提交
            modifyMobileSubmit () {
                var _this = this;
                if(this.newMobileKey == ''){
                    this.$message.warning('请获取验证码')
                }else{
                }
            },
            // 新账号密码-手机验证码
            pwdMobileCodeClick () {
                var _this = this;
                if(this.pwdMobileCodeText == "获取验证码" || this.pwdMobileCodeText == "重发验证码"){
                    this.pwdMobileCodeText = '发送中';
                    setTimeout(function(){
                        var couns = 90;
                        _this.pwdTimer = window.setInterval(function(){
                            couns--;
                            _this.pwdMobileCodeText = couns + "s"
                            if(couns < 0){
                                window.clearInterval(_this.pwdTimer);
                                _this.pwdMobileCodeText = "重发验证码";
                            }
                        },1000)
                    },1000)
                }
            },
            // 提交
            chgdataSubmit (item) {
                if(item == 'password'){
                    if(this.oldPassword.length < 8){
                        this.$message.warning("旧密码不能少于8位！")
                    }else if(this.newPassword.length < 8){
                        this.$message.warning("新密码不能少于8位！")
                    }else if(this.confirmPassword != this.newPassword){
                        this.$message.warning("确认密码和新密码不一样！")
                    }else{
                        this.c['oldpassword'] = this.oldPassword;
                        this.c['newpassword'] = this.newPassword;
                        if(localStorage.getItem('mobile')){
                            if(this.pwdMobileCode == ''){
                                this.$message.warning("请输入验证码")
                            }else if(this.pwdMobileKey == ''){
                                this.$message.warning("请获取验证码")
                            }else{
                                this.c['code'] = this.pwdMobileCode;
                                this.c['key'] = this.pwdMobileKey;
                                this.chgdataData()
                            }
                        }else{
                            this.chgdataData()
                        }
                    }
                }

                if(item == 'wechat'){
                    if(this.wechat == '' || !this.wechat){
                        this.$message.warning('请输入微信账号')
                    }else{
                        if(this.wechat == this.user.wechat){
                            this.$message.success('资料没有任何改变。')
                        }else{
                            this.c['wechat'] = this.wechat;
                            this.chgdataData()
                        }
                    }
                }

                if(item == 'qq'){
                    if(this.qq == '' || !this.qq){
                        this.$message.warning('请输入QQ账号')
                    }else{
                        if(this.qq == this.user.qq){
                            this.$message.success('资料没有任何改变。')
                        }else{
                            this.c['qq'] = this.qq;
                            this.chgdataData()
                        }
                    }
                }
            },
            chgdataData () {
                var _this = this;
                _this.$info({
                    title: '信息',
                    content: "修改成功",
                    onOk() {
                        _this.$router.go(-1)
                    },
                });
            },
        },
        beforeDestroy() {
            window.clearInterval(this.oldTimer);
            this.oldTimer = null;
            window.clearInterval(this.newTimer);
            this.newTimer = null;
        },
        mounted () {
            if(localStorage.getItem('mobile')){
                this.is_mobile = true;
                this.mobile = localStorage.getItem('mobile')
            }else{
                this.is_mobile = false;
            }
        }
    }
</script>

<style scoped>
    @import url(../../assets/css/changeData.css);
</style>