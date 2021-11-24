<template>
    <div id="banner">
        <div class="banner_main">
            <a-carousel arrows autoplay>
                <div
                    slot="prevArrow"
                    class="custom-slick-arrow"
                    style="left: 10px;zIndex: 1"
                >
                    <a-icon type="left" />
                </div>
                <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
                    <a-icon type="right" />
                </div>
                <div class="banner_img">
                    <img :src="require('../../assets/img/home/banner' + (is_webp ? '.webp' : '.png'))">
                </div>
                <div class="banner_img">
                    <img :src="require('../../assets/img/home/banner' + (is_webp ? '.webp' : '.png'))">
                </div>
            </a-carousel>
        </div>

        <div class="info_information">
            <div class="home_notice_inner fix" @click="showNotice = true">
                <img src="../../assets/img/icon_home_notice.png" width="22">
                <marquee data-show="true" behavior="scroll" onmouseover="this.stop()" onmouseout="this.start()" scrollamount="3">{{ q.content }}</marquee>
            </div>
        </div>

        <a-modal
            title="重要公告"
            :visible="showNotice"
            class="horse_notice"
            @cancel="showNotice = false"
            >
            <div class="horse_notice_main">
                <div class="notice_list" v-for="(item,index) in noticeList" :key="index">
                    <h4>【{{ item.title }}】</h4>
                    <p class="content">{{ item.content }}</p>
                    <p class="date">{{ item.date }}</p>
                </div>
            </div>
            <template slot="footer">
                <div class="modal_one_btn">
                    <a-button class="gradients_btn" @click="showNotice = false">确认</a-button>
                </div>
            </template>
        </a-modal>

        <!-- 提示登录 -->
        <a-modal
            title="温馨提示"
            :visible="showLoginTs"
            :width="360"
            @cancel="showLoginTs = false"
            >
            <p>请先登录账号,才能了解更多</p>
            <template slot="footer">
                <div class="modal_one_btn">
                    <a-button key="submit" class="gradients_btn" @click="$router.push('/login')">确认</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>

<script>
    import { announcementApi } from '../../http/api'
    export default {
        data () {
            return {
                showLoginTs: false,
                is_webp: false,
                showNotice: false,
                q: '',
                noticeList: [],
                bannerDate: '20201219'
            }
        },
        methods: {
            bannerClick (url) {
                if(localStorage.getItem('access_token')){
                    this.$router.push(url)
                }else{
                    this.showLoginTs = true
                }
            },
            announcement() {
                var _this = this;
                var data = '?type=跑马灯1&host=' + window.location.host
                announcementApi(data).then(res => {
                    _this.q = res.data.message
                    var arr = _this.q.content.split("::")
                    for(var i = 0; i < arr.length; i++){
                        _this.noticeList.push({
                            title: arr[i].split("：")[0],
                            content: arr[i].split("#")[0],
                            date: arr[i].split("#")[1]
                        })
                    }
                }).catch(err => {

                })
            },
        },
        mounted () {
            this.announcement()
            if(document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0){
                this.is_webp = true;
            }else{
                this.is_webp = false
            }
        }
    }
</script>