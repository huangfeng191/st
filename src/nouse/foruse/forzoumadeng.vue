<template>
    <div id="cs">
        <div class="block">
            <span class="demonstration">默认 Hover 指示器触发</span>
            <el-carousel height="150px" interval="6000">
                <el-carousel-item v-for="item in 4">
                    <h3>{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {


        };
    },
    methods: {

    },
    watch: {

    },
    mounted() {}
};
</script>
<style lang="less">
#cs {
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
       
        line-height: 150px;
        margin: 0;
    }
    .el-carousel__indicators {
        left: 85%!important;
    }
    .el-carousel__button {
        width: 10px;
        height: 10px;
        background-color: #fff;
        -moz-border-radius: 5px!important;
        -webkit-border-radius: 5px!important;
        border-radius: 5px!important;
    }
    .el-carousel__indicator.is-active {
        .el-carousel__button{
             background-color: #01BAFA!important;
        }
       
    }


    .el-carousel__item:nth-child(2n) {
        background-color: red;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: black;
    }
}
</style>