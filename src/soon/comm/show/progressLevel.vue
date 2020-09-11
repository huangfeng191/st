<template>
    <div class="show-progresslevel">
        <i :style="{'width':w+'px','height':h+'px','backgroundColor':bgColorBottom}" style="display:inline-block;position:relative;">
            <i :style="{width:w*rate+'px',backgroundColor:bgColorTop}" style="height:100%;display:inline-block;position:absolute;">
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
.show-progresslevel {
    border-radius: 100px;
    line-height: 1;
}
</style>