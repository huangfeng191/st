
# InputThreeMD  scada6crudcol

# cell setting  ?ColSpan?br?
## basic 
规则名称  name
规则编码 sn
## 目的是生成唯一的记录 
频率 frequency  c frequency  


| name     | field    | dataType | showType | binding/dateType |
| -------- | -------- | -------- | -------- | ---------------- |
| required | required | choice   | choice   | choice           |

> tips 
> 1: when showType in ["c" ,"d"] and row[2] in ["c","d"] : auto insert dataType; 
> 2:  可以设置 ColSpan or br 使 InputThreeMd 自动换行

