<template>
    <div id="app">
        <div style="height:25px;">
            <router-link to="/usejson6">usejson6</router-link>
            <router-link to="/usejsona">usejsonall</router-link>
            <router-link to="/jsontest">jsontest</router-link>
            <router-link to="/position">position</router-link>
            <router-link to="/css">css</router-link>
            <router-link to="/cs">nouse/cs.vue</router-link>
            <router-link to="/cs_js">cs_js</router-link>
            <router-link to="/test">test</router-link>
            <router-link to="/mycolor">获取颜色</router-link>
            <router-link to="/mystock">维护页面</router-link>
            <router-link to="/usejsonyz">yz配置</router-link>
            <router-link to="/usejsonstock">stock配置</router-link>
            <router-link to="/usejsonss">usejsonSS</router-link>
               <router-link to="/ip">ip</router-link>
              <router-link to="/map">map</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'app',
    props: [
        "sss"
    ],
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            "cs": "app_"
        }
    }
}
</script>
