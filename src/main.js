import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import router from './router'


require("./static/font/iconfont.css")
Vue.use(ElementUI)

Vue.directive('focus-area', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    if(el.getElementsByTagName("textarea")){
      el.getElementsByTagName("textarea")[0].focus()
    }
    
  }
})

Vue.config.keyCodes = {
  f7: 118
 
}
new Vue({
  router,
  el: '#app',
  data() {
    return {
       msg: 'Welcome to Your Vue.js App',
      "sss": "main_"
    }
  },

    /**
  template: '<App/>',
  components: { App }
  与  render: h => h(App) 写法相同
 */
  template: "<App :sss='sss'/>",
  components: { App }
})
