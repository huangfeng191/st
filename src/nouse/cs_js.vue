
<template>
        <div id="cs2">
        <el-row>
            <el-col :span="12">
                <span> 计划输入方法体，返回打印控制台</span>
                <el-input   type="textarea" v-model="forInput" :autosize="{ minRows: 18}" ></el-input>
            </el-col>
            <el-col :span="12">
                <span> 为了打印控制台</span>
                <el-input   type="textarea" v-model="forCon" :autosize="{ minRows: 18}"></el-input>
            </el-col>
        </el-row>
        
        </div>
    
    </template>
    <script>
    export default {
      data() {
        return {
          print: [],
          forInput: "",
          forCon: "控制台显示",
          lvl: 1
        };
      },
      methods: {
        // 可以考虑添加 try catch
        showDetail: function(a) {
          let self = this;
          self.print = [];
          function p(a) {
            self.print.push(a);
          }
          var strFunciton =
            `
            function play(log){` +
            ` log.push("p -value-");
         ` +
            self.forInput +
          `  ;log.push("end;")}
         `;
          
          //  var ss = bb;
          var o = { getplay: eval("(" + strFunciton + ")") };
          o.getplay(self.print);
    
          return a;
        }
      },
      watch: {
        forInput: function(val, oldVal) {
          let self = this;
          self.showDetail(self.print);
          self.forCon = self.print.join("\n");
        }
      },
      mounted() {},
      components: {}
    };
    </script>
    <style lang="less">
    #cs2 {
    }
    </style>