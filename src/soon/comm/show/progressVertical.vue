<template>
    <div class="show-progressvertical">
        <i :style="{'width':w+'px','height':h+'px','backgroundColor':bgColorBottom}" style="display:inline-block;position:relative;">
            <i :style="{height:h*rate+'px',backgroundColor:bgColorTop}" style="width:100%;display:inline-block;position:absolute;">
            </i>
        </i>
    </div>

</template>

<script>
export default {
  props: {
    w: String,
    rate: String,
    h: String,
    bgColorBottom: String,
    bgColorTop: String
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {},
  watch: {},
  components: {}
};
</script>
<style lang="less" >
.show-progressvertical {
    border-radius: 100px;
    line-height: 1;
}
</style>