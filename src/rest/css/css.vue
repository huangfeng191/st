<template>
  <div id="css">
    <div>
      <div
        class="simple"
        :class="cssObject"
      >
        对象模式
      </div>
      <div
        class="simple"
        :class="{ a: testBoolean }"
      >
        对象模式(布尔值，可通过计算获得)
      </div>
      <div
        class="simple"
        :class="cssStr.split(' ')"
      >
        类数组模式
      </div>
      <div
        class="simple"
        :class="['c', 1 == 1 ? 'a' : 'b']"
      >
        数组模式(切记类需要加**'') 可用三元运算符
      </div>
    </div>
    <div style="width:100%;float:left;height:30px;"></div>
    <p>------------------------------------↓ style----</p>
    <div
      class="simple"
      :style="styleObject"
    >
      样式对象,如果是复合属性需要用驼峰命名法
    </div>
    <div
      class="simple"
      :style="{ backgroundColor: '#444' }"
    >
      对象模式
    </div>
    <div
      class="simple"
      :style="[
        { backgroundColor: '#666' },
        1 != 1 ? { border: '2px red solid' } : { border: '2px blue solid' }
      ]"
    >
      数组模式,对象复合模式
    </div>
  </div>
</template>
<script>
function function_name(argument) {
  // body...
}
export default {
  data() {
    return {
      cssObject: {
        a: true, //对象模式， key 就是样式
        b: true
      },
      testBoolean: true,
      cssStr: "b c", // css 用函数， 其实就是 数组模式
      ////////////////
      styleObject: {
        backgroundColor: "#333",
        border: "3px #000 solid"
      }
    };
  },
  methods: {},

  watch: {},
  mounted() {}
};
</script>
<style lang="less">
#css {
  .a {
    background-color: red;
  }
  .b {
    background-color: blue;
  }

  .c {
    border: 2px black solid;
  }
  .simple {
    width: 100px;
    height: 100px;
    color: white;
    font-size: 14px;
    float: left;
  }
}
</style>
