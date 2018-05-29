<template lang="html">
<div class="bottomTabWrap">
    <headBar :title="'案例详情'"></headBar>

    <p class="title">{{caseData.case_title}}</p>
    <div class= "info">
        <p >{{caseData.case_label_one}}</p>
        <p >{{caseData.case_label_two}}</p>
        <p>{{caseData.case_label_three}}</p>
    </div>

    <p class="title">客户背景</p>
    <div class= "info">
        <p>{{caseData.customer_demand}}</p>
    </div>

    <p class="title">解决方案</p>
    <div class= "info">
        <p>{{caseData.case_solution}}</p>
    </div>

    <p class="apply" @click="goApply()">申请贷款</p>
 </div>


</template>

<script>
import headBar from '../../components/common/headBar.vue'
import { getCaseDetail } from '../../api/productApi'
export default {
  components: {
    headBar
  },
  data() {
    return {
      caseData: {}
    }
  },
  mounted() {
    let params = {
      caseId: this.caseId
    }
    getCaseDetail(params, res => {
      if (res.status == '200') {
        this.caseData = res.data
      }
    })
  },
  created() {
    this.caseId = this.$route.query.caseId
  },
  methods: {
    goApply() {
      this.$vux.toast.text('申请贷款')
    }
  }
}
</script>

<style scoped lang="stylus"  type="text/stylus" rel="stylesheet/stylus" >
@import '../../common/stylus/pxrem.styl';

.bottomTabWrap {
    margin-top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden; // 设置这个属性 如果存在子控件过宽 直接隐藏  控制当前页面宽度

    .title {
        font-size: px2rem(30);
        padding: px2rem(26) px2rem(40) px2rem(16) px2rem(30);
        color: #333;
        text-align: left;
    }

    .info {
        background-color: #fff;
        padding: px2rem(20) px2rem(40) px2rem(23) px2rem(30);

        p {
            font-size: px2rem(28);
            color: #666;
            margin-top: px2rem(10);
            text-align: left;
        }
    }

    .apply {
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center; /* 水平居中 */
        bottom: 0;
        width: 100%;
        height: px2rem(90);
        background-color: #ffb323;
        color: #fff;
        font-size: px2rem(36);
    }
}
</style>