    <template>
          <div class="subject" :style={width:w,height:h} >
            <div class="title">主题专题</div>
            <div class="content">
                <icon name="shijian1" class="box_sizing"></icon>
                <icon name="sousuo"  class="box_sizing"></icon>
                <icon name="tuceng"  class="box_sizing"></icon>
                <icon name="shijian1"  class="box_sizing"></icon>
            </div>
          </div>
           
    </template>
    
    <script>
import icon from "./icon.vue";
export default {
  props: {
    w: String,
    h: String
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  watch: {},
  components: {
    icon
  }
};
</script>
    <style lang="less" >
.subject {
  box-sizing: border-box;
  .title {
    width: 100%;

    font-size: 16px;
    color: #ffffff;
    line-height: 40px;
    padding-left: 30px;
    box-sizing: border-box;
    height: 41px;
    background-color: rgba(27, 38, 50, 0.9);
    border-radius: 0px 3px 0px 0px;
    border: solid 1px rgba(70, 83, 97, 0.9);
  }
  .box_sizing {
    margin-left: 14px;
    width: 117px;
    height: 91px;
    box-sizing: border-box;
    line-height: 91px;
    font-size: 40px;
    border-width: 0px;
    &:hover {
      background-color: rgba(41, 71, 101, 0.8);
      border: solid 1px rgba(0, 143, 215, 0.8);
    }
  }
  .content {
    box-sizing: border-box;
    padding-top: 12px;
    width: 542px;
    height: 125px;
    background-color: rgba(24, 33, 44, 0.9);
    box-shadow: 0px 10px 50px 0px rgba(12, 49, 100, 0.35);
    border: solid 1px #465361;
    color: #ffffff;
  }
  //   background-color: red;
}
</style>