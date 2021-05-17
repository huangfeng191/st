<template>
  <div class="usejson">
    <to-json
      :types="types"
      :selected="selected"
    ></to-json>
  </div>

</template>

<script>
import $ from 'jquery'
import ToJson from "./tojson.vue";
export default {
  props: {},
  data() {
    return {
      // selected: ["ssForm"],
      // selected: ["tobind","tobindIdx","fieldCopyInput","fieldCopySelect"],
      selected: ["fieldCopyInput"],
      // selected: ["ssCheckField"],
      // selected: ["newMenu", "newMenu_element"],
      // selected: ["ssButtonRecord"],
      // selected: ["ssOldForm"],

      // selected: ["scada6crudinputThree", "toRowSingle", "ssForm", "scada6Important"],
      // selected: ["scada6crudinputThree", "toRowSingle", "CueColumns", "CueCrudInputThree"],
      // selected: ["toRowSingle", "switch2and1", "CueColumns", "CueCrudInputThree", "interfaceUp", "mongoField"],
      // selected: ["tableRow","ssForm", "ssButton", "ssBinding", "ssTable"],
      // selected: ["CommandForm","ssBindingSame","CommandFormExtend"],
      // selected: ["CommandForm", "CommandFormExtend"],
      // selected: ["CommandFormExtend"],
      types: [
         {
          value: "CheckLengthInput",
          label: "CheckLengthInput",
          desc: "",
          // 告警备注 remark 100 extension
          template:
            'checkInputLegal("${1}",${2},"${0}",false,{"special":"${3:default}"} )',
          fix: {
            roles: [],
            param: []
          }
        },
         {
          value: "tobind",
          label: "tobind",
          desc: "",
          // 告警备注 remark 100 extension
          template:
            '<option ng-selected="deviceContent.${0} == ${2}" value="${2}">${1}</option>',
          fix: {
            roles: [],
            param: []
          }
        },
              {
          value: "tobindIdx",
          label: "tobindIdx",
          desc: "",
          // 告警备注 remark 100 extension
          template:
            '{ "node": "${0}", "index": index, "num": "" },',
          fix: {
            roles: [],
            param: []
          }
        },
            {
          value: "fieldCopyInput",
          label: "fieldCopyInput",
          desc: "#  cell  ?name?field? ",
          // 告警备注 remark 100 extension
          template:
            `
            <div class="form-group">
            <label for="inputEmail3" 
              class="excel_key col-xs-5 col-sm-5 col-lg-5 col-md-5 col-lg-offset-1 col-xs-offset-1 col-sm-offset-1 col-md-offset-1 control-label">$?name:AAA?</label>
            <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6 ">
              <input type="text"  class="excel_value form-control" ng-model="deviceContent.$?field:BBB?"></div>
            </div>
            `,
          fix: {
            roles: [],
            param: []
          }
        },
              {
          value: "fieldCopySelect",
          label: "fieldCopySelect",
          desc: "",
          // 告警备注 remark 100 extension
          template:
            `
       <div class="form-group">
        <label for="inputEmail3"  class="excel_key col-xs-5 col-sm-5 col-lg-5 col-md-5 col-lg-offset-1 col-xs-offset-1 col-sm-offset-1 col-md-offset-1 control-label">
        $?name:AAA?
        </label>
        <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6 ">
          <select ng-model="deviceContent.$?name:BBB?" class="excel_value form-control input-sm">
            <option translate="PLEASE_SELECT" value="">请选择</option>

          </select>
        </div>
      </div>

            `,
          fix: {
            roles: [],
            param: []
          }
        },
        
        {
          value: "newMenu",
          label: "newMenu",
          template: '{"name":"${0}","id":"${1}","parentId": "${2}",},',
          param: [],
          protoRowTranslate: [
            {
              k: "fun",
              v: function(arr, index, self) {
                let MDParam = self.protoParam.MDTitle;
                let rowParam = self.protoParam.MDParamO;
                if (MDParam.length > 0) {
                  if (MDParam[index] && MDParam[index][1]) {
                    if (MDParam[index][1] != arr[1]) {
                      if (arr[1].split("-").length == 2) {
                        arr[2] = MDParam[index][1] + "-" + arr[1].split("-")[0];
                      } else {
                        arr[2] = MDParam[index][1];
                      }
                      arr[1] = MDParam[index][1] + "-" + (arr[1] || "");
                      if (rowParam[index] && rowParam[index]["button"]) {
                        arr[2] = arr[1];
                        arr[1] =
                          arr[1] + "_" + rowParam[index]["button"].trim();
                      }
                    }
                  }
                }

                return arr;
              }
            }
          ],
          fix: {
            roles: [],
            fixRoles: [{}],
            param: []
          }
        },
        {
          value: "newMenu_element",
          label: "newMenu_element",
          template: 'level2="${1}"',
          param: [],
          protoRowTranslate: [
            {
              k: "fun",
              v: function(arr, index, self) {
                let MDParam = self.protoParam.MDTitle;
                let rowParam = self.protoParam.MDParamO;
                if (MDParam.length > 0) {
                  if (MDParam[index] && MDParam[index][1]) {
                    if (MDParam[index][1] != arr[1]) {
                      if (arr[1].split("-").length == 2) {
                        arr[2] = MDParam[index][1] + "-" + arr[1].split("-")[0];
                      } else {
                        arr[2] = MDParam[index][1];
                      }
                      arr[1] = MDParam[index][1] + "-" + (arr[1] || "");
                      if (rowParam[index] && rowParam[index]["button"]) {
                        arr[2] = arr[1];
                        arr[1] =
                          arr[1] + "_" + rowParam[index]["button"].trim();
                      }
                    }
                  }
                }
                return arr;
              }
            }
          ],
          deakTemplateLikeArray: function(a, self) {
            // 对生成后的行数据数组,再次处理
            // debugger
            a = a.filter(function(v) {
              if (v && v.indexOf("_") >= 0) {
                return false;
              } else {
                return true;
              }
            });

            return a;
          },
          fix: {
            roles: [],
            fixRoles: [{}],
            param: []
          }
        },
        {
          value: "ssButtonRecord",
          label: "ssButtonRecord",
          template:
            '{"name":"${0}","id":"${1}","operate":"${2:view}",options: null,},',
          param: [],
          protoRowTranslate: [
            {
              k: "fun",
              v: function(arr, index, self) {
                let MDParam = self.protoParam.MDTitle;
                let rowParam = self.protoParam.MDParamO;
                if (MDParam.length > 0) {
                  if (MDParam[index] && MDParam[index][1]) {
                    if (MDParam[index][1] != arr[1]) {
                      arr[1] = MDParam[index][1] + "-" + (arr[1] || "");
                    }
                    arr[2] = arr[2] || "view";
                  }
                }

                return arr;
              }
            }
          ],
          deakTemplateLikeArray: function(a, self) {
            // 对生成后的行数据数组,再次处理

            let o = self.protoParam.MDParamO;

            (a || []).forEach(function(v, i) {
              let options = [];
              if (o[i]) {
                if (o[i].Options) {
                 
                  o[i].Options.split(",").forEach(function(v) {
                    let [title, field] = v.split(":");
                    if (field) {
                      options.push({
                        title: title.trim(),
                        field: field.trim()
                      });
                    }
                  });
                  if (options.length > 0) {
                    a[i] = v.replace("null", JSON.stringify(options));
                  }
                }
              }
            });

            return a;
          },
          fix: {
            roles: [],
            fixRoles: [{}],
            param: []
          }
        },
        {
          value: "ssForm",
          label: "ssForm",
          template:
            ' [{ "title": "${0:nm}","field": "${1:sn}",  "showType": "${2:text}", ${21} }],',
          param: [
            { k: "2", v: [{ k: "replace", v: { c: "select" } }] },

            {
              k: "21",
              v: [
                { k: "copy", v: { "2": true }, scope: ["c"] },
                {
                  k: "containsReplace",
                  v: {
                    c: {
                      k: "fun",
                      v: function(row, tempConfigO) {
                        if (row[3]) {
                          return 'binding:"' + row[3] + '"';
                        } else {
                          return 'binding:"XXX"';
                        }
                      }
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          value: "CommandForm",
          label: "CommandForm",
          template:
            ' [{ "title": "${0:nm}","field": "${1:sn}","command": "${2}","key": "${3}","showType": "${4:text}", ${41} }],',
          param: [
            { k: "4", v: [{ k: "replace", v: { c: "select" } }] },

            {
              k: "41",
              v: [
                { k: "copy", v: { "4": true }, scope: ["c"] },
                {
                  k: "containsReplace",
                  v: {
                    c: {
                      k: "fun",
                      v: function(row, tempConfigO) {
                        if (row[5]) {
                          return 'binding:"' + row[5] + '"';
                        } else {
                          return 'binding:"XXX"';
                        }
                      }
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          value: "CommandFormExtend",
          label: "CommandFormExtend",

          //  title	qCommand	qOthers	qKey	qGroup
          template:
            ',"qCommand": "${2}","qKey": "${1}","qOthers": ${3},"qGroup": "${4}"  ${98} ${99} ',
          param: [],
          protoRowTranslate: [
            {
              k: "fun",
              v: function(arr) {
                // 3 = 替换成词典  # 替换成 数组
                var isLast = "";

                if (arr.length > 0) {
                  if (arr[arr.length - 1].split("#").length > 1) {
                    isLast = arr[arr.length - 1].split("#");
                    arr.splice(-1, 1);
                  }
                }

                var isPenult = "";
                if (arr.length > 0) {
                  if (arr[arr.length - 1].split("?").length > 1) {
                    isPenul = arr[arr.length - 1].split("?");
                    arr.splice(-1, 1);
                  }
                }

                if (arr.length == 4) {
                  if (arr[3].split("=").length == 1) {
                    arr[4] = arr[3];
                    arr[3] = '""';
                  }
                }
                (arr || []).forEach(function(a, i) {
                  if (a.split("=").length > 1) {
                    var keyValue = a.split("=");
                    arr[i] = {};
                    arr[i][keyValue[0]] = keyValue[1];
                    arr[i] = JSON.stringify(arr[i]);
                  }
                });
                if (isLast) {
                  arr.push("");
                  arr.push("");
                  arr.push("");
                  arr[1] = isLast[1];
                  var qIndexLevel = "";
                  if (isLast.length > 2) {
                    qIndexLevel = isLast[2];
                  }
                  arr.push(
                    ',"qIndexKey":"' +
                      isLast[0] +
                      '" ,"qIndexLevel":"' +
                      qIndexLevel +
                      '"'
                  );
                } else {
                  arr.push("");
                  arr.push("");
                  arr.push("");
                }
                // 1 card 11 card businessId  2 port 21 port businessId
                // 1 card   11 板卡业务名  2 cardPort  21 端口业务名
                if (isPenult) {
                  // 查询时 aid 的规则
                  arr.splice(-2, 1, "qLevel:'" + isLast[1] + "'");
                }

                if (!arr[3]) {
                  arr[3] = '""';
                }

                return arr;
              }
            }
          ]
        },
        {
          value: "ssTable",
          label: "ssTable",
          // showType  : c select  v selectValue b:button
          template:
            ' { "title": "${0:nm}","field": "${1:sn}",  "showType": "${2:text}", ${21}  ${22} },',
          param: [
            {
              k: "2",
              v: [
                {
                  k: "replace",
                  v: {
                    b: "button",
                    c: "select",
                    v: "selectValue",
                    d: "dateTime"
                  }
                }
              ]
            },

            {
              k: "21",
              v: [
                { k: "copy", v: { "2": true }, scope: ["b", "d"] },
                {
                  k: "containsReplace",
                  v: {
                    b: {
                      k: "fun",
                      v: function(row, tempConfigO) {
                        if (row[3]) {
                          return 'format:"' + row[3] + '"';
                        } else {
                          return 'format:"XXX"';
                        }
                      }
                    },
                    d: {
                      k: "fun",
                      v: function(row, tempConfigO) {
                        if (row[3]) {
                          return 'format:"' + row[3] + '"';
                        } else {
                          return 'format:"yyyy-MM-dd"';
                        }
                      }
                    }
                  }
                }
              ]
            },
            {
              k: "22",
              v: [
                { k: "copy", v: { "2": true }, scope: ["c", "v"] },
                {
                  k: "containsReplace",
                  v: {
                    c: {
                      k: "fun",
                      v: function(row, tempConfigO) {
                        if (row[3]) {
                          return 'binding:"' + row[3] + '"';
                        } else {
                          return 'binding:"XXX"';
                        }
                      }
                    },
                    v: {
                      // 输入为v
                      k: "fun",
                      v: function(row, tempConfigO) {
                        if (row[3]) {
                          return 'binding:"' + row[3] + '"';
                        } else {
                          return 'binding:"XXX"';
                        }
                      }
                    }
                  }
                }
              ]
            }
          ],
          fix: {
            roles: [],
            fixRoles: [
              { k: "first", v: [{ k: "replace", v: [{ "/^/": "[" }] }] },
              { k: "end", v: [{ k: "replace", v: [{ "/$/": "]" }] }] }
            ]
          }
        },
        {
          value: "tableRow",
          label: "tableRow",
          // showType  : c select  v selectValue b:button
          template: ' { "title": "${0:nm}","field": "${1:sn}"${21}${22} },',
          MdTitle:'# 模块   ?select?tp', // TODO: 
          param: [
            //  f  format   d  dateformatter  c binding
            {
              k: "21",
              v: [
                { k: "copy", v: { "2": true }, scope: ["f", "d"] },
                {
                  k: "containsReplace",
                  v: {
                    f: {
                      k: "fun",
                      v: function(row, tempConfigO) {
                        if (row[3]) {
                          return ',format:"' + row[3] + '"';
                        } else {
                          return ',format:"XXX"';
                        }
                      }
                    },
                    d: {
                      k: "fun",
                      v: function(row, tempConfigO) {
                        if (row[3]) {
                          return ',format:"' + row[3] + '"';
                        } else {
                          return ',format:"TimeFormatter"';
                        }
                      }
                    }
                  }
                }
              ]
            },
            {
              k: "22",
              v: [
                { k: "copy", v: { "2": true }, scope: ["c"] },
                {
                  k: "containsReplace",
                  v: {
                    c: {
                      k: "fun",
                      v: function(row, tempConfigO) {
                        if (row[3]) {
                          return ',binding:"' + row[3] + '"';
                        } else {
                          return ',binding:"XXX"';
                        }
                      }
                    }
                  }
                }
              ]
            }
          ],
          fix: {
            roles: [],
            fixRoles: [
              { k: "first", v: [{ k: "replace", v: [{ "/^/": "[" }] }] },
              { k: "end", v: [{ k: "replace", v: [{ "/$/": "]" }] }] }
            ]
          }
        },
        {
          // 取第一个值 组成数组格式
          value: "ssButton",
          label: "ssButton",
          template:
            '{"Name": "${0:nm}", "Cmd": "${1:insert}",  "Class": "${2}" },',
          param: [],
          fix: {
            roles: [],
            fixRoles: []
          }
        },

        {
          // 取第一个值 组成数组格式
          value: "ssButton_log",
          label: "ssButton_log",
          template: 'data.push({"name":"${0}","value":${1}||""});',
          param: [],
          fix: {
            roles: [],
            fixRoles: []
          },

          dealProtoLikeArray: function(a,self ) {
        
       
            let MDParam = self.protoParam;
            if (MDParam.MDTitle.length > 0) {

              a.forEach(function(v,i){
                if(v[1].indexOf("val()")==-1){
                  if(MDParam.MDParamO[i]&&
                  (MDParam.MDParamO[i].tp||"").trim()=="q"){
                  v[1]=`$('[qfield=${v[1]}]').val()`;
                  }else{
                  v[1]=`$('#${v[1]}').val()`;
                  }
                }
                if(MDParam.MDParamO[i]&&MDParam.MDParamO[i].select.trim()=="s"){
                  v[1]=v[1].replace(
                ".val()",
                '.find("option:selected").text()'
              );
                }
              })
            }
      
            
            return a ;
          }
        },

        {
          // 取第一个值 组成数组格式
          value: "ssBinding",
          label: "ssBinding",
          template: '{"Name": "${0}", "Value":"${1}" },',
          param: [],
          fix: {
            roles: [
              // single double both ,end 修理行数据 在行的位置添加
              {
                k: "first",
                v: [
                  {
                    k: "replace",
                    v: [
                      {
                        "/^/": "${0:nm}:[//${1:nm}\n"
                      }
                    ]
                  }
                ]
              },
              {
                k: "end",
                v: [{ k: "replace", v: [{ "/$/": "\n]" }] }]
              }
            ],
            fixRoles: []
          }
        },
        {
          // 取第一个值 组成数组格式
          value: "ssBindingSame",
          label: "ssBindingSame",
          template: '{"Name": "${0}", "Value":"${0}" },',
          dealProtoLikeArray: function(a) {
            var ret = [];
            var b = a;
            if (!a) {
              b = [];
            }
            b.forEach(function(x) {
              $.each(x, function(xi, xv) {
                ret.push([xv]);
              });
            });
            return ret;
          },
          param: [],
          fix: {
            roles: [
              // single double both ,end 修理行数据 在行的位置添加
              {
                k: "first",
                v: [
                  {
                    k: "replace",
                    v: [
                      {
                        "/^/": "${0:nm}:[//${1:nm}\n"
                      }
                    ]
                  }
                ]
              },
              {
                k: "end",
                v: [{ k: "replace", v: [{ "/$/": "\n]" }] }]
              }
            ],
            fixRoles: []
          }
        },

        {
          // 取第一个值 组成数组格式
          value: "toRowSingle",
          label: "toRowSingle",
          template: '"${0:nm}" ',
          param: {},
          fix: {
            roles: [],
            fixRoles: [
              {
                k: "fun",
                v: function(str) {
                  return str
                    .split("\n")
                    .filter(function(v, i, self) {
                      return self.indexOf(v) === i;
                    })
                    .join(",");
                }
              }
              // { k: "first", v: [{ k: "replace", v: [{ "/^/": "[" }] }] },
              // { k: "end", v: [{ k: "replace", v: [{ "/$/": "]" }] }] }
            ]
          }
        },

        {
          // 取第一个值 组成数组格式
          value: "switch2and1",
          label: "switch2and1",
          template: '"${1:to2}" "${0:to1}"',
          param: {},
          fix: {
            roles: [],
            fixRoles: []
          }
        },

        {
          value: "scada6crudinputThree",
          label: "scada6crudinputThree",
          template:
            '{ "Field": "${1}", "Name": "${0}", ShowType: "${3:text}", Ext: "${31}",DataType: "${2:String}", "Required": false, RowSpan: 1, ColSpan: 1 },',
          param: [
            {
              k: "2",
              v: [
                {
                  k: "replace",
                  v: { string: "String", int: "Number", double: "Number" }
                }
              ]
            },
            {
              k: "3",
              v: [
                { k: "filterStr", v: [{ k: "notNumber", operate: "and" }] },
                {
                  k: "replace",
                  v: {
                    c: "combo",
                    d: "datetime",
                    a: "textarea",
                    u: "upload",
                    t: "text"
                  }
                }
              ]
            },
            {
              k: "31",
              v: [
                { k: "copy", v: { "3": true }, scope: ["c", "d"] },
                {
                  k: "containsReplace",
                  v: {
                    c: {
                      k: "fun",
                      v: function(row, strLikeObject) {
                        if (row[4]) {
                          return row[4];
                        } else {
                          return "USER";
                        }
                      }
                    },
                    d: {
                      k: "fun",
                      v: function(row, strLikeObject) {
                        if (row[4] && /^[0-9]+$/g.exec(row[4]) == null) {
                          return row[4];
                        } else {
                          return "yyyy-MM-dd";
                        }
                      }
                    }
                  }
                }
              ]
            }
          ],
          fix: {
            roles: [
              // single double both ,end 修理行数据 在行的位置添加
              {
                k: "mod",
                condition: { k: 3, v: 0 },
                v: [{ k: "replace", v: [{ "/^{/": "[{" }] }]
              },
              {
                k: "mod",
                condition: { k: 3, v: 2 },
                v: [{ k: "replace", v: [{ "/},$/": "},]," }] }]
              },
              { k: "end", v: [{ k: "replace", v: [{ "/},$/": "},]," }] }] }
            ],
            param: []
          }
        },
        {
          value: "ssOldForm",
          label: "ssOldForm",
          template:
            '{"name":"${0}","field":"${1}","showType":"${2:text}",foreign: "$?foreign:1?",},',
          param: [
            {
              k: "2",
              v: [
                {
                  k: "replace",
                  v: { s: "select", t: "text" }
                }
              ]
            }
          ],
          protoRowTranslate: [
            {
              k: "fun",
              v: function(arr, index, self) {
                let MDParam = self.protoParam.MDTitle;
                if (MDParam.length > 0) {
                  if (MDParam[index] && MDParam[index][0]) {
                    if (arr.length > 1) {
                      if (arr[1] == arr[0] || arr[1] == "s") {
                        // 如果 field != name , name don`t add prefix ;
                        arr[0] = MDParam[index][0] + "-" + (arr[0] || "");
                        if (arr[1] == "s") {
                          arr[2] = "s";
                        }
                        arr[1] = arr[0];
                      } else {
                        arr[1] = MDParam[index][0] + "-" + (arr[1] || "");
                      }
                    } else {
                      arr[0] = MDParam[index][0] + "-" + (arr[0] || "");
                      arr[1] = arr[0];
                    }
                  }
                }

                return arr;
              }
            }
          ],
          fix: {
            roles: [
              {
                k: "mod",
                condition: { k: 2, v: 0 },
                v: [{ k: "replace", v: [{ "/^{/": "[{" }] }]
              },
              {
                k: "mod",
                condition: { k: 2, v: 1 },
                v: [{ k: "replace", v: [{ "/},$/": "},]," }] }]
              },
              { k: "end", v: [{ k: "replace", v: [{ "/},$/": "},]," }] }] }
            ],
            fixRoles: [
              {
                k: "fun",
                v: function(str) {
                  return str.replace(/\[{/g, "[\n{");
                  // return str
                }
              }
            ],
            param: []
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
.usejson {
}
</style>