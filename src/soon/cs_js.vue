
<template>
  <div id="cs2">
    <el-row>
      <el-col :span="8">
        <el-select @change="selectTp" class="selfw" v-model="selected" clearable=true filterable allow-create placeholder="请选择文章标签">
          <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>

    </el-row>
    <el-row>
      <el-col :span="8">
        <span> 允许输入一个参数</span>
        <el-input type="textarea" v-model="forParam" :autosize="{ minRows: 18}"></el-input>
      </el-col>

      <el-col :span="8">
        <span> 计划输入方法体，返回打印控制台</span>
        <el-input type="textarea" v-model="forInput" :autosize="{ minRows: 18}"></el-input>
      </el-col>
      <el-col :span="8">
        <span> 为了打印控制台</span>
        <el-input type="textarea" v-model="forCon" :autosize="{ minRows: 18}"></el-input>
      </el-col>
    </el-row>

  </div>

</template>
    <script>
export default {
  data() {
    return {
      selected: "",
      types: [
        {
          label: "鄞州txt倒叙",
          value: 1,
          input: `var c=\`param1\`;
var d=c.split("\\n").reverse();
p(d.join("\\n"))
              `
        }
      ],
      print: [],
      forParam: "",
      forInput: "",
      forCon: "控制台显示",
      lvl: 1
    };
  },
  methods: {
    selectTp: function() {
      let self = this;

      if (self.selected) {
        self.forInput = self.types.find(function(v) {
          return v.value == self.selected;
        }).input;
      } else {
        self.forInput = "";
      }
    },
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
        // ` log.push("p -value-");
        //  ` +
        self.forInput +
        // `  ;log.push("end;")}
        `  ;}
         `;

      if (self.forParam && strFunciton.includes("param1")) {
        strFunciton = strFunciton.replace("param1", self.forParam);
      }

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
    },
    forParam: function(val, oldVal) {
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
  .selfw {
    width: 98%;
  }
}
</style>