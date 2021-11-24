<template>
    <div>
        <headers></headers>
        
        <a-row class="password">
            <h2 class="primary_color">忘记密码</h2>
        </a-row>

        <footers></footers>
    </div>
</template>

<script>
    import headers from '../../components/header.vue'
    import footers from '../../components/footer.vue'
    export default {
        components:{
            headers,
            footers
        }
    }
</script>

<style scoped>
    @import url(../../assets/css/login.css);
</style>