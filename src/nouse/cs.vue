<template>
<div id="cs2">
  <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    size="tiny"
    :modal="false"
    :before-close="handleClose">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>

  <import-temp url="www.baidu.com"></import-temp>

</div>


</template>
<script>
import importTemp from "./components/importtemp.vue"
export default {
  data() {

      return {
        dialogVisible: false
      };
    },
    methods: {

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    },
    components:{
      importTemp
    }
  };

</script>
<style lang="less">
#cs2 {
  height: 100%;
}
</style>