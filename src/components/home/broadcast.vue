<template>
    <div class="contentDiv">
        <div class="headBox">
            <div class="icon"></div>
            <Marquee>
                <MarqueeItem v-for="(item,index) in homeScrollData" :key="index" class="scrollinfo">
                    <span>{{item.textContent}}</span>
                    <span class="redText">{{item.amount}}</span>
                    万元
                </MarqueeItem>
            </Marquee>
        </div>
        <div class="gray"></div>
        <div class="headTitleBox">
            <p class="headTitle">
                <span>房金云</span>房金云在手，银行贷款无忧！</p>

            <div class="RangeBox">
                <p>
                    <span>{{rangeValue}}</span>万 </p>
                <Range :step="1" v-model="rangeValue" :min="1" :max="1000"></Range>
                <div class="apply" @click='goApply'>立即申请</div>
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
    </div>
</template>

<script>
import { getHomeProductCfg, getHomeScrollData } from '../../api/productApi.js'
import { Marquee, MarqueeItem, Range } from 'vux'
export default {
  components: {
    Marquee,
    MarqueeItem,
    Range
  },
  data() {
    return {
      rangeValue: 500,
      applyDescData: {},
      homeScrollData: {}
    }
  },
  computed: {},
  mounted() {
    getHomeProductCfg(null, res => {
      if (res.status == '200') {
        this.applyDescData = res.data
      }
    })
    getHomeScrollData(null, res => {
      if (res.status == '200') {
        this.homeScrollData = res.data.data.loanItem
      }
    })
  },
  methods: {
    goApply() {
      this.$vux.toast.text('申请贷款')
    }
  }
}
</script>
<style lang="stylus"  type="text/stylus" rel="stylesheet/stylus" >
@import './../../common/stylus/pxrem.styl';

// scoped 导致vux的rang属性不能修改
.headBox {
    background-color: #ffffff;
    width: 100%;
    height: px2rem(123);
    padding: px2rem(15) px2rem(75) px2rem(27) px2rem(45);

    .icon {
        position: absolute;
        margin-top: px2rem(27);
        height: px2rem(70);
        width: px2rem(100);
        bg-image('../../assets/images/头条');
        background-size: 100% 100%;
    }

    .vux-marquee {
        height: px2rem(100) !important;
        text-align: left;
        margin-left: px2rem(150);

        .scrollinfo {
            padding-top: px2rem(18);

            .redText {
                color: #ff5900;
            }
        }
    }
}

.gray {
    background-color: #f0f0f0;
    width: 100%;
    height: px2rem(20);
}

.headTitleBox {
    background-color: #ffffff;
    width: 100%;
    height: px2rem(520);

    .headTitle {
        font-size: px2rem(28);
        color: #333;
        padding-top: px2rem(59);

        span {
            text-align: center;
            font-size: px2rem(22);
            margin-right: px2rem(10);
            color: #fff;
            background-color: #f97140;
            width: px2rem(97);
            height: px2rem(36);
            border-radius: px2rem(5);
        }
    }
}

.bottomDiv {
    display: flex;
    flex-direction: row;
    padding: px2rem(5) px2rem(10) px2rem(30) px2rem(10);

    div {
        flex: 1;
        height: px2rem(60);
        width: 33%;
        text-align: center;

        .title {
            font-size: px2rem(24);
            color: #838383;
        }

        .desc {
            margin-top: px2rem(10);
            font-size: px2rem(24);
            color: #f3a049;
        }
    }
}

.RangeBox {
    padding: px2rem(20) px2rem(70) px2rem(20) px2rem(70);

    p {
        font-size: px2rem(24);
        color: #333;

        span {
            font-size: px2rem(60);
            font-weight: bold;
            color: #ff7f5b;
            margin-right: px2rem(15);
        }
    }

    .vux-range-input-box {
        margin: px2rem(30) px2rem(0) px2rem(50) px2rem(0) !important;

        .range-bar {
            background-color: #f0f0f0;
            height: px2rem(10) !important;
            border-radius: px2rem(5);
        }

        .range-quantity {
            background-color: #ffa414;
        }

        .range-handle {
            top: px2rem(-30) !important;
            width: px2rem(58);
            height: px2rem(58);
            border: transparent solid px2rem(5);
            background: transparent;
            box-shadow: none;

            &:after {
                content: '';
                position: absolute;
                top: px2rem(13);
                left: px2rem(-5);
                width: px2rem(26);
                height: px2rem(26);
                border: #ffb323 solid px2rem(5);
                background: #fff;
                border-radius: 50%;
            }
        }

        .range-min {
            top: px2rem(-30);
            left: px2rem(-10);
            font-size: px2rem(24);
        }

        .range-max {
            top: px2rem(-30);
            right: px2rem(0);
            font-size: px2rem(24);
        }
    }

    .apply {
        margin-top: px2rem(46);
        display: flex;
        height: px2rem(80);
        background-color: #ffb323;
        border-radius: px2rem(5);
        color: #fff;
        font-size: px2rem(34);
        align-items: center;
        justify-content: center; /* 水平居中 */
    }
}
</style>
