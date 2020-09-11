o = {
    types: [{
        value: "test",
        label: "test",
        template: '${99:nm} ',
        single: true,
        desc: " ",
        /* 
        对 protoLikeArray one Row 处理
        支持： 1 fun 支持自定义 数据处理
              2 reg 通过正则方式 来过滤数据 
        */
    //    对每行数据 进行二次处理 可以配合 protoParam 来使用
    // 每一行数据已经拆分成数组了 , 将数据行 转换成数据数组
        protoRowTranslate: [

        ],
        /*  param 是一个数组
           先 标识 是对 地几个参数（k） 进行操作, v 里面是转换规则[
             k: 规则类型
             v: 需要的参数

           ] 
        */
        param: [
            //  k >=90 倒叙 
            {
                k: "98",
                v: [{
                    k: "existsReplace",
                    v: {
                        int: "int",
                        string: "string"
                    },
                    or: ["number"]
                }] // 全部存在的时候 ，才显示， 或者输入是数字
            },
            // 先复制，
            // 再替换
            {
                k: "31",
                v: [{
                        k: "copy",
                        v: {
                            "3": true
                        },
                        scope: ["c"]
                    },
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
                            }
                        }
                    }
                ]
            }

        ],
        //  对处理完param 的 按行 的一维数组 ，进行二次处理
        //  可以操作的权限 包括：
        // single double both first end mod
        // 其中 mod 是 万能配置
        // single double 针对的是 数组的 下标 ，既从0 开始
        // 目前只支持 replace
        fix: {
            roles: [
                // single double both ,end 修理行数据 在行的位置添加
                //  当符合条件时 配置余数
                {
                    k: "mod",
                    config: {
                        "k": 3,
                        "v": 0
                    },
                    v: [{
                        k: "replace",
                        v: [{
                            "/^{/": "[{"
                        }]
                    }]
                },
                {
                    k: "mod",
                    config: {
                        "k": 3,
                        "v": 1
                    },
                    v: [{
                        k: "replace",
                        v: [{
                            "/},$/": "},],"
                        }]
                    }]
                },
                {
                    k: "end",
                    v: [{
                        k: "replace",
                        v: [{
                            "/},$/": "},],"
                        }]
                    }]
                }
            ],
            //  按行 再次应用规则，
            // 可以用在， 在转换过程中 配置规则的时候 ，配置 "${1:table_name} ${0:} " 类型
            param: [

            ],
            fixRoles: [

            ]
        }
    }]
}

/* 
                    处理顺序：
                    1 param: 行应用模板，形成行数组
                    2 fix: roles: 对行数据进行处理。

*/

/* ${99} 表示取数组的最后一个元素        
${98}  表示取数组的倒数第二个元素      
${97}  表示取数组的倒数第三个元素    


*/


