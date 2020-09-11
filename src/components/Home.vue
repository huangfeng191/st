<template>
<div id="cs">
	  <el-button type="primary" @click="get()">危险按钮</el-button>
	  <DIV >{{myMessage}}</DIV>
</div>
</template>
<script>
import axios from 'axios';
export default {
	data(){
		return {
			"cs":111,
			myMessage:"112"
		}
	},
	methods:{
		get(){
		
			     axios.get('/api/mytest.json')
				.then(function(res){
					this.myMessage=res.data;
				}.bind(this)).catch(function(err){
					console.log(err);
				})
		}
	}
}
</script>
<style lang="less" scoped>
	#cs{
		background-color:red;
	    width: 100%;
		height: 1000px;
	}
</style>