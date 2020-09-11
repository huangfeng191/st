<template>
  <div class="echarts-map">
    <e-map :option='option'></e-map>
  </div>

</template>

<script>
import EMap from "../../components/echarts/map.vue";
export default {
  props: {},
  data() {
    return {
      option: {

        geo: {
          type: "map",
          map: "china",
          roam: true,
          zoom: 1.2,
          itemStyle: {
            areaColor: "skyblue",
            borderColor: "violet"
          },
          emphasis: {
            itemStyle: {
              areaColor: "#2a333d"
            },
            label: {
              show: false
            }
          }
        },
        series: [
          {
            name: "中国地图",
            type: "map",
            roam: true,
            mapType: "china",
            label: {
              show: true
            },
            geoIndex: 0
          }
        ]
      }
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {},
  watch: {},
  components: {
    EMap
  }
};
</script>
<style lang="less" >
.echarts-map {
}
</style>