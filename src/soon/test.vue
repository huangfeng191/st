<template>
    <div class="test">

        <div style="width:300px;height:300px;box-sizing:border-box;background-color:yellow;">

            <i style="width:20px;height:100px;background-color:#e4e8f1;display:inline-block;position:relative;">
                <i style="width:20px;height:50px;background-color:gray;display:inline-block;position:absolute;">
                </i>
            </i>

        </div>
        <el-progress :text-inside="true" show-text="false" :stroke-width="18" :percentage="0"></el-progress>
        <el-progress :text-inside="true" show-text="false" :stroke-width="18" :percentage="10" status="success"></el-progress>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="20"></el-progress>
        <el-progress :text-inside="true" :stroke-width="200" :percentage="40" style="width:18px;"></el-progress>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="80"></el-progress>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="50" status="exception"></el-progress>
        -----------------
        <progress-vertical w="20" h="60" bg-color-bottom="red" rate="0.4" bg-color-top="blue"> </progress-vertical>
        <progress-vertical w="20" h="60" bg-color-bottom="red" rate="0.4" bg-color-top="blue"> </progress-vertical>
        <progress-vertical w="20" h="60" bg-color-bottom="red" rate="0.4" bg-color-top="blue"> </progress-vertical>
        <progress-level w="80" h="20" bg-color-bottom="red" rate="0.4" bg-color-top="blue"> </progress-level> 

        <div class="align_bottom">
            <icon name="shijian1" class="margin_right_90">
                <div style="top: -180px; position: absolute;left: -16px;">
                    <subject w="542px" h="166px"></subject>
                </div>
            </icon>
            <icon name="sousuo" class="margin_right_90">
                <div style="top: -180px; position: absolute;left: -16px;">
                    <subject w="542px" h="166px"></subject>
                </div>
            </icon>
            <icon name="tuceng" class="margin_right_90"></icon>
            <icon name="shijian1" class="margin_right_90"></icon>
        </div>
    </div>

</template>

<script>
import icon from "./part/icon.vue";
import subject from "./part/subject.vue";
import progressVertical from "./comm/show/progressVertical.vue";
import progressLevel from "./comm/show/progressLevel.vue";
export default {
  props: {},
  data() {
    return {
      show1: true
    };
  },
  created() {},
  mounted() {},
  methods: {
    showShijian1: function() {
      ;
      this.show1 = !this.show1;
    }
  },
  watch: {},
  components: {
    icon,
    subject,
    progressVertical,
    progressLevel
  }
};
</script>
<style lang="less" >
.test {
  .align_bottom {
    position: absolute;
    bottom: 50px;
    left: 500px;
  }
  .margin_right_90 {
    position: relative;
    margin-right: 90px;
  }

  .el-progress.is-success .el-progress-bar__inner {
    background-color: blueviolet;
  }
  i {
    border-radius: 100px;
    line-height: 1;
  }
}
</style>
