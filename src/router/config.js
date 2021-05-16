// import Home from '../components/Home.vue'
import News from '../components/News.vue'
import Mystock from '../customs/mystock/index.vue'
import Mycolor from '../customs/mystock/getcolor.vue'
// 测试 js
import Test from '../soon/test.vue'
import SoonCsJs from '../soon/cs_js.vue'

// 测试 nouse
import Cs from '../nouse/cs.vue'
// import CsJs from '../nouse/cs_js.vue'
import Position from '../rest/css/position.vue'
import Css from '../rest/css/css.vue'


// 转换格式化成json
import UseJson6 from '../customs/public/usejson6.vue'
import UseJson7 from '../customs/public/usejson7.vue'
import UseJsona from '../customs/public/usejsona.vue'
import UseJsonYZ from '../customs/public/usejsonYZ.vue'
import ToJsonTest from '../customs/public/tojsonTest.vue'
import ToJsonStock from '../customs/public/usejsonStock.vue'
import UseJsonSS from '../customs/public/UseJsonSS.vue'
import EchartsMap from '../customs/echarts/map.vue'

import Ip from "../customs/utility/ip.vue"
export default{
	routes:[
		{path:'/cs', component:Cs},
		{path:'/cs_js', component:SoonCsJs},
		{path:'/usejson6', component:UseJson6},
		{path:'/jsontest', component:ToJsonTest},
		// {path:'/usejson7', component:UseJson7},
		{path:'/usejsona', component:UseJsona},
		{path:'/usejsonyz', component:UseJsonYZ},
		{path:'/usejsonss', component:UseJsonSS},
        {path:'/position', component:Position},
        {path:'/css', component:Css},
		{path:'/news', component:News},
		{path:'/test', component:Test},
		{path:'/mystock', component:Mystock},
		{path:'/mycolor', component:Mycolor},
		{path:'/usejsonstock', component:ToJsonStock},
		{path:'/map', component:EchartsMap},
		{path:'/ip', component:Ip},
		{path:'*', redirect:'/mystock'}
	]
}
