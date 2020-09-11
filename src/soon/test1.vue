<template>
	<div id="test">
		<h3>html测试</h3>
		<el-button type="primary" @click="st1">按钮</el-button>

		<input type="button" value="按钮" id="cs"/>
		<input type="text" value="按钮" id="cs1"/>

	</div>
</template>

<script>

    export default{

        data(){
            return {
                cs: "1"
            }
        },
        methods: {
            st(){// test 闭包
                function cs(arg) {
                    var c = arg;
                    return function (p) {
                        console.log((c++) + p)
                    }
                }

                var fn = cs(1);
            },
            st1(){

                $.each([1, 2, 3], function (i, v) {


                    console.log(v)
                })
                var all = {};

                function cs(arg) {
                    var c = arg;
                    return function (p) {
                        alert((c++) + p);
                    }
                }



            }

        },
        mounted(){
//            this.st();

            this.st1();
        }

    }
</script>
<style lang="less">
	#test {

	}
</style>