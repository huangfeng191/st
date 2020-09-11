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
      selected: ["scada6crudcol", "scada6crudinputOne"],
      // selected: ["scada6Quick"],
      types: [
        {
          value: "scada6Quick",
          label: "scada6Quick",
          template:
            '{"Name" : "${0}","Field": "${1}",  "ShowType": "${2:text}", "DataType": "${21:String}", "Unique": 0, "FilterEnabled": false, "Frozen": false, "Hidden": false, "OrderEnabled": false, "Ext": "${22}", },  ',
          single: true,
          desc: " ",
          param: [
            {
              k: "2",
              v: [{ k: "replace", v: { c: "combo", d: "datetime" } }]
            },
            {
              k: "21",
              v: [
                { k: "copy", v: { "2": true }, scope: ["d"] }
              
              ]
            }
            
          ],
          fix: {
            roles: [],
            fixRoles: []
          }
        },
        {
          value: "scada6crudcol",
          label: "scada6crudcol",
          template:
            '{ "field": "${1:nm}","title": "${0:nm}", "align": "center", "halign":"center","colspan": 1,"hidden": false, "rowspan": 1,"width": 100,${2} },',
          param: [
            {
              k: "2",
              v: [
                {
                  k: "containsReplace",
                  v: {
                    c: {
                      k: "fun",
                      v: function(row, tempConfigO) {
                        if (row[3]) {
                          return  'binding:"'+row[3]+'"'  ;
                        } else {
                          return 'binding:"USER"';
                        }
                      }
                    },
                    d: "formatter: DateFormatter,",
                    u: 'unit:"XXX",',
                    f: "formatter: function (v, r, i) {\n if (v){return v; \n}else {\n return v; \n}   },"
                  }
                }
              ]
            }
          ]
        },
 {
          value: "scada6crudprop",
          label: "scada6crudprop",
          template:
            '{ "Name": "${0}", "Field": "${1}",  "ShowType": "${2:text}", "Ext": "${21}","DataType": "${22:String}", "FilterEnabled": true, "OrderEnabled": true, "Unique": 0 },',
          param: [
            {
              k: "2",
              v: [{ k: "replace", v: { c: "combo", d: "datetime" } }]
            },
            {
              k: "21",
              v: [
                { k: "copy", v: { "2": true }, scope: ["d", "c"] },
                {
                  k: "replace",
                  v: {
                    d: "yyyy-MM-dd",
                    c: {
                      k: "fun",
                      v: function(row, tempConfigO) {
                        if (row[3]) {
                          return row[3];
                        } else {
                          return "USER";
                        }
                      }
                    }
                  }
                }
              ]
            },
            {
              k: "22",
              v: [{ k: "copy", v: { "2": true }, scope: ["d"] }, { k: "replace", v: { d: "Number" } }]
            }
          ]
        },
        {
          value: "scada6crudinputOne",
          label: "scada6crudinputOne",
          template:
            '{ "Field": "${1}", "Name": "${0}", ShowType: "${2:text}", Ext: "${21}",DataType: "${22:String}", "Required": false, RowSpan: 1, ColSpan: 1 },',
          param: [
            {
              k: "2",
              v: [{ k: "replace", v: { c: "combo", d: "datetime", a: "textarea", u: "upload", t: "text" } }]
            },
            {
              k: "21",
              v: [
                { k: "copy", v: { "2": true }, scope: ["d", "c"] },
                {
                  k: "replace",
                  v: {
                    d: "yyyy-MM-dd",
                    c: {
                      k: "fun",
                      v: function(row, tempConfigO) {
                       if (row[3]) {
                          return row[3];
                        } else {
                          return "USER";
                        }
                      }
                    }
                  }
                }
              ]
            },
            {
              k: "22",
              v: [{ k: "copy", v: { "2": true }, scope: ["d"] }, { k: "replace", v: { d: "Number" } }]
            }
          ],
          fix: {
            roles: [
              {
                k: "both",
                v: [{ k: "replace", v: [{ "/^{/": "[{", "/},$/": "},]," }] }]
              }
            ],
            param: []
          }
        },
        {
          value: "scada6crudinputTwo",
          label: "scada6crudinputTwo",
          template:
            '{ "Field": "${1}", "Name": "${0}", ShowType: "${2:text}", Ext: "${21}",DataType: "${22:String}", "Required": false, RowSpan: 1, ColSpan: 1 },',
          param: [
            {
              k: "2",
              v: [{ k: "replace", v: { c: "combo", d: "datetime", a: "textarea", u: "upload", t: "text" } }]
            },
            {
              k: "21",
              v: [
                { k: "copy", v: { "2": true }, scope: ["d", "c"] },
                {
                  k: "replace",
                  v: {
                    d: "yyyy-MM-dd",
                    c: {
                      k: "fun",
                      v: function(row, tempConfigO) {
                      if (row[3]) {
                          return row[3];
                        } else {
                          return "USER";
                        }
                      }
                    }
                  }
                }
              ]
            },
            {
              k: "22",
              v: [{ k: "copy", v: { "2": true }, scope: ["d"] }, { k: "replace", v: { d: "Number" } }]
            }
          ],
          fix: {
            roles: [
              // single double both ,end 修理行数据 在行的位置添加
              { k: "double", v: [{ k: "replace", v: [{ "/^{/": "[{" }] }] },
              { k: "single", v: [{ k: "replace", v: [{ "/},$/": "},]," }] }] },
              { k: "end", v: [{ k: "replace", v: [{ "/},$/": "},]," }] }] }
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