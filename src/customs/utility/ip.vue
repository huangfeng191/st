<template>
    <div>
        <el-input placeholder="Please input" v-model="lastIp"></el-input>

        <el-table
      :data="tableData"
      style="width: 100%">
     
      <el-table-column
        prop="ip"
        label="Ip"
        width="180">
      </el-table-column>
       <el-table-column
        prop="date"
        label="Date"
        width="180">
      </el-table-column>
     
    </el-table>


    </div>
</template>
<script>
  import axios from 'axios';
export default{
    data(){
        return {
            lastIp:"127.0.0.1",
          tableData: [{
            date: '2016-05-03',
            name: 'Tom',
          
          }]
        }
    },
    mounted:function(){
         this.getIp();
    },
    methods:{
        getIp(){
                 axios.post('/get/basic', )
                        .then(function (res) {
                            console.log("1"+11);
                        })
        }
    }
}

</script>