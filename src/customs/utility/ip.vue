<template>
  <div>
    
    <el-row>
  <el-col :span="4">
    <el-input
      style="margin-top:30px;margin-bottom:30px;"  
      placeholder="Please input"
      v-model="lastIp"
      id="lastIp"
    ></el-input>  

  </el-col>
  <el-col :span="4">
    <el-button @click="copyToClipBoard('lastIp')" id='toCopy'  type="primary" style="margin-top:30px;margin-bottom:30px;"  >复制</el-button> 
  </el-col>
</el-row>

  
   

    <el-table
      :data="tableData"
      style="width: 100%"
    >

      <el-table-column
        prop="ip"
        label="Ip"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="changed"
        label="Date"
        width="180"
      >
      </el-table-column>
        <el-table-column
        prop="day"
        label="Day"
        width="180"
      > 
      </el-table-column>

        <el-table-column
        prop="alter"
        label="alter"
        width="180"
      >
      </el-table-column>

    </el-table>

  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      lastIp: "",
      tableData: [
        {
          changed: "",
          ip: "",
          alter:""
        },
      ],
    };
  },
  mounted: function () {
    this.getIp();
  },
  methods: {
    doAlter(data){
      
      if(data.length>0){
          data[0].alter="true"
      };
       if (data.length>1){
        var a1=data.slice(1);
        
        a1.forEach(function(v,i){
            if(data[i].ip!=  v.ip){
              data[i+1].alter="true";
            }
        })
      }
    },
    
    copyToClipBoard:function(id){ //复制到剪切板
    
      if(document.execCommand){
        var copyText=document.getElementById(id).getElementsByTagName("input")[0];
        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand("copy");
        return true;
      }
     
      return false;
    },
    getIp() {
      axios.post("/get/basic").then((res) => {
        res.data.forEach(function (v) {
          if (v.changed) {
            v.day=new Date(v.changed * 1000).FormatString(
              "yyyy-MM-dd"
            );
            v.changed = new Date(v.changed * 1000).FormatString(
                "yyyy-MM-dd HH:mm"
              );
        
          }
        });
        if (res.data.length>1){
          var a=[];
          // 目标字段 必须是有序的
          // a 目标数组
          // 循环，如果值与最后一个数组相同则不添加
          res.data.forEach(function(v,i){
            if(a.length==0){
              a.push(v)
            }else{
              if(a[a.length-1].day!=v.day){
                a.push(v)
              }
            }
          })
          res.data=a;
        }
        this.doAlter(res.data);
        
        this.tableData = res.data.sort(function(x,y){
          return y.day.localeCompare(x.day )        });
        if(res.data.length>0){
            this.lastIp=res.data[0].ip;
            this.$nextTick(function(){
              this.copyToClipBoard("lastIp")
              setTimeout(() => {
                document.getElementById("toCopy").click();
              }, 1000);
            })
            

            
        }
        
      });
    },
  },
};
</script>