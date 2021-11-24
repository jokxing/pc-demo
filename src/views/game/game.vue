<template>
    <div>
        <div class="venuePage">
            <div v-for="(item,index) in venueArr" :key="index">
                <div class="venuePage_bg" :style="'background-image: url(' + item.bg + ')'" v-show="num == index"></div>
                <div class="venuePage_inner">
                    <div class="venuePage_content">
                        <div class="venuePage_left">
                            <transition 
                                name="venue"
                                appear
                                appear-class="venue-appear-class"
                                appear-active-class="venue-appear-active-class">
                                <img :src="item.title" height="112" v-show="num == index">
                            </transition>
                            <transition 
                                name="venueWord"
                                appear
                                appear-class="venueWord-appear-class"
                                appear-active-class="venueWord-appear-active-class">
                                <p v-show="num == index">{{ item.word }}</p>
                            </transition>
                            <transition 
                                name="venue"
                                appear
                                appear-class="venue-appear-class"
                                appear-active-class="venue-appear-active-class">
                                <button :style="'color:' + item.btnColor" v-show="num == index" v-if="item.status == 1" @click="goGameClick(item)">进入</button>
                                <button class="maintain_btn" v-show="num == index" v-if="item.status == 2">维护中</button>
                            </transition>
                        </div>
                        <transition 
                            name="venueImg"
                            appear
                            appear-class="venueImg-appear-class"
                            appear-active-class="venueImg-appear-active-class">
                            <div class="venuePage_img" :style="'right:' + item.right + ';top:' + item.top" v-show="num == index">
                                <img :src="item.gameImg" :width="item.gameImgWidth">
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
            
            <div class="venuePage_tab sport_tab">
                <ul :style="'background-image: url(' + venueArr[num].tabBg + ')'">
                    <li 
                        v-for="(item,index) in tabs" 
                        :key="index" 
                        :class="{ active: num == index}" 
                        @click="num = index;"
                        :style="'color:' + venueArr[num].tabColor"
                        style="font-size: 18px;">{{ item.name }}</li>
                </ul>
            </div>
        </div>

        <a-spin v-show="showLoading" tip="更新数据中。。。"></a-spin>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showLoading: false,
                tabs: [
                    {
                        name: '标题1',
                        code: 'code1',
                        num: 0
                    },
                    {
                        name: '标题2',
                        code: 'code2',
                        num: 1
                    },
                    {
                        name: '标题3',
                        code: 'code3',
                        num: 2
                    },
                ],
                num: 0,
                venueArr: [
                    {
                        bg: require('../../assets/img/game/bg1.png'),
                        tabBg: require('../../assets/img/game/tabBg1.png'),
                        tabColor: "#8CC198",
                        title: require('../../assets/img/game/title.png'),
                        word: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
                        btnColor: "#003A9E",
                        gameImg: require('../../assets/img/header/header_img.png'),
                        gameImgWidth: "524",
                        right: "130px",
                        top: "47px",
                        code: 'code1',
                        name: '标题',
                        status: 1
                    },
                    {
                        bg: require('../../assets/img/game/bg2.png'),
                        tabBg: require('../../assets/img/game/tabBg2.png'),
                        tabColor: "#4EB9FF",
                        title: require('../../assets/img/game/title.png'),
                        word: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
                        btnColor: "#003A9E",
                        gameImg: require('../../assets/img/header/header_img.png'),
                        gameImgWidth: "524",
                        right: "130px",
                        top: "47px",
                        code: 'code2',
                        name: '标题',
                        status: 1
                    },
                    {
                        bg: require('../../assets/img/game/bg3.png'),
                        tabBg: require('../../assets/img/game/tabBg3.png'),
                        tabColor: "#AF6ED3",
                        title: require('../../assets/img/game/title.png'),
                        word: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
                        btnColor: "#6E43C7",
                        gameImg: require('../../assets/img/header/header_img.png'),
                        gameImgWidth: "524",
                        right: "130px",
                        top: "47px",
                        code: 'code3',
                        name: '标题',
                        status: 1
                    },
                ],
            }
        },
        methods: {
            goGameClick(item){
                this.$emit('hanldGoGame', item.code)
            }
        },
        mounted () {
            if(this.$route.params.code){
                for(var i = 0; i < this.tabs.length; i++){
                    if(this.tabs[i].code == this.$route.params.code){
                        this.num = this.tabs[i].num
                    }
                }
            }
        },
    }
</script>
