<template>
    <div id="home">
        <banners></banners>
        
        <headers></headers>

        <gameVenue ref="gameVenue"></gameVenue>

        <div ref="appDownload" class="home_box fix">
            <div class="home_box_inner">
                 <div class="home_box_top fix">
                    <span class="primary_bg"></span>
                    <img src="../../assets/img/home/title_box.png" height="34">
                    <p>小标题 小标题</p>
                </div>
                <div class="app_download fix">
                    <div class="app_download_left">
                        <img v-if="showAppImg" src="../../assets/img/home/box_img.png" width="470" :style="{ marginTop: appImgTop }">
                    </div>
                    <div class="app_download_right">
                        <h2><img src="../../assets/img/home/app_download_title.png"></h2>
                        <p class="word">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
                        <div id="qrcode" v-if="showAppImg" :style="{ marginTop: downloadQrcode, opacity: downOpacity }">
                            <div class="qrcode">
                            </div>
                            <p>扫码下载APP<br>iOS & Android</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="home_box fix" ref="advantages">
            <div class="home_box_inner fix">
                <div class="home_box_top fix">
                    <span class="primary_bg"></span>
                    <img src="../../assets/img/home/title_box.png" height="34">
                    <p>小标题 小标题</p>
                </div>
                
                <div class="advantages">
                    <ul>
                        <li :style="{ marginTop: advantagesTop, opacity: advantagesOpacity }">
                            <img v-if="showAdvantages" src="../../assets/img/home/box_img.png" width="80">
                            <h5>标题</h5>
                            <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
                        </li>
                        <li :style="{ marginTop: advantagesTop, opacity: advantagesOpacity }">
                            <img v-if="showAdvantages" src="../../assets/img/home/box_img.png" width="80">
                            <h5>标题</h5>
                            <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
                        </li>
                        <li :style="{ marginTop: advantagesTop, opacity: advantagesOpacity }">
                            <img v-if="showAdvantages" src="../../assets/img/home/box_img.png" width="80">
                            <h5>标题</h5>
                            <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
                        </li>
                        <li :style="{ marginTop: advantagesTop, opacity: advantagesOpacity }">
                            <img v-if="showAdvantages" src="../../assets/img/home/box_img.png" width="80">
                            <h5>标题</h5>
                            <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 底部 -->
        <footers></footers>
    </div>
</template>

<script>
    import headers from '../../components/header.vue'
    import banners from './banner.vue'
    import gameVenue from './gameVenue.vue'
    import footers from '../../components/footer.vue'
    import { isElementNotInViewport } from '../../assets/js/func'
    export default {
        data () {
            return {
                // 第二段-特效
                appImgTop: "50px",
                downloadQrcode: "80px",
                downOpacity: 0.5,
                // 第三段-特效
                advantagesTop: "30px",
                advantagesOpacity: 0.5,
                // 获取上一页的路由
                fromUrl: "",
                // 第一段到可视区显示
                showAppImg: false,
                // 第二段滚动到可视区显示
                showSponsor: false,
                // 第三段滚动到可视区显示
                showAdvantages: false,
            }
        },
        methods: {
            // 滚动栏
            listenerFunction(e) {
                document.addEventListener('scroll', this.handleScroll, true);
            },
            // 监听滚动栏
            handleScroll () {
                // console.log(window.pageYOffset)
                if(window.pageYOffset >= 750){
                    this.appImgTop = "0px"
                }
                if(window.pageYOffset >= 880){
                    this.downloadQrcode = "40px";
                    this.downOpacity = 1
                }
                if(window.pageYOffset >= 1500){
                    this.advantagesTop = "0";
                    this.advantagesOpacity = 1
                }
            },
            scrollToTop() {
                if(isElementNotInViewport(this.$refs.gameVenue)){
                    this.$refs.gameVenue.showImg = true;
                }
                if(isElementNotInViewport(this.$refs.appDownload)){
                    this.showAppImg = true;
                }
                if(isElementNotInViewport(this.$refs.sponsor)){
                    this.showSponsor = true
                }
                if(isElementNotInViewport(this.$refs.advantages)){
                    this.showAdvantages = true
                }
            }
        },
        created () {
            // 滚动栏
            this.listenerFunction();

            // 刷新页面判断滚动栏位置
            if(window.pageYOffset >= 750){
                this.appImgTop = "0px"
            }
            if(window.pageYOffset >= 880){
                this.downloadQrcode = "40px";
                this.downOpacity = 1
            }
            if(window.pageYOffset >= 1500){
                this.advantagesTop = "0";
                this.advantagesOpacity = 1
            }
        },
        mounted () {
            window.addEventListener("scroll", this.scrollToTop);
        },
        beforeDestroy () {
            document.removeEventListener("scroll", this.listenerFunction);

            // 离开路由移除滚动事件
            window.removeEventListener('scroll',this.scrollToTop);
        },
        components: {
            headers,
            banners,
            gameVenue,
            footers,
        },
		// 获取上一页的路由
	    beforeRouteEnter(to, from, next){
            next(vm =>{
				vm.fromUrl = from.path;
			})
        },
    }
</script>

<style scoped>
    @import url("../../assets/css/home.css");
</style>