<template>
    <div class="product">
        <div class="product_infor" v-if="$route.params.id == 1">
            <h5 class="primary_color">产品信息1</h5>
        </div>
        
        <div class="product_infor" v-if="$route.params.id == 2">
            <h5 class="primary_color">产品信息2</h5>
        </div>
        
        <div class="product_infor" v-if="$route.params.id == 3">
            <h5 class="primary_color">产品信息3</h5>
        </div>
    </div>
</template>