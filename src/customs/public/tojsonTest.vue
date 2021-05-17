<template>
  <div class="tojsonTest">
    <to-json :types="types" :selected="selected"></to-json>
  </div>

</template>

<script>
/* 
  copy scope 里面对为空不替换需要支持。
  考虑设置一个优化版本
*/
import $ from 'jquery'
import ToJson from "./tojson.vue";
export default {
  props: {},
  data() {
    return {
      selected: ["testlast"],
      types: [
        {
          value: "test",
          label: "test",
          template: "${0:nm} ",
          single: true,
          desc: " ",
          param: [],
          fix: {
            roles: [],
            fixRoles: []
          }
        },
        {
          value: "testlast",
          label: "testlast",
          template: "${0:nm} ${99} ${98} ${97} ",
          single: true,
          desc: " ",
          param: [
            {
              k: "98",
              v: [{ k: "existsReplace", v: { int: "int",nt: "int",Int: "int", string: "string" },or:["number"] }]
            },
            {
              k: "97",
              v: [{ k: "existsReplace", v: { int: "int",nt: "int",Int: "int", string: "string" },or:["number"]  }]
            }
          ],
          fix: {}
        },
        {
          value: "test",
          label: "test",
          template: "${0:nm} ",
          single: true,
          desc: " ",
          param: [],
          fix: {
            roles: [],
            fixRoles: [
              {
                k: "fun",
                v: function(str) {
                  let singleConnect = "";
                  $.each(str.split("\n"), function(i, v) {
                    if (i != 0 && i % 2 == 0) {
                      singleConnect = singleConnect + "\n" + v;
                    } else {
                      singleConnect = singleConnect + v;
                    }
                  });
                  return singleConnect;
                }
              }
            ]
          }
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {},
  watch: {},
  components: {
    ToJson
  }
};
</script>
<style lang="less" >
.tojsonTest {
}
</style>