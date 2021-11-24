<template>
    <div class="home_box fix">
        <div class="home_box_inner">
            <div class="home_box_top fix">
                <span class="primary_bg"></span>
                <img src="../../assets/img/home/title_box.png" height="34">
                <p>小标题小标题</p>
            </div>
            <div class="game_venue fix">
                <div class="game_venue_left" >
                    <ul>
                        <li v-if="showImg">
                            <img src="../../assets/img/home/box_img.png" width="262">
                            <div class="game_venue_name">
                                <h3 class="primary_color">标题</h3>
                                <p class="primary_color">title title</p>
                                <span class="primary_bg"></span>
                            </div>
                        </li>
                        <li v-if="showImg">
                            <img src="../../assets/img/home/box_img.png" width="262">
                            <div class="game_venue_name">
                                <h3 class="primary_color">标题</h3>
                                <p class="primary_color">title title</p>
                                <span class="primary_bg"></span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="game_venue_right">
                    <ul>
                        <li v-if="showImg">
                            <img src="../../assets/img/home/box_img.png" width="150">
                            <div class="game_venue_name">
                                <h3 class="primary_color">标题</h3>
                                <p class="primary_color">title title</p>
                                <span class="primary_bg"></span>
                            </div>
                        </li>
                        <li v-if="showImg">
                            <img src="../../assets/img/home/box_img.png" width="150">
                            <div class="game_venue_name">
                                <h3 class="primary_color">标题</h3>
                                <p class="primary_color">title title</p>
                                <span class="primary_bg"></span>
                            </div>
                        </li>
                        <li v-if="showImg">
                        <img src="../../assets/img/home/box_img.png" width="150">
                            <div class="game_venue_name">
                                <h3 class="primary_color">标题</h3>
                                <p class="primary_color">title title</p>
                                <span class="primary_bg"></span>
                            </div>
                        </li>
                        <li v-if="showImg">
                            <img src="../../assets/img/home/box_img.png" width="150">
                            <div class="game_venue_name">
                                <h3 class="primary_color">标题</h3>
                                <p class="primary_color">title title</p>
                                <span class="primary_bg"></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                showImg: false,
            }
        }
    }
</script>
