<template>
      <div class="usejson">
        <to-json :types="types" :selected="selected"></to-json>
      </div>
       
</template>

<script>
import $ from 'jquery'
import ToJson from "./tojson.vue";
export default {
  props: {},
  data() {
    return {
       selected: ["postmanRequest","json","selectFirsttoRow","singleConnect"],
      types: [

        {
          value: "singleConnect",
          label: "singleConnect",
          template: '${0:nm} ',
          single: true,
          desc: " ",
          param: [],
          fix: {
            roles: [
              
            ],
            fixRoles: [
              {
                k: "fun",
                v: function(str) {
                  let singleConnect=""
                  $.each(str.split("\n"),function(i,v){
                    if(i!=0&&i%2==0){
                     singleConnect=singleConnect+"\n"+v;
                    }else{
                      singleConnect=singleConnect+v;
                    
                    }
                  })
                  return singleConnect;
                }
              }
            ]
          }
        },


        // 模板
        {
          value: "VUECRUDCOL",
          label: "VUECRUDCOL",
          template: '{ title: "${2:nm}", data: "${0:code}", width: 130,${3} },',
          desc: "第四个参数：d:时间格式,c:词典,s:词典",
          param: [
            {
              k: "3",
              v: [
                {
                  k: "containsReplace",
                  same: false,
                  v: { d: 'type:"date", format:"yyyy-MM-dd"', c: 'format:"XXX"', s: 'format:"H0002"' }
                }
              ]
            }
          ]
        },
        {
          value: "VUECRUDInputOne",
          label: "VUECRUDInputOne",
          template: '{title: "${2:nm}",data: "${0:code}",required: true,dataType: "${1}",showType: "${3:text}"},',
          desc: "",
          fix: {
            roles: [
              {
                k: "both",
                v: [{ k: "replace", v: [{ "/^{/": "[{", "/},$/": "}]," }] }]
              }
            ],
            param: []
          },
          // 参数为1维数组的原因是 我希望顺序执行规则 ,采用 k v 对象方式是为了以后扩展方便
          param: [
            {
              k: "1",
              v: [
                // 元素值， 变化后值
                { k: "replace", v: { string: "String", int: "Number", int64: "Number", float: "Number" } }
              ]
            },
            {
              k: "3",
              v: [
                { k: "containsReplace", same: false, v: { d: "datetime", c: "combo", t: "text", s: "switch" } },
                { k: "append", v: { datetime: '",format:"yyyy-MM-dd', combo: '",format:"XXX' } }
              ]
            }
          ]
        },
        {
          value: "VUECRUDInputTwo",
          label: "VUECRUDInputTwo",
          template: '{title: "${2:nm}",data: "${0:code}",required: true,dataType: "${1}",showType: "${3:text}"},',
          fix: {
            roles: [
              // single double both ,end 修理行数据 在行的位置添加
              { k: "double", v: [{ k: "replace", v: [{ "/^{/": "[{" }] }] },
              { k: "single", v: [{ k: "replace", v: [{ "/},$/": "}]," }] }] },
              { k: "end", v: [{ k: "replace", v: [{ "/},$/": "}]," }] }] }
            ]
          },
          // 参数为1维数组的原因是 我希望顺序执行规则 ,采用 k v 对象方式是为了以后扩展方便
          param: [
            {
              k: "1",
              v: [{ k: "replace", v: { string: "String", int: "Number", int64: "Number", float: "Number" } }]
            },
            {
              k: "3",
              v: [
                { k: "containsReplace", same: false, v: { d: "datetime", c: "combo", t: "text", s: "switch" } },
                { k: "append", v: { datetime: '",format:"yyyy-MM-dd', combo: '",format:"XXX' } }
              ]
            }
          ]
        },
        {
          value: "goModel",
          label: "goModel",
          template: '${0} *${1} `json:"${10}" xorm:"${3}${11}"` //${2}',
          desc: 'i: "index ", u: "unique ", p: "pk ", n: "null ", o: "not null "',
          param: [
            {
              k: "0",
              v: [{ k: "transfer", v: { capitalize: true } }]
            },
            { k: "1", v: [{ k: "replace", v: { float64: "float64" } }] },
            {
              k: "3",
              v: [{ k: "containsReplace", v: { i: "index ", u: "unique ", p: "pk ", n: "null ", o: "not null " } }]
            },
            {
              k: "10",
              v: [{ k: "copy", v: { "0": true } }]
            },
            {
              k: "11",
              v: [
                { k: "copy", v: { "1": true } },
                { k: "replace", v: { int: "INT(11)", int64: "BIGINT(20)", float64: "DOUBLE", string: "VARCHAR(256)" } }
              ]
            }
          ]
        },
        {
          value: "goModelAll",
          label: "goModelAll",
          template: '${0} *${1} `json:"${10}" xorm:"${3}${11}"` //${2}',
          desc: 'i: "index ", u: "unique ", p: "pk ", n: "null ", o: "not null "',

          param: [
            {
              k: "0",
              v: [{ k: "transfer", v: { capitalize: true } }]
            },
            {
              k: "1",
              v: [{ k: "replace", v: { float64: "float64" } }]
            },
            {
              k: "3",

              v: [
                {
                  k: "containsReplace",
                  v: { i: "index ", u: "unique ", p: "pk ", n: "null ", o: "not null " }
                }
              ]
            },
            {
              k: "10",
              v: [{ k: "copy", v: { "0": true } }]
            },
            {
              k: "11",
              v: [
                { k: "copy", v: { "1": true } },
                { k: "replace", v: { int: "INT(11)", int64: "BIGINT(20)", float64: "DOUBLE", string: "VARCHAR(256)" } }
              ]
            }
          ],
          fix: {
            roles: [
              // single double both ,end 修理行数据 在行的位置添加
              {
                k: "first",
                v: [
                  {
                    k: "replace",
                    v: [{ "/^/": '//${1:table_name} ${0:} \ntype ${1:table_name} struct {\nBean       `xorm:"extends"`\n' }]
                  }
                ]
              },
              {
                k: "end",
                v: [{ k: "replace", v: [{ "/$/": "\n}" }] }]
              }
            ],
            param: [
              {
                k: "1",
                v: [{ k: "transfer", v: { snake: true } }]
              }
            ],
            protoRowTranslate: [
              {
                k: "fun",
                v: function(arr) {
                    // v, i, self self 就是 arr
                    // 对输入的数组 进行 筛选， 如果有相同元素，只取第一个元素，并且去除 输入数据是 - 的数组
                  return arr.filter(function(v, i, self) {
                    if (v == "–") {
                      return false;
                    }
                    return self.indexOf(v) === i;
                  });
                }
              }
            ]
          }
        },
       
        {
          //
          value: "goStruct",
          label: "goStruct",
          template: '${0} *${1} `json:"${10}"`',
          param: [
            // 对 模板 进行正则处理 ，匹配的项可
            //     'transfer',  ( capitalize 首字母大写 ，snake 驼峰)
            //   'replace'  根据输入文本替换成其他文本
            //  'copy' 从其他输入复制
            {
              k: "0",
              v: [{ k: "transfer", v: { capitalize: true } }]
            },
            {
              k: "1",
              v: [{ k: "replace", v: { float64: "float64" } }]
            },
            {
              k: "10",
              v: [{ k: "copy", v: { "0": true } }]
            }
          ],
          fix: {
            roles: [
              // single double both ,end 修理行数据 在行的位置添加

              {
                k: "first",
                v: [
                  {
                    k: "replace",
                    v: [{ "/^/": "type ${0:struct_name} struct {\n" }]
                  }
                ]
              },
              {
                k: "end",
                v: [{ k: "replace", v: [{ "/$/": "\n}" }] }]
              }
            ],
            param: [
              {
                k: "0",
                v: [{ k: "transfer", v: { snake: true } }]
              }
            ]
          }
        },
        {
          //
          value: "goStructV",
          label: "goStructV",
          template: '${0} ${1} `json:"${10}"`',
          param: [
            // 对 模板 进行正则处理 ，匹配的项可
            //     'transfer',  ( capitalize 首字母大写 ，snake 驼峰)
            //   'replace'  根据输入文本替换成其他文本
            //  'copy' 从其他输入复制
            {
              k: "0",
              v: [{ k: "transfer", v: { capitalize: true } }]
            },
            {
              k: "1",
              v: [{ k: "replace", v: { float64: "float64" } }]
            },
            {
              k: "10",
              v: [{ k: "copy", v: { "0": true } }]
            }
          ],
          fix: {
            roles: [
              // single double both ,end 修理行数据 在行的位置添加

              {
                k: "first",
                v: [
                  {
                    k: "replace",
                    v: [{ "/^/": "type ${0:struct_name} struct {\n" }]
                  }
                ]
              },
              {
                k: "end",
                v: [{ k: "replace", v: [{ "/$/": "\n}" }] }]
              }
            ],
            param: [
              {
                k: "0",
                v: [{ k: "transfer", v: { snake: true } }]
              }
            ]
          }
        },
        {
          //
          value: "goStructValue",
          label: "goStructValue",
          template: '${0} ${1} `json:"${10}"`',
          param: [
            // 对 模板 进行正则处理 ，匹配的项可
            //     'transfer',  ( capitalize 首字母大写 ，snake 驼峰)
            //   'replace'  根据输入文本替换成其他文本
            //  'copy' 从其他输入复制
            {
              k: "0",
              v: [{ k: "transfer", v: { capitalize: true } }]
            },
            {
              k: "1",
              v: [{ k: "replace", v: { float64: "float64", "array[string]": "[]string" } }]
            },
            {
              k: "10",
              v: [{ k: "copy", v: { "0": true } }]
            }
          ],
          fix: {
            roles: [
              // single double both ,end 修理行数据 在行的位置添加

              {
                k: "first",
                v: [
                  {
                    k: "replace",
                    v: [{ "/^/": "type ${0:struct_name} struct {\n" }]
                  }
                ]
              },
              {
                k: "end",
                v: [{ k: "replace", v: [{ "/$/": "\n}" }] }]
              }
            ],
            param: [
              {
                k: "0",
                v: [{ k: "transfer", v: { snake: true } }]
              }
            ]
          }
        },
         {
          // 还未生效，问题在与  parambefore 是用在 param 的无法用在param 里面， 其实是可以使用的，
          // 可以考虑模板里面加个参数parambefore,  那样fix 就是参数的意思了
          value: "postmanRequest",
          label: "postmanRequest",
          template: "",
          single: true,
          desc: " ",
          param: [],
          fix: {
            protoRowTranslate: [
              {
                k: "reg", // 匹配任意字符 \s \S
                v: { role: "match", reg: "--data-binary '([\\s\\S]*)' --compresse", idx: 1 }
              }
            ]
          }
        },
        {
          value: "rowToArray",
          label: "rowToArray",
          template: '"${0}",',
          param: {},
          fix: {
            roles: [
              { k: "first", v: [{ k: "replace", v: [{ "/^/": "[" }] }] },
              { k: "end", v: [{ k: "replace", v: [{ "/,$/": "]" }] }] }
            ]
          }
        },
        // 未解决
        // 可以考虑生成sql语句
        // 指定数据格式， 可使用参数（与fix 参数可混用，毕竟同时用参数的情况不多）
        {
          // 取第一个值 组成数组格式
          value: "selectFirsttoRow",
          label: "selectFirsttoRow",
          template: '"${0:nm}" ',
          param: {},
          fix: {
            roles: [
              { k: "first", v: [{ k: "replace", v: [{ "/^/": "[" }] }] },
              { k: "end", v: [{ k: "replace", v: [{ "/$/": "]" }] }] }
            ],
            fixRoles: [
              {
                k: "fun",
                v: function(str) {
                  return str.split("\n").join(",");
                }
              }
            ]
          }
        },
        {
          // 取第一个值 组成数组格式
          value: "toRowNumber",
          label: "toRowNumber",
          template: "${0:nm} ",
          param: {},
          fix: {
            roles: [
              { k: "first", v: [{ k: "replace", v: [{ "/^/": "[" }] }] },
              { k: "end", v: [{ k: "replace", v: [{ "/$/": "]" }] }] }
            ],
            fixRoles: [
              {
                k: "fun",
                v: function(str) {
                  return str.split("\n").join(",");
                }
              }
            ]
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
              },
              { k: "first", v: [{ k: "replace", v: [{ "/^/": "[" }] }] },
              { k: "end", v: [{ k: "replace", v: [{ "/$/": "]" }] }] }
            ]
          }
        },
        {
          value: "json",
          label: "json",
          template: '{"${0}":"${1}"},'
        },
        // scada6
        {
          value: "scada6crudcol",
          label: "scada6crudcol",
          template:
            '{ "field": "${0:nm}","title": "${1:nm}", "align": "center", "halign":"center","colspan": 1,"hidden": false, "rowspan": 1,"width": 100,${2} },',
          param: [
            {
              k: "2",
              v: [
                {
                  k: "containsReplace",
                  v: {
                    c: 'binding: "USER"',
                    d: "formatter: DateFormatter",
                    f: "formatter: function (v, r, i) {\n if (v){return v; \n}else {\n return v; \n}   }"
                  }
                }
              ]
            }
          ]
        },

        {
          value: "scada6crudinputOne",
          label: "scada6crudinputOne",
          template:
            '{ "Field": "${0}", "Name": "${1}", ShowType: "${2:text}", Ext: "${3}",DataType: "${4:String}", "Required": true, RowSpan: 1, ColSpan: 1 },',
          param: [
            {
              k: "2",
              v: [{ k: "replace", v: { c: "combo", d: "datetime", a: "textarea", u: "upload", f: "text" } }]
            },
            {
              k: "3",
              v: [{ k: "copy", v: { "2": true }, scope: ["d", "c"] }, { k: "replace", v: { d: "yyyy-MM-dd", c: "USER" } }]
            },
            {
              k: "4",
              v: [{ k: "copy", v: { "2": true }, scope: ["d"] }, { k: "replace", v: { d: "Number" } }]
            }
          ],
          fix: {
            roles: [
              {
                k: "both",
                v: [{ k: "replace", v: [{ "/^{/": "[{", "/},$/": "}]," }] }]
              }
            ],
            param: []
          }
        },
        {
          value: "scada6crudinputTwo",
          label: "scada6crudinputTwo",
          template:
            '{ "Field": "${0}", "Name": "${1}", ShowType: "${2:text}", Ext: "${3}",DataType: "${4:String}", "Required": true, RowSpan: 1, ColSpan: 1 },',
          param: [
            {
              k: "2",
              v: [{ k: "replace", v: { c: "combo", d: "datetime", a: "textarea", u: "upload", f: "text" } }]
            },
            {
              k: "3",
              v: [{ k: "copy", v: { "2": true }, scope: ["d", "c"] }, { k: "replace", v: { d: "yyyy-MM-dd", c: "USER" } }]
            },
            {
              k: "4",
              v: [{ k: "copy", v: { "2": true }, scope: ["d"] }, { k: "replace", v: { d: "Number" } }]
            }
          ],
          fix: {
            roles: [
              // single double both ,end 修理行数据 在行的位置添加
              { k: "double", v: [{ k: "replace", v: [{ "/^{/": "[{" }] }] },
              { k: "single", v: [{ k: "replace", v: [{ "/},$/": "}]," }] }] },
              { k: "end", v: [{ k: "replace", v: [{ "/},$/": "}]," }] }] }
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