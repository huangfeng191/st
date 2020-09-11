<template>

	<div id="mycolor">
		<el-row>

			<el-col :span="4">
				<el-input v-model="bgcolor" style="width: 200px;"></el-input>
			</el-col>
			<el-col :span="2">

				<div class="block">
					<el-color-picker v-model="bgcolor"></el-color-picker>
				</div>
			</el-col>
			<el-col :span="2">
				<el-button type="warning" @click="getRGB()">获取rgb</el-button>
			</el-col>
			<el-col :span="4">
				<el-input v-model="rgb" placeholder="red,green,blue" style="width: 200px;"></el-input>
			</el-col>
		</el-row>

		<div id="bg" style="width:200px;height: 200px" :style="{backgroundColor:getBGColor}">

		</div>
		<div  id="bg1" style="width:200px;height: 200px" :style="{backgroundColor:getBGColor1}">

		</div>


	</div>

</template>
<script>

    export default {
        data() {
            return {
                bgcolor: "",
                rgb: ""
            };
        },
        methods: {
            getRGB(){
                if ($("#bg").css("background-color") == "rgba(0, 0, 0, 0)") {
                    this.rgb = $("#bg1").css("background-color");
                } else {
                    this.rgb = $("#bg").css("background-color");
                }

            }
        },
        computed: {
            getBGColor(){
                var self = this;
                return self.bgcolor;
            },
            getBGColor1(){
                var self = this;
                return "#" + self.bgcolor;
            }
        },
        watch: {},
        mounted () {
        }
    };

</script>
<style lang="less">
	#mycolor {

	}
</style>