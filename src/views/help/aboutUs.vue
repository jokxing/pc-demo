<template>
    <div class="about_us">
        <div v-if="$route.params.id == 1">
            <h5>企业简介</h5>
        </div>

        <div v-if="$route.params.id == 2">
            <h5>企业精神</h5>
        </div>

        <div v-if="$route.params.id == 3">
            <h5>牌照展示</h5>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                visible: false
            }
        },
    }
</script>