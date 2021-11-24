<template>
    <div class="deposit">
        <a-row class="deposit_type">
            <p>方式：</p>
            <ul>
                <li v-for="(item, index) in types" :key="index">
                    <router-link :to="item.url" :class="{ 'tab_actvie': item.url == $route.path }">
                        {{ item.text }}
                    </router-link>
                </li>
            </ul>
            <img src="../../assets/img/user/recommend.svg">
        </a-row>

        <a-row class="deposit_box">
            <router-view />
        </a-row>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                types:[
                    {
                        text: 'tab1',
                        url: "/rmbDeposit"
                    },
                    {
                        text: 'tab2',
                        url: "/usdtDeposit"
                    }
                ],
            }
        }  
    }
</script>

<style>
    @import url(../../assets/css/deposit.css);
</style>