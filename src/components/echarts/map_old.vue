<template>
  <div>
      <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>


<script>
import ECharts from "vue-echarts";
ECharts.registerMap('china', chinaMap)
import echarts from 'echarts'
import "echarts/lib/component/geo";
import "echarts/lib/chart/line";
import "echarts/lib/component/polar";
import "echarts/lib/chart/scatter";
import "echarts/lib/chart/effectScatter";
import "echarts/lib/chart/custom";
import "echarts/lib/chart/map";
import chinaMap from 'echarts/map/json/china.json'

export default {
  props: ["option"],
  data() {
    let data = [];

    for (let i = 0; i <= 360; i++) {
      let t = (i / 180) * Math.PI;
      let r = Math.sin(2 * t) * Math.cos(2 * t);
      data.push([r, i]);
    }

    return {
      initial:{"renderer":"svg"},
      map: {
        title: {
          text: "极坐标双数值轴"
        },
        legend: {
          data: ["line"]
        },
        polar: {
          center: ["50%", "54%"]
        } ,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        angleAxis: {
          type: "value",
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [
          {
            coordinateSystem: "polar",
            name: "line",
            type: "line",
            showSymbol: false,
            data: data
          }
        ],
        animationDuration: 2000
      }
    };
  },
  mounted(){
    let self=this;
     const renderer = this.renderer || 'svg';
      var myChart = echarts.init(document.getElementById('main'),null,{renderer});
      debugger
      myChart.setOption(
        self.map
      )
    //  if(this.option){
    //      this.map=this.option
    //  }
  },
  components: {
    "v-chart": ECharts
  }
};
</script>

<style lang="less">
.echarts {
  width: 100%;
  height: 100%;
}
</style>
