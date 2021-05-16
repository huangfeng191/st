export default{
	routes:[
		{path:'/cs', component:() => import('../nouse/cs.vue')},
		{path:'/cs_js', component:() => import('../soon/cs_js.vue')},
		{path:'/usejson6', component:() => import('../customs/public/usejson6.vue')},
		{path:'/jsontest', component:() => import('../customs/public/tojsonTest.vue')},
		// {path:'/usejson7', component:UseJson7},
		{path:'/usejsona', component:() => import('../customs/public/usejsona.vue')},
		{path:'/usejsonyz', component:() => import('../customs/public/usejsonYZ.vue')},
		{path:'/usejsonss', component:() => import('../customs/public/usejsonSS.vue')},
        {path:'/position', component:() => import('../rest/css/position.vue')},
        {path:'/css', component:() => import('../rest/css/css.vue')},
		{path:'/news', component:() => import('../rest/css/css.vue')},
		{path:'/test', component:() => import('../soon/test.vue')},
		{path:'/mystock', component:() => import('../customs/mystock/index.vue')},
		{path:'/mycolor', component:() => import('../customs/mystock/getcolor.vue')},
		{path:'/usejsonstock', component:() => import('../customs/public/usejsonStock.vue')},
		{path:'/map', component:() => import('../customs/echarts/map.vue')},
		{path:'/ip', component:() => import("../customs/utility/ip.vue")},
		{path:'*', redirect:'/mystock'}
	]
}
