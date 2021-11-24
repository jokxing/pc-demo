<template>
    <div>
        <headers ref="headers"></headers>
        
        <router-view @hanldGoGame="hanldGoGame($event)"/>

        <footers></footers>
    </div>
</template>

<script>
    import headers from '../../components/header';
    import footers from '../../components/footer'
    export default {
        data() {
            return {
            }
        },
        methods: {
            hanldGoGame(msg) {
                console.log(msg)
            }
        },
        components: {
            headers,
            footers
        }
    }
</script>

<style scoped>
    @import url(../../assets/css/game.css);
</style>