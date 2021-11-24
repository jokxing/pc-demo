<template>
    <div class="ChessSave preferentialActivity_bg">
        <headers></headers>

        <a-row class="preferentialActivity_banner"></a-row>

        <a-row class="preferentialActivity_inner">
            <a-row class="my_money" v-if="is_token">
                <h3>标题3</h3>
            </a-row>
        </a-row>

        <footers></footers>

        <a-spin v-show="showLoading"></a-spin>
    </div>
</template>

<script>
    import headers from '../../components/header';
    import footers from '../../components/footer';
    export default {
        components: {
            headers,
            footers
        }
    }
</script>

<style scoped>
    @import url(../../assets/css/preferentialActivity.css);
</style>