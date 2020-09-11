<template>
<el-row class="tac">

  <el-col :span="12">
    <h5>自定义颜色</h5>
    <el-button type="text" @click="cgMenu(0)">测试0</el-button>
    <el-button type="text" @click="cgMenu(1)">测试1</el-button>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">

      <template v-for="r in cmenu"> 
          <el-menu-item :index="r.Id">
            <i class="el-icon-menu"></i>
            <span slot="title">{{r.name}}</span>
          </el-menu-item>

      </template>
      
    </el-menu>
  </el-col>
</el-row>
	</div>

</template>
<script>
export default {
  data() {
    return {
     m:[{ menus:[
        {"Id":1,"name":"1"},
        {"Id":2,"name":"2"},
        {"Id":3,"name":"3"},
        {"Id":4,"name":"4"},
      ]},
      { menus:[
        {"Id":11,"name":"11"},
        {"Id":21,"name":"21"},
        {"Id":31,"name":"31"},
        {"Id":41,"name":"41"},
      ]}
      ],
      message: "Hello 11Vue!",
      lvl: 1,
      idx:0
    };
  },

  methods: {
    cgMenu:function(i){
      this.idx=i;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed:{
    cmenu:function(){

      return this.m[this.idx].menus
    }
  },
  watch: {},
  mounted() {},
  components: {}
};
</script>
<style lang="less">
#cs2 {
}
</style>