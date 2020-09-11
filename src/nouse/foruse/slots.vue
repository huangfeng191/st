<template>
	<div id="cs2">
	
        <child :level="lvl">

            <div slot="header">header2</div>
            <div>body0</div>
            <div>body1</div>
            <div>body2</div>
            <div>body3</div>
            <div slot="footer">footer</div></child>
	</div>

</template>
<script>

export default {
  data() {
    return {
      message: "Hello 11Vue!",
      lvl:1
    };
  },
  methods: {},
  watch: {},
  mounted() {},
  components: {
    child: {
        data(){
            return {
                a:2
            }
        },
        props:[
            "level"
        ],
        render: function (createElement) {
            
            //this.$slots 获取slots  
        //    用来访问被插槽分发的内容。每个具名插槽 有其相应的属性 
        //    (例如：slot="foo" 中的内容将会在 vm.$slots.foo 中被找到)。
        //    default 属性包括了所有没有被包含在具名插槽中的节点。
            var header = this.$slots.header
            var body   = this.$slots.default
            var footer = this.$slots.footer
            return createElement('div', [
           
            createElement('main', body),
            createElement('header', header),
            createElement('header', header),
            createElement('footer', footer)
            ])
        },
      template: `
           <blog-post>
            <h1 slot="header">
                About Me 
            </h1>

            <p>Here's some page content, which will be included in vm.$slots.default, because it's not inside a named slot.</p>

            <p slot="footer">
                Copyright 2016 Evan You
            </p>

            <p>If I have some content down here, it will also be included in vm.$slots.default.</p>.
            </blog-post>
        `
    }
  }
};
</script>
<style lang="less">
#cs2 {
}
</style>