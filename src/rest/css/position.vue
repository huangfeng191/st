<template>
  <div
    id="position"
    style="position:relative"
  >
    <!-- position:absolute 脱离默认文档流，相对浏览器,在无top left 等属性的时候，占据原位置
                      relative：原地脱离（top left ）,保留原位置
                      f


 -->
    <div style="width:200px;height:200px;border:1px red solid;">
    </div>
    <div
      id="a"
      class="out"
      style="background-color: green; position:relative; left:110px;top:100px;z-index:12"
    >
      <div
        id="aa"
        class="in"
        style=""
      >
        1
      </div>
    </div>
    <div
      id="b"
      class="out"
      style="position:absolute;z-index:11;top:250px; "
    >
      <div
        id="bb"
        class="in"
        style=""
      >
        2
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {},
  watch: {},
  mounted() {}
}

/*
语法：
position : static | absolute | fixed | relative
取值：
static :默认值。无特殊定位，对象遵循HTML定位规则
absolute :将对象从文档流中拖出，使用 left ， right ， top ， bottom 等属性相对于其最接近的一个最有定位设置的父对象进行绝对定位。如果不存在这样的父对象，则依据 body 对象。而其层叠通过 z-index 属性定义
fixed :未支持。对象定位遵从绝对(absolute)方式。但是要遵守一些规范
relative :对象不可层叠，但将依据 left ， right ， top ， bottom 等属性在正常文档流中偏移位置
     

对于文档中所说的几个属性，除了relative，其它的一试，就效果出来了，对于个relative，真是难理解。
     通过资料加上网上一些大神的理解，大致上有了一下总结，也算是理解了吧！
     position的默认值是static，（也就是说对于任意一个元素，如果没有定义它的position属性，那么它的position:static） 
     如果你想让DIV #demo里的一个div#sub相对于#demo定位在右上角的某个地方，应该给#demo相对定位，#sub绝对定位。 
     absolute是相对于自己最近的父元素来定位的，如果你不给#demo相对定位，那么#sub的绝对定位就是相对于body来定位的。 
     relative是相对于自己来定位的，例如：#demo{position:relative;top:-50px;},这时#demo会在相对于它原来的位置上移50px。 
       另：relative 不脱离文档流，absolute 脱离文档流。也就是说：relative 的元素尽管表面上看到它偏离了原来的位置，但它实际上在文档流中还是没变。absolute的元素不仅位置改变了，同时也脱离了文档流。 
*/
</script>
<style lang="less">
#position {
  .out {
    width: 1000px;
    height: 200px;
    background-color: blue;
  }
  .in {
    width: 500px;
    height: 100px;
    background-color: red;
  }
}
</style>