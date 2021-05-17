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
      // selected: ["CrudColumns", "scada6crudinputOne"],

      // selected: [ "toRowSingle", "CueColumns", "CueCrudInputThree"],
      // selected: [ "proStockCol","bindingSame"],

      // selected: [ "proStockCol", "CrudColumns","CrudProp"],
      // selected: ["CrudInputs3","CrudColumns","CrudProp","CrudQueries"],
      selected: ["CrudInputs3"],

      types: [
        {
          value: "CrudInputs3",
          label: "CrudInputs3",
          desc: "# cell setting  ?ColSpan?Required?br?",
          template:
            '{ "Field": "${1}", "Name": "${0}",DataType: "${2:String}", ShowType: "${3:text}", Ext: "${31}", "Required": $?Required:false?, RowSpan: 1, ColSpan: "$?ColSpan:1?" },',
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
          protoRowTranslate: [
            {
              k: "fun",
              v: function(arr, index, self) {
                let MDParam = self.protoParam.MDTitle;
                if (MDParam.length > 0) {
                  if (MDParam[index] && MDParam[index][0]) {
                    // field
                    arr[1] = MDParam[index][0] + "." + (arr[1] || "");
                  }
                }
                if (
                  arr.length > 2 &&
                  ["c", "d", "a", "u", "t"].includes(arr[2])
                ) {
                  arr.splice(2, 0, "String");
                }
                return arr;
              }
            }
          ],
          deakTemplateLikeArray: function(a, self) {
            // 对生成后的行数据数组,再次处理
            debugger;
            let ids = [];
            let o = self.protoParam.MDParamO;
            (a || []).forEach(function(v, i) {
              let colSpan = 1;
              if (o[i]) {
                colSpan = o[i].ColSpan || 1;
              }
              ids.push(colSpan);
            });
            let group = 0;
            ids.forEach(function(v, i) {
              if (group == 0) {
                a[i] = a[i].replace(/^{/, "[{");
              }
              group += Number(v);
              if (
                i == ids.length - 1 ||
                group + ids[i + 1] > 3 ||
                (o[i] && o[i].br)
              ) {
                a[i] = a[i].replace(/},$/, "},],");
                group = 0;
              }
            });
            return a;
          },
          fix: {
            roles: [],
            param: []
          }
        },
        {
          value: "CrudColumns",
          label: "CrudColumns",
          template:
            '{ "field": "${1:nm}","title": "${0:nm}", "align": "left", "halign":"center","colspan": 1,"hidden": false, "rowspan": 1,"width": 100,${3} },',
          param: [
            {
              k: "3",
              v: [
                {
                  k: "containsReplace",
                  v: {
                    c: {
                      k: "fun",
                      v: function(row, tempConfigO) {
                        if (row[4]) {
                          return 'binding:"' + row[4] + '"';
                        } else {
                          return 'binding:"USER"';
                        }
                      }
                    },
                    d: {
                      k: "fun",
                      v: function(row, tempConfigO) {
                        if (row[4] == "yyyy") {
                          return "formatter: YearFormatter,";
                        } else if (row[4] == "yyyy-MM") {
                          return "formatter: MonthFormatter,";
                        } else {
                          return "formatter: DateFormatter,";
                        }
                      }
                    },
                    //  "formatter: DateFormatter,",
                    // u: 'unit:"XXX",',
                    f:
                      "formatter: function (v, r, i) {\n if (v){return v; \n}else {\n return v; \n}   },"
                  }
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
                    arr[1] = MDParam[index][0] + "." + (arr[1] || "");
                  }
                }
                if (
                  arr.length > 2 &&
                  ["c", "d", "a", "u", "t"].includes(arr[2])
                ) {
                  arr.splice(2, 0, "String");
                }
                return arr;
              }
            }
          ]
        },
        {
          value: "CrudProp",
          label: "CrudProp",
          template:
            '{ "Field": "${1}", "Name": "${0}", ShowType: "${3:text}", Ext: "${31}",DataType: "${2:String}", "Unique": 0, "FilterEnabled": false, "Frozen": false, "Hidden": false, "OrderEnabled": false  },',
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
          protoRowTranslate: [
            {
              k: "fun",
              v: function(arr, index, self) {
                let MDParam = self.protoParam.MDTitle;
                if (MDParam.length > 0) {
                  if (MDParam[index] && MDParam[index][0]) {
                    arr[1] = MDParam[index][0] + "." + (arr[1] || "");
                  }
                }
                if (
                  arr.length > 2 &&
                  ["c", "d", "a", "u", "t"].includes(arr[2])
                ) {
                  arr.splice(2, 0, "String");
                }

                return arr;
              }
            }
          ]
        },

        {
          value: "CrudQueries",
          label: "CrudQueries",
          template:
            '{ "Field": "${1:nm}", "Label": "${0:nm}", "Type":  "${3:QText}",  TextField: "name", ValueField: "value", "Width": 90 ,${31} },',
          param: [
            {
              k: "3",
              v: [
                { k: "filterStr", v: [{ k: "notNumber", operate: "and" }] },

                {
                  k: "replace",
                  v: {
                    c: "QCombox",
                    d: "QDatetime",
                    r: "QDatetimeRange",
                    t: "QText"
                  }
                }
              ]
            },
            {
              k: "31",
              v: [
                { k: "copy", v: { "3": true }, scope: ["c", "d", "r"] },
                {
                  k: "containsReplace",
                  v: {
                    c: {
                      k: "fun",
                      v: function(row, strLikeObject) {
                        if (row[4]) {
                          return (
                            ' Ext: "' + row[4] + '", Source: "' + row[4] + '", '
                          );
                        } else {
                          return ' Ext: "USER", Source: "USER", ';
                        }
                      }
                    },
                    d: {
                      k: "fun",
                      v: function(row, strLikeObject) {
                        if (row[4] && /^[0-9]+$/g.exec(row[4]) == null) {
                          return (
                            'Ext: "{Format:"' +
                            row[4] +
                            '"}", Value: new Date().FormatString("' +
                            row[4] +
                            '")'
                          );
                        } else {
                          return 'Ext: "{Format:"yyyy-MM-dd"}", Value: new Date().FormatString("yyyy-MM-dd")';
                        }
                      }
                    },
                    r: {
                      k: "fun",
                      v: function(row, strLikeObject) {
                        if (row[4] && /^[0-9]+$/g.exec(row[4]) == null) {
                          return (
                            'Ext: "{Format:"' +
                            row[4] +
                            '"}",Begin: new Date().AddMonths(-1).FormatString("' +
                            row[4] +
                            '"), End: new Date().FormatString("' +
                            row[4] +
                            '")'
                          );
                        } else {
                          return 'Ext: "{Format:"yyyy-MM-dd"}",Begin: new Date().AddMonths(-1).FormatString("yyyy-MM-dd"), End: new Date().FormatString("yyyy-MM-dd")';
                        }
                      }
                    }
                  }
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
                    arr[1] = MDParam[index][0] + "." + (arr[1] || "");
                  }
                }

                return arr;
              }
            }
          ]
        },

        //  other
        {
          value: "proStockCol",
          label: "proStockCol",
          desc: "新表列配置",
          template: "${0:nm},${1:nm},${2:nm} ",
          single: true,
          desc: " ",
          param: [],

          fix: {
            roles: [],
            fixRoles: []
          }
        },
        {
          // 取第一个值 组成数组格式
          value: "binding",
          label: "binding",
          template: '{"name": "${0}", "value":"${1}" },',
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
          value: "bindingSame",
          label: "bindingSame",
          template: '{"name": "${0}", "value":"${0}" },',
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
        }

        //  new
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