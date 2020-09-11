<template>
  <div id="tojson" @keyup.f7="gotoProto" >
    <el-row>
      <el-col :span="7">
        <el-select @change="selectTp" class="selfw" v-model="selected" multiple filterable allow-create placeholder="请选择文章标签">
          <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-input class="selfw" type="textarea" :autosize="{ minRows: 2}" placeholder="fixparam" v-model="fixparam">
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-input class="selfw" @change="changeTemplate" type="textarea" :autosize="{ minRows: 2}" placeholder="template" v-model="template">
        </el-input>
      </el-col>

    </el-row>
    <el-row class="content">
      <el-col :span="4">
        <el-input class="selfw" v-focus-area type="textarea" :autosize="{ minRows: 10}" placeholder="原始" v-model="proto">
        </el-input>
      </el-col>
      <el-col :span="10" v-for="r in selectedDetail" :key="r.value">
        <el-input class="selfw" type="textarea" :autosize="{ minRows: 10}" :placeholder="r.label" v-model="r.templateOut">
        </el-input>
      </el-col>
    </el-row>

    <el-row style="margin-top:30px;">
      <el-col :span="7">
        <el-input class="selfw" type="textarea" :rows="2" placeholder="aparts" v-model="aparts">
        </el-input>
      </el-col>
      <el-col :span="17">
        <el-input class="selfw" type="textarea" :autosize="{ minRows: 2}" placeholder="template" v-model="selectTemplates">
        </el-input>
      </el-col>

    </el-row>

  </div>
</template>
<style lang="less">
#tojson {
  .selfw {
    width: 90%;
  }
  .content {
    margin-top: 120px;
    .selfw {
      width: 98%;
    }
  }
}
</style>
<script>
export default {
  props: ["types", "selected"],
  data() {
    return {
     
      template: "", //*** 行模板
      param: "", //*** 行模板
      aparts: " ,	", //*** 对行处理的分割符， 也就是说 获取 ${?}信息
      fixparam: "",
      proto: "", //*** 输入的所有原始数据
      protoParam:{ // 提供全局参数, 供后续调用
        "MDTitle":[], 
        "MDParam":[],   
        "MDParamO":{},
// ps         
// # link 
// #  base ?ColSpan? // 注释 
// 描述 desc String a ?3

      }, // 根据输入的proto 提取的参数，目前是挂在markdown 的 行上的  {"rowId":[0,1,2,3 ]}  PS: #  base // 注释
      lastSelect: "" //*** 暂时没用，记录最后一次选择的情况，可以考虑使用 lastSelect
      //up data
      //dowm for show
    };
  },
  methods: {
    gotoProto(){
      document.getElementsByClassName("content")[0].getElementsByTagName("textarea")[0].focus();
    },
    getTemp() {},
    disposeBefore(proto){
      let protoDisposeA=[];
      let self=this;
      self.protoParam["MDTitle"]=[]         
      self.protoParam["MDParam"]=[]         
 
      if(proto){
          var rowParam=[]
          proto.split("\n").forEach(function(x){
       // 将注释字符去掉 字符未 //
          var parsed =(x||"").split("//")[0];
          // 去除 markDown annotation //
          var matched=(parsed||"").match(/# (.*)/);
           
            if(matched){
              var re=/ (\S+)/g
              // 用空格区分的markdown 参数 
              rowParam=(matched[1].match(re)||[]).map(function(x) {return x.replace(/^ /,"")})
              if(rowParam&&rowParam.length>0){
                  let lastRowParam=rowParam.slice(-1)[0];
                  if(lastRowParam.match(/\?(.*)/)){
                      let mdParam=lastRowParam.match(/\?(.*)/)[1].split("?").filter(function (v){return v })
                      if(mdParam.length>0){
                          self.protoParam["MDParam"]=mdParam;
                      }
                  }
                  

              }
            }

              parsed=(parsed||"").replace(/#{1,} .*/,"")
          //  去除空白的行
              if(parsed){
                protoDisposeA.push(parsed);
                self.protoParam.MDTitle.push(rowParam)
              }
       
         
        })
      
        
      }

      
      return protoDisposeA.join("\n")

    },
    changeTemplate() {
      var self = this;
      if (self.selected.length > 0) {
        $.each(self.types, function(i, v) {
          if (v.value == self.selected[0]) {
            v["template"] = self.template;
          }
        });
      }
    },
    // 选择模板时触发
    selectTp(values) {
      if (!values[0]) {
        return;
      }

      var self = this;
      var o = {};
      $.each(self.types, function(index, v) {
        o[v.value] = v;
      });
      self.template = o[values[0]].template;
      self.param = JSON.stringify(o[values[0]].param);
    },

    /* ↓↓↓↓↓↓↓↓↓↓↓↓以下为转换的规则 */
    // 只有包含的字符才替换 ,按顺序单个替换
    // retStr 输入的值,  rule.v 配置的规则 ,time 匹配几次, same 是否完全匹配
    //
    /* 
    输入按字符替换
    default: same=true
             time 无限制

    */
    paramItemContainsReplace: function({ retStr, rule, aRow, strLikeObject }) {
      // s 是最后的返回值
      let s = "";

      let config = rule.v;
      let same = rule.same || true;
      let time = rule.time || 0;
      let configO = {};
      $.each(config, function(configk, configv) {
        configO[configk] = 1;
      });

      $.each(retStr.split(""), function(stri, strv) {
        // 如果不在替换范围内则不需要替换 ，或者转换次数大于
        if (same && (configO[strv] == undefined || (configO[strv] > time && time != 0))) {
          s = "";
          return false;
        }

        if (config[strv] != undefined) {
          if (time == 0 || time >= configO[strv]) {
            if (config[strv].k) {
              if (config[strv].k == "fun") {
                s += config[strv].v(aRow, strLikeObject);
              }
            } else {
              s += config[strv];
            }

            configO[strv] += 1;
          }
        }
        // 字母不完全在config中，或者次数超过规定
      });

      return s;
    },
    // 首字母大写
    capitalize({ str }) {
      // 正则法
      str = str.toLowerCase();
      var reg = /\b(\w)|\s(\w)/g; //  \b判断边界\s判断空格
      return str.replace(reg, function(m) {
        return m.toUpperCase();
      });
    },
    // 含_-驼峰命名法
    snake: function({ str }) {
      let self = this;
      let s = [];
      $.each(str.split(/[\_-]/), function(k, v) {
        s.push(self.capitalize({ str: v }));
      });
      return s.join("");
    },
    /* ↑↑↑↑↑↑↑↑↑↑↑↑以上为转换的规则 */
    /* ↓↓↓↓↓↓↓↓↓↓↓↓ protoRow 处理 */
    protoRowTranslate: function({ aRow, type,iaRow }) {
      let self=this;
      var retRow=[]
      Object.assign(retRow,aRow);
      // unchecked  此处不应该 改变元素数据
      if (type.protoRowTranslate) {
        $.each(type.protoRowTranslate, function(vi, vv) {
          if (vv.k == "fun") {
            if (retRow) {
              retRow = vv.v(retRow,iaRow,self);
            }
          }
          if (vv.k == "reg") {
            // v 截取规则
            if (retRow) {
              retRow = self.toFilter(retRow, vv.v);
            }
          }
        });
      }
      return retRow;
    },
    
    // 一个规则
    toFilter: function(arr, regO) {
      // regO  /g /i    role:  replace  match
      // idx:    -- 暂时是数字类型

      let rArr = [];
      $.each(arr, function(arri, arrv) {
        let matched = [];
        if (regO.role == "match") {
          if (regO.g) {
            matched = arrv.match(new RegExp(regO.reg, "g"));
          } else {
            matched = arrv.match(new RegExp(regO.reg));
          }

          if (!matched) {
            rArr.push("");
          } else if (regO.idx != undefined) {
            rArr.push(matched[regO.idx] || "");
          } else {
            rArr.push("未定");
          }
        }
      });
      return rArr;
    },
    /* ↑↑↑↑↑↑↑↑↑↑↑↑ protoRow 处理 */
    /* 
   temp: 模板：就是配置详细
   irow: proto  的第几行
   row:proto 根据分割符分割后的数组[1,2,3,4]
   len:proto 的总行数
   o:暂时没有用到
   */
    rowTransfer: function({ type, iaRow, aRow, len, o }) {
      let self = this;
      // 是对输入的字段按分隔符进行处理
      if (type.protoRowTranslate) {
        // 处理分两类: 参数处理，模板处理，此部分是在 转换前
        aRow=self.protoRowTranslate({ type, aRow,iaRow });
      }
      // 找出可替换变量
      var reg = /\$\{{1}[0-9a-zA-Z\_\/:]+\}{1}/g;
      // 对每个变量进行处理 k 必须是数字
      var re = /\$\{{1}([0-9]+):?([0-9a-zA-Z\_]*)(\/{1}[0-9a-zA-Z\_\/]*||'')\}{1}/;
      // 单个参数处理正则
      // "${1:nm/String/g}" 第一部分0 匹配值，第二部分1 key ,第三部分2  默认值,  第四部分3正则 , 第五部分是输入字符串
      // ["${1:nm/String/g}", "1", "nm", "/String/g", index: 0, input: "${1:nm/String/g}"]

      let oneRow = "";
      // 没有模板的时候，直接返回数据
      if (type.template) {
        oneRow = type.template.replace(reg, function(str) {
          /*str ： ${0:1} 类似次结构
        str.match(re)： 得到需要替换的属性，把这个对象存成一个对象(strLikeObject)，后续可使用 
     */
          let retStr = "";

          if (str.match(re)) {
            /* 
           var re = /\$\{{1}([0-9]+):?([0-9a-zA-Z\_]*)(\/{1}[0-9a-zA-Z\_\/]*||'')\}{1}/;
          第一部分0 匹配值 就是 str  ，
          第二部分1 key ,
          第三部分2  默认值,  
          第四部分3 正则 , 第五部分4输入字符串
           */
            let strLikeObject = {};
            strLikeObject["str"] = str.match(re)[0];
            strLikeObject["key"] = str.match(re)[1];
            strLikeObject["default"] = str.match(re)[2];

            // ↓↓↓↓↓↓↓↓↓↓↓↓  将 aRow 数据 与 模板数据 进行 合并，形成 输出
            //  大于 90 的 配置 是 从末尾开始取 ，配置 99 就是 最后一个 98 倒数第二个
            if (strLikeObject.key >= 90) {
              if (aRow.length > 99 - strLikeObject.key) {
                retStr = aRow[aRow.length - (99 - strLikeObject.key) - 1];
              } else {
                retStr = strLikeObject["default"];
              }
            } else if (aRow[strLikeObject["key"]] != undefined && aRow[strLikeObject["key"]] != "") {
              retStr = aRow[strLikeObject["key"]];
            } else {
              retStr = strLikeObject["default"];
            }

            // ↑↑↑↑↑↑↑↑↑↑↑↑  将 aRow 数据 与 模板数据 进行 合并，形成 输出

            //  ↓↓↓↓↓↓↓↓↓↓↓↓  对于结合就的返回值进行二次处理
            if (type.param) {
              $.each(type.param, function(oneParamI, oneParamV) {
                // 同一序号处理完成后再处理其他序号
                if (strLikeObject["key"] == oneParamV.k) {
                  //  vv 就是配置项

                  $.each(oneParamV.v, function(vi, rule) {
                    let methodParam = {}; // 为了解构新加 ,函数调用function
                    methodParam["strLikeObject"] = strLikeObject;
                    methodParam["retStr"] = retStr;
                    methodParam["aRow"] = aRow;
                    methodParam["rule"] = rule;

                    if (rule.k == "replace") {
                      retStr = self.paramItemReplace(methodParam);
                    }

                    if (rule.k == "copy") {
                      // (不为空的时候才复制,目前复制的是输入，而不是转换后的值 , scope 是在范围内的才复制 )
                      retStr = self.paramItemCopy(methodParam);
                    }

                    if (rule.k == "existsReplace" && rule.v) {
                      retStr = self.paramItemExistsReplace(methodParam);
                    }

                    //  对数据 进行筛选
                    if (rule.k == "filterStr" && rule.v) {
                      retStr = self.paramItemfilterStr(methodParam);
                    }

                    if (rule.k == "containsReplace" && rule.v) {
                      // s 输入的值，  rule.v 配置的规则 ，rule.time 匹配几次, rule.same 是否完全匹配
                      //time=0,same=true
                      retStr = self.paramItemContainsReplace(methodParam);
                    }
                    // 转换
                    if (rule.k == "transfer") {
                      $.each(rule.v, function(ruleVk, ruleVv) {
                        if (ruleVk == "capitalize" && ruleVv) {
                          retStr = self.capitalize({ str: retStr });
                        }
                        if (ruleVk == "snake" && ruleVv) {
                          retStr = self.snake({ str: retStr });
                        }
                      });
                    }
                    //  添加
                    if (rule.k == "append") {
                      $.each(rule.v, function(ruleVk, ruleVv) {
                        if (retStr == ruleVk) {
                          retStr += ruleVv;
                        }
                      });
                    }
                  });
                }
              });
            }
          }
          return retStr;
        });
      } else {
        // 没有模板的时候，直接返回数据
        // 此处的join 有问题，或者 iaRow =0
        oneRow = aRow.join("\n");
      }

    //  2019-11-02 为了解决 markDown title ?param:default? 问题 ,将字段 对象化
// 2019-12-06 解读： 对于 空格模式处理好后 ，处理包含参数的情况， 

      if(oneRow && self.protoParam.MDParam.length>0){
// iaRow

        let mdParam=self.protoParam.MDParamO

          $.each(self.protoParam.MDParam,function(paramI,paramV){
              // replaceAll 
              let toV=""  
              var re_str="/\\$\\?"+paramV+"(:[0-9a-zA-Z_/]+)*\\?/";
              var re=eval( re_str);
              var  matched_param=oneRow.match(re)
              if(matched_param){
                toV= matched_param[1].substring(1)  
                if (mdParam && mdParam[iaRow] && mdParam[iaRow][paramV]){
                    toV=mdParam[iaRow][paramV]
                }
                // 配置项正则;
                // re=/\$\?[:0-9a-zA-Z\_\/]+\?/g 
                oneRow=oneRow.replace(re,toV);
              }
   

           
// 找到定义的参数
// re=/\$\?[0-9a-zA-Z\_\/:]+\?/g


          })
                 // 如果没有设置的话 显示默认值
          // 将MD 参数设置成默认值
           oneRow=oneRow.replace(/\$\?[0-9a-zA-Z_/]+:([0-9a-zA-Z_/]*)\?/,'$1')
           oneRow=oneRow.replace(/\$\?[0-9a-zA-Z_/]+\?/,"");



      }



      // 对格式化后的行数据进行二次格式化
      if (type.fix) {
        $.each(type.fix.roles, function(oi, ov) {
          let methodFix = {};
          methodFix["role"] = Object.assign({}, ov);
          methodFix["oneRow"] = oneRow;
          methodFix["iaRow"] = iaRow;

          if (ov.k == "mod") {
            oneRow = self.fixRoleMode(methodFix);
            //  此处的判断是针对 iaRow 行的索引 类型，而不是自然的行数
          } else if (
            ov.k == "single" ||
            ov.k == "double" ||
            ov.k == "both" ||
            (ov.k == "first" && iaRow == 0) ||
            (ov.k == "end" && iaRow == len - 1)
          ) {
            
            methodFix["role"]["k"] = "mod";
            methodFix["role"]["condition"] = { k: 1, v: 0 };

            if (ov.k == "single") {
              methodFix["role"]["condition"] = { k: 2, v: 1 };
            }
            if (ov.k == "double") {
              methodFix["role"]["condition"] = { k: 2, v: 0 };
            }
            oneRow = self.fixRoleMode(methodFix);
          }
          if (ov.k == "fun") {
            oneRow = ov.v(oneRow);
          }
        });
      }

      return oneRow;
    },

    ///////////  2018 -07-08 整理
    /* 
    selectedDetail need
    in:
      aparts: 
      1 按行分隔
      2 根据 aparts 将行 转换成数组
    out:
      aRet=[[]]
     
    */

    protoToArray: function() {
      let self = this;
      let aRet = [];
      let protoDispose="";
      self.protoParam.MDParamO={};
      if (self.proto) {
        // 将数据的 MD 参数提取出来
        protoDispose=self.disposeBefore(self.proto);
        $.each(protoDispose.split("\n"), function(i, v) {




              if(self.protoParam.MDParam&&self.protoParam.MDParam.length>0){
                var MDParamArray=[];
                if(v.split("?").length>1){
                  MDParamArray=v.split("?").slice(1);
                   v=v.split("?")[0] // 删除MD 参数
                
                  let oneParamO={}
                  MDParamArray.forEach(function(vJ,j){
                      if(self.protoParam.MDParam[j]){
                          oneParamO[self.protoParam.MDParam[j]]=vJ
                      }
                  })
                  // 按行解析的参数 
                  self.protoParam.MDParamO[i]=oneParamO
                }

              

              }



              let oneRowArray=v.split(eval("/[" + self.aparts + "]/ ")).filter(function(x) {
                  if (x) return true;
                })



            
          
       
            aRet.push(
              oneRowArray
            );

        });
      }


    

      return aRet;
    },
    dealProtoLikeArrayBefore:function(protoLikeArray,tmpO){
      // TODO:
      

      // 从模板中解析 MD 参数,设置默认值
      let self=this;
      if(tmpO){
  let tempStr=tmpO.template;
      let re=/\$\?([0-9a-zA-Z_/]+)+(:[0-9a-zA-Z_/]+)*\\?/g;  // 获取所有的MD 参数参数
      if(tempStr.match(re)){
          tempStr.match(re).forEach(function(suit){
            let suitField=suit.split(":")[0].replace("$?","");

            if(suitField&& !self.protoParam.MDParam.includes(suitField)){
                self.protoParam.MDParam.push(suitField);
            }
          })
      }

      }
    

      return protoLikeArray;
    },
    /* 
    rowTransfer need 
    
    replace 的配置规则 是 {k:replace,v:{str:string,
                                    fun:{}}}
    in:
     
    out:
      
     
    */
    paramItemReplace: function({ retStr, rule, strLikeObject, aRow }) {
      let config = rule.v;

      $.each(config, function(configK, configV) {
        // 输入的值 是需要替换的，那么替换成配置的值
        if (retStr == configK) {
          // 如果需要替换的值是一个对象，那么按对象类型（目前只有一个fun）进行控制
          if (configV.k) {
            if (configV.k == "fun") {
              retStr = configV.v(aRow, strLikeObject);
            }
          } else {
            retStr = configV;
          }
        }
      });
      return retStr;
    },
    //  scope 是在范围内的才复制
    // { k: "copy", v: { "2": true }, scope: ["d", "c"] }
    paramItemCopy: function({ retStr, rule, strLikeObject, aRow }) {
      let config = rule.v;
      let scope = rule.scope;
      $.each(config, function(configK, configV) {
        //---

        if (configK && aRow[configK] != undefined) {
          if (scope && $.inArray(aRow[configK], scope) < 0) {
          } else {
            retStr = aRow[configK];
          }
        }
      });
      return retStr;
    },

    // retStr 就是 调用前的输出
    //  该对象配置项config  就是 配置的 param 里面的 [{key, v:[ {配置项}]}]
    //  如果存在 替换，
    // 不存在 ，输出空
    paramItemExistsReplace: function({ retStr, rule }) {
      let retS = "";
      // 将数组配置成 对象
      let config = rule.v;
      let configO = {};

      $.each(config, function(configK, configV) {
        configO[configK] = configV;
      });
      if (retStr in configO) {
        retS = configO[retStr];
      }
      if (rule.or && rule.or.length > 0) {
        rule.or.forEach(function(v, i) {
          if (v == "number") {
            var regIsNumber = /^[0-9]+$/g;
            if (regIsNumber.exec(retStr) != null) {
              retS = retStr;
            }
          }
        });
      }
      return retS;
    },
    /* 
    
    */
    paramItemfilterStr: function({ retStr, rule, strLikeObject }) {
      let config = rule.v;
      config.forEach(function(oConfigV, i) {
        if (oConfigV.k == "notNumber") {
          if (/^[0-9]+$/g.exec(retStr) != null) {
            if (strLikeObject && strLikeObject.default) {
              retStr = strLikeObject.default;
            } else {
              retStr = "";
            }
          }
        }
      });
      return retStr;
    },
    //  { k: "mod", condition: { k: 3, value: 0 }, v: [{ k: "replace", v: [{ "/^{/": "[{" }] }] },

    fixRoleMode: function({ oneRow, role, iaRow }) {
      let config = role.v;
      if (role.k == "mod" && role.condition && iaRow % role.condition.k == role.condition.v) {
        // 单双行处理
        $.each(config, function(configI, configV) {
          if (configV.k == "replace") {
            $.each(configV.v, function(configVVk, configVVv) {
              $.each(configVVv, function(k2, v2) {
                oneRow = oneRow.replace(eval(k2), v2);
              });
            });
          }
        });
      }
      return oneRow;
    }
  },
  computed: {
    selectTemplates: function() {
      var self = this;
      var o = {};
      $.each(self.types, function(index, v) {
        o[v.value] = v;
      });
      var a = [];
      $.each(self.selected, function(i, v) {
        // 循环选中模板
        a.push(o[v].template + (o[v].desc ? "------//" + o[v].desc : ""));
      });

      return a.join("\n");
    },
    // ******** 转换的入口
    // 转换的入口函数
    selectedDetail: function() {
      //  计算属性 ，返回的是转换后的数组对象 :aRet
      //  显示的是 aRet.templateOut;
      var self = this;

      var typesObj = {};
      var protoLikeArray = []; // 二维数组    [  行[需要替换对象]] 从输入的原始数据（proto） 中依据分割符号，提取成二维数组的数据
      var aRet = [];

      //↓↓↓↓↓↓↓↓↓↓↓ 因为 types 是数组 将 数组转成对象 (typesObj)方便获取 模板信息，

      $.each(self.types, function(index, v) {
        typesObj[v.value] = v;
      });
      //↑↑↑↑↑↑↑***************  处理完成

      //↓↓↓↓↓↓↓↓↓↓↓ 将 proto 转换成 二维数组信息
      if (self.proto) { 
        protoLikeArray = self.protoToArray();
      }
      //↑↑↑↑↑↑↑*************** 从输入的原始数据（proto） 中依据分割符号，提取成二维数组的数据
   


      $.each(self.selected, function(i, v) {

// 2020-09-11 如果有markDown 的 配置那么 把默认配置 带到 原型里 begin
    if(!self.proto){
      if(typesObj[v].desc&&typesObj[v].desc.match(/^#(.*)\?.*/)){
        self.proto=typesObj[v].desc+"\n"
      }
    }
// end 

        // 处理模板中的MDParam 
        protoLikeArray=self.dealProtoLikeArrayBefore(protoLikeArray,typesObj[v]);

        // 循环选中模板
         if(typesObj[v].dealProtoLikeArray){
           protoLikeArray=typesObj[v].dealProtoLikeArray(protoLikeArray,self)
         }

        typesObj[v]["templateOut"] = ""; // 更改值,既每个模板的返回值



        //↓↓↓↓↓↓↓*************** 行数据需要转换的模板开始处理———————————————————1———————

        if (typesObj[v].template) {
          typesObj[v]["templateOutArray"] = [];
          // 循环生成记录
          $.each(protoLikeArray, function(protoLikeArrayi, protoLikeArrayv) {
            // 模板  索引 替换值 将输入行（proto）通过分割符分割成数组 [1,2,3,4]
            let oneRow = self.rowTransfer({
              type: typesObj[v],
              iaRow: protoLikeArrayi,
              aRow: protoLikeArrayv,
              len: protoLikeArray.length
            });

            typesObj[v]["templateOutArray"].push(oneRow);
          });

          if (typesObj[v].deakTemplateLikeArray){
            typesObj[v]["templateOutArray"]=typesObj[v].deakTemplateLikeArray(typesObj[v]["templateOutArray"],self);
          }



          // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑     每行处理完的结果
          // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 行join :(\n) 行替换完后处理
          typesObj[v]["templateOut"] = typesObj[v]["templateOutArray"].join("\n");
        } else {
          // 没有模板的话说明 参数就是输出， 只是做必要转换，那时候就得配置fix  了 （对每行进行处理）
          // 处理逻辑跟 fixparam 一致，只不过挪用param 的位置
        }

        //↑↑↑↑↑↑↑*************** 行数据需要转换的模板处理完成————————————————————1——————

        //↓↓↓↓↓↓↓*************** 对处理完的数据再次处理，那时候应用的是 fix 对象————————————————————2——————
        if (typesObj[v].fix && (typesObj[v].fix.param || typesObj[v].fix.fixRoles || typesObj[v].fix.protoRowTranslate)) {
          let oAfter = { template: typesObj[v]["templateOut"] };
          if (typesObj[v].fix.fixRoles) {
            oAfter.fix = { roles: typesObj[v].fix.fixRoles };
          }
          if (typesObj[v].fix.param) {
            oAfter.param = typesObj[v].fix.param;
          }
          if (typesObj[v].fix.protoRowTranslate) {
            oAfter.protoRowTranslate = typesObj[v].fix.protoRowTranslate;
          }
          // 整个模板当一行处理
          //fixparam 界面输入的参数

          let protoLikeArrayv = [];
          //single 参数目前只用于一行（template） is null 情况
          if (typesObj[v].single) {
            protoLikeArrayv = [self.proto];
          } else if (!typesObj[v].template) {
            protoLikeArrayv = self.proto.split(/[\n ]/).filter(function(x) {
              if (x) return true;
            });
          } else {
            protoLikeArrayv = self.fixparam.split(/[\n ]/).filter(function(x) {
              if (x) return true;
            });
          }

          typesObj[v]["templateOut"] = self.rowTransfer({ type: oAfter, iaRow: 0, aRow: protoLikeArrayv, len: 1 });
        }
        //↑↑↑↑↑↑↑*************** 对处理完的数据再次处理，那时候应用的是 fix 对象————————————————————2——————

        aRet.push(typesObj[v]);
      });
      // aRet 默认模板规则

      return aRet;
    }
  },
  watch: {},
  mounted() {
    $("#tojson").height($(window).height());
  }
};
</script>