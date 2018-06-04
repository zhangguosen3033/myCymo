<template lang="html">
<div>
    <headBar :title="'意见反馈'"></headBar>

    <div class="inputBox">
        <x-textarea :max="300"  :height='150' placeholder="说说你的意见吧" v-model="value" class="inputClass"></x-textarea> 
    </div>
     <p class="submit" :class="classMethods" @click="submitGesstion">提交反馈</p>

</div>


</template>
<script>
import headBar from "../../components/common/headBar.vue";
import { XTextarea } from "vux";
export default {
  components: {
    headBar,
    XTextarea
  },
  data() {
    return {
      value: "",
      isShowNumber: true
    };
  },
  computed: {
    classMethods: function() {
      if (this.value.length > 0) {
        return "activeSubmit";
      } else {
        return "submit";
      }
    },
    hasContent:function(){
        return this.value.length >0 ? true :false;
    }
  },
  mounted() {},
  created() {},
  methods: {
      submitGesstion(){
          if(this.hasContent){
              this.$vux.toast.text('提交反馈内容');
              this.$router.go(-1);
          }
      }
  }
};
</script>
<style lang="stylus" type="text/stylus" scoped rel="stylesheet/stylus">
@import '../../common/stylus/pxrem.styl';

.inputBox {
    margin-top: px2rem(20);
    background-color: #fff;
    font-size: px2rem(26);
    padding: px2rem(20) px2rem(20) px2rem(20) px2rem(20);

    .inputClass {
        padding: 0;
        width: 100%;
        margin-top: px2rem(20);
    }
}

.submit {
    margin-top: px2rem(30);
    margin-left: px2rem(30);
    margin-right: px2rem(30);
    height: px2rem(80);
    background-color: #e6e6e6;
    color: #b3b3b3;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: px2rem(10);
    font-size px2rem(30)
    &.activeSubmit {
        background-color: #ffb323;
        color: #fff;
    }
}
</style>