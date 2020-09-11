# MDParam

## 代码逻辑:
1. 将MD title 行 解析出 数组参数 以及 字段参数 ,最后一个参数是 field 参数 
    1. #   param1   ?param:default? 
    2. method: disposeBefore
2. 将每个数据行的参数值解析出来
    1. ?ColSpan?br    : 保存在  MDParamO:{"数据行":{值}}
    2. 删除 ? 以后的数据
    3. method: protoToArray 
3. 处理正常的行数据，处理完后，按参数替换行数据
4. 如果没用输入值的参数 设置成默认值

## thinking
1. 对于参数 是否每个模板单独保存
    : 不需要，因为模板只有一个,一类的配置需要考虑兼容性,对于模板的选择 可以考虑添加一个分组的概念

``` js
 protoParam:{ // 提供全局参数, 供后续调用
        "MDTitle":[], // #  1 2 3 , 可以有多个，如果最后一个 是 ?param1?... 方式 那么 可以理解为全局的，建议用在第一个
        "MDParam":[], // title 的 最后一个值  放在 markdown title 中的定义，目前支持用(?param1) 模式 取值是 ?  ?ColSpan?br  
        "MDParamO":{},// 值 按行绑定的参数， {0:{ColSpan:"","br":"" },1:{} }
 }



```

## 应用
 <!-- 将 数组行 前添加MD 参数  -->
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


<!-- 将MD 参数应用于 字符串模板中 -->
deakTemplateLikeArray: function(a, self) { // 对生成后的行数据数组,再次处理
      
      let o=self.protoParam.MDParamO;
      (a||[]).forEach(function(v,i){
          let colSpan=1
          if(o[i]){ // 输入的MD 对象
            colSpan=o[i].ColSpan||1 
          }
      // 修改输入    
      })
     

      return a;
    }

# 2019-12-21  Saturday 
F7 将焦点移动到输入文本处
>PS:
  1. 自定义全局指令 focus-textarea
  2. 定义全局快捷键 F7 ,
  3. gotoProto() realize let proto get focus 



