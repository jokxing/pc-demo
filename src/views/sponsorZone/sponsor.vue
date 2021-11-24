<template>
    <div id="sponsor">
        <swiper :options="swiperOption" ref="mySwiper" :style="{ height: clientHeight }">
            <swiper-slide>
                <div class="sponsor_banner"></div>
            </swiper-slide>
            <swiper-slide class="section">
                <div class="sponsor_video">
                    <div class="sponsor_video_infor">
                        <h3>标题</h3>
                        <div class="video_box">
                            <div class="video_box_img">
                                <video poster="../../assets/img/sponsor/sponsor_video_img.png" style="" preload="none" controls="true" class="video">
                                    <source src="https://video_shejigao.redocn.com/video/201801/20180131/Redcon_201801291114374680611275.mp4" type="video/mp4">
                                </video>
                            </div>
                            <div class="football_text">
                                <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
                            </div>
                        </div>
                    </div>
                    <div class="sponsor_match">
                        <h3>标题</h3>
                        <div class="video_list">
                            <div class="video_item" @click="showVideoModal = true;videoNum = 1">
                                <a-icon type="play-circle" />
                                <img src="../../assets/img/sponsor/sponsor_video_img.png" width="252" height="145">
                                <p>name</p>
                            </div>
                            <div class="video_item" @click="showVideoModal = true;videoNum = 2">
                                <a-icon type="play-circle" />
                                <img src="../../assets/img/sponsor/sponsor_video_img.png" width="252" height="145">
                                <p>name</p>
                            </div>
                            <div class="video_item" @click="showVideoModal = true;videoNum = 3">
                                <a-icon type="play-circle" />
                                <img src="../../assets/img/sponsor/sponsor_video_img.png" width="252" height="145">
                                <p>name</p>
                            </div>
                            <div class="video_item" @click="showVideoModal = true;videoNum = 4">
                                <a-icon type="play-circle" />
                                <img src="../../assets/img/sponsor/sponsor_video_img.png" width="252" height="145">
                                <p>name</p>
                            </div>
                        </div>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide class="section">
                <div class="sponsor_box">
                </div>
            </swiper-slide>

            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
        <!-- video弹窗 -->
        <transition name="video-modal">
            <div class="video_modal" v-if="showVideoModal" @click="showVideoModal = false;">
                <div class="video_box" :class="'video_box' + videoNum">
                    <video poster="../../assets/img/sponsor/sponsor_video_img.png" style="" preload="none" controls="true" class="video">
                        <source src="https://video_shejigao.redocn.com/video/201801/20180131/Redcon_201801291114374680611275.mp4" type="video/mp4">
                    </video>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import 'swiper/swiper-bundle.css'
    export default {
        data () {
            return {
                swiperOption: {
                    direction: 'vertical',
                    height: document.documentElement.clientHeight,
                    mousewheel: true,
                    pagination:{
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                },
                clientHeight: document.documentElement.clientHeight + 'px',
                showVideoModal: false,
                videoNum: 0
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.$swiper
            }
        },
        mounted () {
            // 监听浏览器窗口大小
            window.onresize = () => {
                this.clientHeight = document.body.clientHeight + 'px';
            };
        },
        components: {
            swiper,
            swiperSlide
        }
    }
</script>

<style scoped>
    @import url(../../assets/css/sponsor.css);
</style>