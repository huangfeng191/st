<template>
      <div class="usejson">
        <to-json :types="types" :selected="selected"></to-json>
      </div>
       
</template>

<script>
import ToJson from "./tojson.vue";
export default {
  props: {},
  data() {
    return {
       selected: ["VUECRUDCOL", "VUECRUDInputTwo", "goModelAll"],
      types: [
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
        },  {
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
        }]
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