<template>
    <div class="help">
        <headers></headers>
        
        <div class="help_inner fix">
            <a-layout-sider class="help_nav">
                <ul>
                    <li 
                        v-for="(item,index) in navList" 
                        :key="index" 
                        :class="{ 'primary_color': item.showChild, 'primary_color': item.urlName == $route.name }"
                        @click="navClick(item)">
                        <span v-if="item.child.length > 0">{{ item.name }}</span>
                        <span v-else>
                            <router-link :class="{'primary_color': item.urlName == $route.name}" :to="item.url">{{ item.name }}</router-link>
                        </span>
                        <div class="help_nav_child" v-if="item.child.length > 0" v-show="item.showChild">
                            <p v-for="(v,i) in item.child" :key="i" :class="{ active: v.id == $route.params.id }">
                                <router-link :to="v.url" v-if="v.url != undefined">{{ v.name }}</router-link>
                            </p>
                        </div>
                    </li>
                </ul>
            </a-layout-sider>

            <a-layout-content>
                <router-view/>
            </a-layout-content>
        </div>

        <footers></footers>
    </div>
</template>

<script>
    import headers from '../../components/header';
    import footers from '../../components/footer';
    export default {
        data () {
            return {
                navList: [
                    {
                        name: '关于我们',
                        urlName: "aboutUs",
                        child: [
                            {
                                name: '企业简介',
                                url: '/aboutUs/1',
                                id: '1'
                            },
                            {
                                name: '企业精神',
                                url: '/aboutUs/2',
                                id: '2'
                            },
                            {
                                name: '牌照展示',
                                url: '/aboutUs/3',
                                id: "3"
                            },
                        ],
                        showChild: false,
                    },
                    {
                        name: '服务条款',
                        urlName: "termsOfService",
                        child: [],
                        url: '/termsOfService'
                    },
                    {
                        name: '产品信息',
                        urlName: "product",
                        child: [
                            {
                                name: '产品信息1',
                                url: "/product/1",
                                id: "1"
                            },
                            {
                                name: '产品信息2',
                                url: "/product/2",
                                id: "2"
                            },
                            {
                                name: '产品信息3',
                                url: "/product/3",
                                id: "3"
                            },
                        ],
                        showChild: false,
                    },
                    {
                        name: '联系我们',
                        urlName: 'contactUs',
                        child: [],
                        url: '/contactUs'
                    },
                ]
            }
        },
        methods: {
            navClick(item) {
                for(var i = 0; i < this.navList.length; i++){
                    this.navList[i].showChild = false;

                    // if(item.name == '服务条款' || item.name == '联系我们'){
                    //     this.$router.push('/' + item.urlName)
                    // }
                }
                item.showChild = true;
            }
        },
        mounted() {
            for(var i = 0; i < this.navList.length; i++){
                if(this.navList[i].urlName == this.$route.name){
                    this.navList[i].showChild = true
                }
            }
        },
        components: {
            headers,
            footers
        }
    }
</script>

<style scoped>
    @import url(../../assets/css/help.css);
</style>