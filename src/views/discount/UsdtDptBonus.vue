<template>
    <div class="UsdtDptBonus preferentialActivity_bg">
        <headers></headers>

        <a-row class="preferentialActivity_banner"></a-row>

        <a-row class="preferentialActivity_inner">
            <a-row class="activity_conditions">
                <h3>标题7</h3>
            </a-row>
        </a-row>

        <footers></footers>
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