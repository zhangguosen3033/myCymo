<template>
<div class="boxDiv">
    <p class="headTitle">
      <span>房金云</span>房金云在手，银行贷款无忧！
    </p>

<div class="RangeBox">
  <p>
    <span>{{rangeValue}}</span>万
  </p>

  <mt-range v-model="rangeValue"
 :min="1"
 :max="1000"
 :step="10"
 :bar-height="5"
 class="range">
  <div slot="start" class="start">1</div>
  <div slot="end" class="end">1000</div>
</mt-range>

   <div class="apply" @click ='goApply' >
      立即申请
   </div>
</div>

 <div class="bottomDiv">
   <div>
     <p class="title"> 额度高</p>
     <p class="desc">{{applyDescData.loanQuota}}</p>
   </div>
   <div>
     <p class="title"> 利率低</p>
     <p class="desc">{{applyDescData.monthlyRate}}</p>
   </div>
   <div>
     <p class="title"> 放款快</p>
     <p class="desc">{{applyDescData.loanTerm}}</p>
   </div>
 </div>

</div>

</template>

<script>
import {
getHomeProductCfg,
} from '../../api/productApi.js'
export default {
  components: {
	},
	data() {
		return {
      rangeValue:500,
      applyDescData:{}
		}
	},
	computed: {

	},
  mounted() {
    getHomeProductCfg(null, res => {
      if(res.status == '200'){
        this.applyDescData = res.data;
      }
    })
  },
  methods: {
    goApply() {
      Toast("申请贷款去啊")
    }
  }
}

</script>
<style lang="stylus" type="text/stylus" scoped rel="stylesheet/stylus">
@import "./../../common/stylus/pxrem.styl";

  .boxDiv
      background-color: #ffffff
      width: 100%
      height: px2rem(520)
      .headTitle
          font-size:px2rem(28)
          color: #333
          padding-top: px2rem(59)
          span
              text-align: center
              font-size:px2rem(22)
              margin-right: px2rem(10)
              color: #fff
              background-color: #f97140
              width: px2rem(97)
              height: px2rem(36)
              border-radius: px2rem(5)
  .RangeBox
      padding: px2rem(20) px2rem(70) px2rem(20) px2rem(70)
      p
        font-size:px2rem(24)
        color: #333
        span
          font-size:px2rem(60)
          font-weight: bold
          color: #ff7f5b
          margin-right: px2rem(15)
      .range
        color: #f0f0f0
        .start
            font-size: px2rem(24)
            color: #999
        .end
            font-size: px2rem(24)
            color: #999

      .apply
          margin-top: px2rem(46)
          display: flex
          height: px2rem(80)
          background-color: #ffb323
          border-radius: px2rem(5)
          color: #fff
          font-size: px2rem(34)
          align-items: center
          justify-content: center;/*水平居中*/
  .bottomDiv
      display: flex
      flex-direction: row
      padding: px2rem(5) px2rem(10)  px2rem(30) px2rem(10)
      div
          flex: 1
          height: px2rem(60)
          width: 33%
          text-align: center
          .title
              font-size: px2rem(24)
              color: #838383
          .desc
              margin-top: px2rem(10)
              font-size: px2rem(24)
              color: #f3a049

</style>
