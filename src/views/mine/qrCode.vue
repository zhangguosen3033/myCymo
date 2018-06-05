<template lang="html">
<div>
    <headBar :title="'邀请注册'" class="head"></headBar>
    <div class="content">
        <qrcode class="aQrCode" ref="aQrCode" v-show="true" :value="qrcodeUrl" type="img" :size="150" level="H"></qrcode>
    </div>
</div>



</template>
<script>
import headBar from "../../components/common/headBar.vue";
import { Qrcode } from "vux";
export default {
  components: {
    headBar,
    Qrcode
  },
  data() {
    return {
        qrcodeUrl:'https://m.fangjinyun.com.cn/kehuzhuanti'
    };
  },
  computed: {},
  mounted() {},
  created() {},
  methods: {}
};
</script>
<style lang="stylus" type="text/stylus" scoped rel="stylesheet/stylus">
@import '../../common/stylus/pxrem.styl';

.head{
    position fixed
    z-index: 10;
    width 100%
    height px2rem(90)
}

.content {
    width: 100%;
    height: 100%;
    background: #fff url('../../assets/images/invite_envelop.png') no-repeat 0 0;
    background-size: 80%;
    background-position: center center;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .aQrCode{
        margin-top px2rem(-220)
    }
}
</style>