<template>
    <div class="components-importtemp">
        <el-dropdown @command="handleCommand">
            <el-button type="primary">
                导入
                <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="import">导入</el-dropdown-item>
                <el-dropdown-item command="export"><a href="www.baidu.com">模板1</a></el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>

</template>

<script>
import {CRUD} from "../../modules/service.js"
export default {
  props: {
      url:String
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    handleCommand: function(command) {
      ;
      let self = this;
      if (command == "import") {
        self.myImport();
      } else {
        self.myExport();
      }
    },
    myImport: function() {
      console.log("import "+this.url);
    },
    myExport: function() {
        CRUD("importtemp","baoxing").querySync({}).done(
         data=>{
             
         }
        )
      console.log("export "+this.url);
    }
  },
  watch: {},
  components: {}
};
</script>
<style lang="less" >
.components-importtemp {
}
</style>