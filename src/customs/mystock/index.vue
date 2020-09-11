<template>
	<div id='mystock'>
		<div>
			<el-button type="primary" @click="add()">添加</el-button>
			<el-button type="primary" @click="del()">删除</el-button>
			<el-button type="warning" @click="save()">保存</el-button>
			{{idx}}
		</div>

		<el-row :gutter="20">
			<el-col :span="6">
				<div class="grid-content bg-purple">

					<el-input v-model="newtype" placeholder="分类">
						<el-select v-model="type" slot="prepend" placeholder="请选择" id="newtype" @change="show">
							<el-option v-for="o in info" :label="o.k" :value="o.k" :key="o.k"></el-option>
							<el-option label="all" value="all"></el-option>
						</el-select>

					</el-input>


				</div>
			</el-col>
			<el-col :span="3">
				<div class="grid-content bg-purple">
					<el-input v-model="k" placeholder="名称"></el-input>
				</div>
			</el-col>
			<el-col :span="5">
				<div class="grid-content bg-purple">
					<el-input v-model="v" placeholder="路径"></el-input>
				</div>
			</el-col>
			<el-col :span="4">

				<el-select
						v-model="addr"

						filterable
						allow-create
						placeholder="地址">
					<el-option
							v-for="item in addrArray"
							:key="item.value"
							:label="item.value"
							:value="item.value">
					</el-option>
				</el-select>


			</el-col>
			<el-col :span="4">
				<div class="grid-content bg-purple">
					<el-select
							v-model="app"

							filterable
							allow-create
							placeholder="应用">
						<el-option
								v-for="item in appArray"
								:key="item.value"
								:label="item.value"
								:value="item.value">
						</el-option>
					</el-select>


				</div>
			</el-col>
		</el-row>

		<el-row :gutter="10">
			<el-col :span="15">
				<el-col :span="23" v-for="tp in  info" name="tp" :key="tp.k" v-show="isShow==tp.k||isShow=='all'">
					<div>
						<h2 v-html="tp.k"></h2>
						<ul>
							<li v-for="r,i in tp.v">
								<el-tooltip class="item" effect="light" placement="right">
									<span slot="content">{{addr}}{{app}}{{r.v}}</span>
									<a :href="addr+app+r.v" target="_blank" v-html="r.k"></a>
								</el-tooltip>
							</li>
						</ul>
					</div>
				</el-col>
			</el-col>
			<el-col :span="6">
				<div>
                    <el-input
                        type="textarea"
                        autosize
                        placeholder="请输入内容"
                        :autosize="{ minRows: 3}"
                        v-model="aae013">
                </el-input>            
                <el-input
                        type="textarea"
                        autosize
                        placeholder="请输入内容"
                        :autosize="{ minRows: 3}"
                        :value="addrall"
                        >
                </el-input>            
                </div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
    import $ from 'jquery';
    import axios from 'axios';
    export default{
        data(){
            return {
                aae013: "",
                info: [
                    {
                        k: "Pump2",
                        v: [{"k": "远传命令发送", "v": "/pump2/viewer.html#realtimelst"},
                            {"k": "站点详细", "v": "/pump2/viewer.html#station"},
                            {"k": "站点模板", "v": "/pump2/viewer.html#stattemp"},
                            {"k": "设备类型", "v": "/pump2/viewer.html#diyinfo"},
                            {"k": "传感器类型", "v": "/ubiz/ddef.html"}],
                        aae013: "",
						addr:"",
						app:""
                    },
                    {
                        k: "济南二次维修单",
                        v: [{"k": "维修", "v": "/jinan/stock/repair.html"},
                            {"k": "计划维修", "v": "/jinan/stock/planrepair.html"},
                            {"k": "repairforq", "v": "/jinan/stock/repairforq.html"}],
                        aae013: "",
						addr:"",
						app:""
                    }
                ],
                isShow: "", // 显示那个应用
                type: "",
                newtype: "",
                k: "", //名称
                idx: 0,
                v: "", //路径
//                app: "/pump2/index.html#",//应用
				app:"/scada_index.html#!",
                appArray: [{value:"/pump2/index.html#"},{value:"/jsb/index2.html#"},{value:"/scada_index.html#!"}],
                addr: "http://127.0.0.1:8080",//地址
                addrArray: [{value:"http://127.0.0.1:8080"},{value:"http://192.168.100.121:8081"}],
                width: 250,
                height: 400,

            }
        },
        computed:{
            addrall:function(){
                return 11;
            }
        },
        methods: {
            show(){

                var self = this;
                if (this.idx != "1") {


                    axios.post('/api/mystock/history.json', {"app": self.app, "addr": self.addr, "now": 1, "type": self.type})
                        .then(function (res) {

                            self.idx = 0;
                            self.isShow = self.type;
                            $.each(self.info, function (i, v) {
                                if (v.k == self.isShow) {
                                    self.aae013 = v.aae013;
                                    self.addr = v.addr;
                                    self.app = v.app;
                                }
                            })

                        })
                        .catch(function (err) {
                            self.idx = err;
                        });
                }
                self.idx = 0;
            },
            add(){

                var self = this;

                if (self.type && self.k && self.v && (!self.newtype)) {
                    $.each(self.info, function (i, v) {
                        if (v.k == self.type) {
                            self.info[i]["v"].push({"k": self.k, "v": self.v});
                        }
                    })
                } else if (self.newtype && self.k && self.v) {
                    self.info.push({"k": self.newtype, v: [{"k": self.k, "v": self.v}]});

                }

//                self.info[0].v.push({"k": "sina", "v": "http://www.sina.com"});
            },
            del(){
                var self = this;

                if (self.type && self.k) {
                    $.each(self.info, function (i, v) {
                        if (v.k == self.type) {

                            $.each(self.info[i].v, function (ii, v) {
                                if (v.k == self.k) {
                                    self.info[i].v.splice(ii, 1);
                                }
                            })
                        }
                    })
                }
            },
            save(){
                var self = this;

                $.each(self.info, function (i, v) {
                        if (v.k == self.isShow) {
                            self.info[i]["aae013"] = self.aae013;
                            self.info[i]["addr"] = self.addr;
                            self.info[i]["app"] = self.app;
                        }
                    }
                )

                axios.post('/api/mystock/update.json', self.info)
                    .then(function (res) {

                        if (res.data.length > 0) {
                            self.info = res.data;
                            self.idx = "ok";
                        }


                    })
                    .catch(function (err) {
                        //  self.idx = err;
                    });


            }
        },
        mounted () {

            var self = this;
            setTimeout(axios.post('/api/mystock/query.json', this.info)
                .then(function (res) {

                    if (res.status == 200) {
                        if (res.data.l.length > 0) {
                            self.info = res.data.l;
                        }


                        if (res.data.now) {
                            self.type = res.data.now.k;

							 self.addr = res.data.now.addr;
							 self.app = res.data.now.app;
                            self.idx = "1";
                            self.isShow = res.data.now.k;
                        }
                    }
                    ;
                })
                .catch(function (err) {
                    console.log(err);
                }))

        }
    }
</script>


<style lang="less">


	#mystock {
		li {
			list-style-info: none;
		}
		textarea {
			margin-top: 30px;
		}
		[name=tp] {
			/*  border: 1px red solid; */
			float: left;
			margin: 10px;
		}
		#newtype {
			width: 150px;
		}
		.el-select {
			width: 100%;
		}

		h2 {
			margin-left: 20px;
		}

	}


</style>