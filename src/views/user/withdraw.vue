<template>
    <div>
        <div class="withdraw_type">
            <p>方式</p>
            <ul class="fix">
                <li 
                    v-for="(item,index) in types" 
                    :key="index" 
                    :class="{ 'tab_actvie': item.url == $route.path }" 
                    @click="$router.push(item.url)">
                    {{ item.text }}
                </li>
            </ul>
            <img src="../../assets/img/user/recommend.svg">
        </div>

        <router-view/>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                types:[
                    {
                        text: 'tab1', 
                        url: '/rmbWithdraw'
                    },
                    {
                        text: 'tab2',
                        url: '/usdtWithdraw'
                    }
                ],
            }
        },
        mounted () {
        }
    }
</script>

<style scoped>
    @import url(../../assets/css/withdraw.css);
</style>