<template>
       <i class="i_icon" :style="{backgroundColor:bgcolor}" @click="isShow=!isShow"><span :class="'iconfont icon-' + name" :style="{fontSize:fsize}"></span>
            <slot v-if="isShow"></slot>
       </i>

</template>

<script>
export default {
  props: {
      name: String,
      fsize:String,
      bgcolor:String
  },
  data(){
    return {
        isShow:false
    }
  },
  created() {},
  mounted() {
  
      
  },
  methods: {},
  watch: {},
  components:{}
};
</script>
<style lang="less" >
.i_icon{
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: 42px;
    width: 42px;
	height: 42px;
	border-radius: 3px;
    border: solid 1px #465361;
    span{
    font-size: 38px;
    }
}
</style>