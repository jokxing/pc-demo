<template>
    <div id="login">
        <video id="login_video" muted autoplay>
            <source src="https://video_shejigao.redocn.com/video/201801/20180131/Redcon_201801291114374680611275.mp4" type="video/mp4">
        </video>
        <div class="login_main">
            <img src="../../assets/img/logo_white.png" class="login_logo">
            <div class="login_form">
                <ul v-if="this.$route.path == '/login'">
                    <li>
                        <span class="icon"><a-icon type="user" /></span>
                        <input type="text" placeholder="手机/用户名" maxlength="11" v-model="l.username" @keyup="loginKeyup">
                        <p class="red" v-show="l.username.length > 0 && l.username.length < 6">6-10个英、数字符</p>
                    </li>
                    <li>
                        <span class="icon"><a-icon type="lock" /></span>
                        <input type="password" placeholder="密码" maxlength="15" v-model="l.password" @keyup="loginKeyup" @keyup.enter="loginClick">
                        <p class="red" v-show="l.password.length > 0 && l.password.length < 8">8-15个英、数字符</p>
                    </li>
                    <li style="margin-bottom: 16px;">
                        <a-button type="primary" :disabled="loginDis" @click="loginClick" :loading="showLoginLoading">{{ loginText }}</a-button>
                    </li>
                    <li>
                        <router-link to="/password" class="left">忘记密码？</router-link>
                        <router-link to="/register" class="right primary_color">立即注册</router-link>
                    </li>
                </ul>

                <ul v-if="this.$route.path == '/register'">
                    <li>
                        <span class="icon"><a-icon type="user" /></span>
                        <input type="text" placeholder="用户名（请输入6-10位英、数字符）" maxlength="10" v-model="r.name" onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" @keyup="registerKeyup">
                        <p class="red" v-show="r.name.length > 0 && r.name.length < 6">请输入6-10位英、数字符</p>
                    </li>
                    <li>
                        <span class="icon"><a-icon type="lock" /></span>
                        <input type="password" placeholder="密码（请输入8-15位英、数字符)" maxlength="15" v-model="registerPass" onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" @keyup="registerKeyup">
                        <p class="red" v-show="registerPass.length > 0 && registerPass.length < 8">请输入8-15个英、数字符</p>
                    </li>
                    <li>
                        <span class="icon"><a-icon type="lock" /></span>
                        <input type="password" placeholder="请再次确认密码" maxlength="15" v-model="r.password" onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" @keyup="registerKeyup" @blur="passWordBlur">
                        <p class="red" v-show="r.password.length > 0 && r.password.length < 8">8-15个英、数字符</p>
                        <p class="red" v-show="showPassAtypism">密码输入不一致</p>
                    </li>
                    <li @click="checkClick" style="cursor: pointer;text-align: left;">
                        <span class="check" :class="{ 'primary_bg_color': is_check, 'primary_border': is_check }"><a-icon type="check" v-show="is_check" /></span>
                        我已满18岁，并同意投注相关规范及<span class="primary_color">服务条款</span>。
                    </li>
                    <li style="margin-bottom: 16px;">
                        <a-button type="primary" :disabled="registerDis" :loading="showLoginLoading" @click="registerClick">注册</a-button>
                    </li>
                    <li>已有账号？<router-link to="/login" class="primary_color">请登录</router-link></li>
                </ul>
            </div>
        </div>

        <button id="unmuteButton" style="display:none"></button>

        <a-spin v-show="showLoading"></a-spin>
    </div>
</template>

<script>
    import { initApi, loginApi } from '../../http/api'
    export default {
        data() {
            return {
                showLoading: false,
                showLoginLoading: false,
                // 登录
                l: {
                    username: "",
                    password: "",
                    userAgent: navigator.userAgent,
                    host: window.location.host,
                    ip: "",
                    uuid: "",
                },
                loginDis: true,
                loginText: '登录',
                // 注册
                registerPass: "",
                r:{
                    agent: '',
                    AgentHostKey: '',
                    realname: "",
                    name: "",
                    password: "",
                    is_phonemsg: 0,
                    u_code: "",
                },
                showPassAtypism: false,
                is_check:false,
                registerDis: true,
            }
        },
        methods: {
            // 初始化
            init () {
                var _this = this;
                initApi().then(res => {
                    if(_this.$cookies.get('AgentCode')){
                        _this.r.agent = _this.$cookies.get('AgentCode');
                    }else{
                        _this.r.agent = res.data.message.f_AgentCode;
                    }
                    _this.r.AgentHostKey = res.data.message.f_AgentHostKey;
                }).catch(err => {

                })
            },
            loginKeyup () {
                if(this.l.username.length < 6 || this.l.password.length < 8){
                    this.loginDis = true
                }else{
                    this.loginDis = false
                }
            },
            loginClick() {
                if(!this.loginDis){
                    this.loginData()
                }
            },
            loginData () {
                var _this = this;

                function bin2hex(str) {
                    var result = "";
                    for (var i = 0; i < str.length; i++ ) {
                        result += int16_to_hex(str.charCodeAt(i));
                    }
                    return result;
                }
        
                function int16_to_hex(i) {
                    var result = i.toString(16);
                    var j = 0;
                    while (j+result.length < 4){
                        result = "0" + result;
                        j++;
                    }
                    return result;
                }
                // 生成uuid
                function get_uuid(){
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    var txt = window.location.host;
                    ctx.textBaseline = "top";
                    ctx.font = "14px 'Arial'";
                    ctx.textBaseline = "tencent";
                    ctx.fillStyle = "#f60";
                    ctx.fillRect(125,1,62,20);
                    ctx.fillStyle = "#069";
                    ctx.fillText(txt, 2, 15);
                    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
                    ctx.fillText(txt, 4, 17);

                    var b64 = canvas.toDataURL().replace("data:image/png;base64,","");
                    var bin = atob(b64);
                    var crc = bin2hex(bin.slice(-16,-12));
                    //var crc = bin.slice(-16,-12);
                    return crc;
                }
                this.l.uuid = get_uuid();
                // IP
                var cip;
                if (typeof(returnCitySN) != "undefined"){
                    this.l.ip  = returnCitySN["cip"]
                }

                
                this.showLoginLoading = true;
                loginApi(_this.l).then(res => {
                    _this.showLoginLoading = false;
                    const expires_time = new Date().getTime() + res.data.expires_in * 1000;
                    if(res.data.access_token){
                        localStorage.setItem("access_token", res.data.access_token);
                        localStorage.setItem("expires_time", expires_time);
                    }
                    _this.$router.push('/home')
                }).catch(err => {
                    _this.showLoginLoading = false;

                    if(err){
                        if(err.status_code){
                            _this.$message.error(err.message)
                        }
                    }else{
                        _this.$message.error('网络不给力')
                    }
                })
            },
            registerKeyup () {
                if(this.r.password.length < 6) {
                    this.showPassAtypism = false
                }
                if(this.r.name.length < 6 || this.registerPass.length < 6 || this.r.password.length < 6 || !this.is_check){
                    this.registerDis = true;
                }else{
                    this.registerDis = false
                }
            },
            checkClick () {
                this.is_check =! this.is_check;
                this.registerKeyup()
            },
            passWordBlur () {
                if(this.r.password.length > 5){
                    if(this.r.password != this.registerPass){
                        this.showPassAtypism = true
                    }else{
                        this.showPassAtypism = false
                    }
                }
            },
            registerClick() {
                var _this = this;
                if(this.r.password != this.registerPass){
                    this.$message.error('密码不一致')
                }else{

                }
            }
        },
        mounted () {
            this.init();
            unmuteButton.addEventListener('click', function() {
                document.getElementById("login_video").play()
            });

            // 获取ip
			this.h = this.headerMenuState;
			const s = document.createElement('script');
		    s.type = 'text/javascript';
		    if(window.location.protocol == "http:"){
		    	s.src = 'http://pv.sohu.com/cityjson?ie=utf-8';
		    };
		    if(window.location.protocol == "https:"){
		    	s.src = 'https://pv.sohu.com/cityjson?ie=utf-8';
		    };
            document.body.appendChild(s);

            if (this.$cookies.isKey('AgentCode') == true) {
				this.r.agent = this.$cookies.get('AgentCode')
            }

            // 链接带u_code
            this.r.u_code = this.$router.history.current.query.u_code;
        },
        watch: {
            $route (to, from){
                this.l.username = '';
                this.l.password = '';

                this.r.realname = '';
                this.r.name = '';
                this.registerPass = '';
                this.r.password = '';
                
                this.showPassAtypism = false;
            }
        },
    }
</script>

<style scoped>
    @import url(../../assets/css/login.css);
</style>