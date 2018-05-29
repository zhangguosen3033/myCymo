<template>

    <div class="contentDiv">
        <div class="topContentXy" :class="wrapClass">
            <div class="head">
                <span class="headIcon" @click="iconBack"></span>
                <p class="productName">{{detailData.productName}}</p>
            </div>
            <div class="loanNum">
                <p class="num">
                    <span class="loanNum">{{detailData.loanQuotaEnd}}</span>万
                </p>
                <p class="desc">贷款金额</p>
            </div>
        </div>

        <div class="info">
            <div class="item">
                <span class="infoImg"></span>
                <p class="infoNum" v-if="detailData.monthRateEnd > 0">{{detailData.monthRateStart}}-{{detailData.monthRateEnd}}%</p>
                <p class="infoNum" v-else>0</p>
                <p class="infoDesc">月利率</p>
            </div>
            <div class="item">
                <span class="infoImg infoImgTerm"></span>
                <p class="infoNum">{{detailData.loanTermStart}}-{{detailData.loanTermEnd}}月</p>
                <p class="infoDesc">贷款期限</p>
            </div>
            <div class="item">
                <span class="infoImg infoImgData"></span>
                <p class="infoNum">{{detailData.lendTimeStart}}-{{detailData.lendTimeEnd}}天</p>
                <p class="infoDesc">放款时间</p>
            </div>
        </div>

        <div class="introduceDiv">
            <div class="introduceItem">
                <p class="city">产品城市：</p>
                <p class="cityDesc">{{detailData.productCity}}</p>
            </div>
            <div class="introduceItem">
                <p class="city">还款方式：</p>
                <p class="cityDesc">{{detailData.repaymentMode}}</p>
            </div>
            <div class="introduceItem">
                <p class="city">提前还款：</p>
                <p class="cityDesc">{{detailData.isRepayment == 1 ? '是' : '否'}}</p>
            </div>

        </div>

        <div class="Conditions">
            <span class="logo"></span>
            <p class="conditionsTitle">申请条件</p>
            <div class="itemInfoWrap" v-for="item in detailData.conditions" :key="item">
                <p class="infoDetail">{{item}}</p>
            </div>
        </div>

        <div class="Conditions">
            <span class="logo"></span>
            <p class="conditionsTitle">所需材料</p>
            <div class="itemInfoWrap" v-for="item in detailData.materials" :key="item">
                <p class="infoDetail">{{item}}</p>
                <!-- <p class="infoDetail">9812839129839012890390hsdfjsafj万一贼长怎么办万一贼长怎么办呢万一贼长怎么办呢万一贼长怎么办呢万一贼长怎么办呢万一贼长怎么办呢呢klljkaJDKJA哈哈哈哈 长坝</p> -->
            </div>
        </div>

        <div class="applyRecord">
            <span class="applylogo"></span>
            <p class="applyRecordTitle">申请记录</p>
            <div class="applyRecordItem" v-for="(item,index) in applyRecord" :key="index">
                <span class="left">{{item.applyName}} {{item.applyPhone}}</span>
                <span class="right">{{item.gmtCreate}}</span>
                <p class="infoDetail">贷款金额：
                    <span>{{item.intentAmount}}万</span>
                </p>
            </div>

            <p class="recordNone" v-if="applyRecord.length < 1">暂无申请记录</p>
        </div>

        <p class="apply" @click="goApply()">申请贷款</p>

    </div>

</template>

<script>
import { getProductDetail, getCaseLoanRecord } from '../../api/productApi'
export default {
  components: {},
  data() {
    return {
      detailData: {},
      applyRecord: [],
      caseId: '',
      productId: '',
      productType: ''
    }
  },
  computed: {

      wrapClass: function(){
          if(this.productType === '赎楼'){
              return 'topContentSl'
          }else if(this.productType === '抵押'){
              return 'topContentDy'
          }else{
              return 'topContentXy'
          }
      }
  },
  created() {
    this.caseId = this.$route.query.caseId
    this.productId = this.$route.query.productId
    this.productType = this.$route.query.productType
  },
  mounted() {
    this.getProductDetail()
    this.getRecordList()
  },
  methods: {
    getProductDetail() {
      let params = {
        productId: this.productId,
        caseId: this.caseId,
        type: this.productType
      }
      getProductDetail(params, res => {
        if (res.status == 200) {
          this.detailData = res.data
        }
      })
    },
    getRecordList() {
      let params = {
        productId: this.productId,
        caseId: this.caseId
      }
      getCaseLoanRecord(params, res => {
        if (res.status == 200) {
          this.applyRecord = res.data
        } else {
          this.$vux.toast.text('请求失败')
        }
      })
    },
    iconBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="stylus"  type="text/stylus" rel="stylesheet/stylus" >
@import '../../common/stylus/pxrem.styl';

.contentDiv {
    width: 100%;
    background-color: #f0f0f0;

    .topContentXy {
        width: 100%;
        height: px2rem(364);
        background-color: #fff;
        bg-image('../../assets/images/pro_xyd');
        background-size: 100% 100%;

        &.topContentSl {
            bg-image('../../assets/images/pro_yx');
            background-size: 100% 100%;
        }

        &.topContentDy {
            bg-image('../../assets/images/pro_dy');
            background-size: 100% 100%;
        }

        .head {
            z-index: 100;
            width: 100%;
            height: px2rem(90);

            .headIcon {
                position: absolute;
                left: px2rem(30);
                top: px2rem(27);
                width: px2rem(30);
                height: px2rem(30);
                bg-image('../../assets/images/right_arrow_white');
                background-size: 100% 100%;
            }

            .productName {
                position: absolute;
                color: #fff;
                padding-top: px2rem(20); // 上线padding一致  垂直居中
                padding-bottom: px2rem(20);
                left: px2rem(90);
                font-size: px2rem(36);
            }
        }

        .loanNum {
            width: 100%;
            padding-top: px2rem(20); // 上线padding一致  垂直居中
            padding-bottom: px2rem(20);

            .num {
                font-size: px2rem(50);
                color: #fff;
                height: px2rem(100);

                .loanNum {
                    font-size: px2rem(100);
                    font-weight: bolder;
                    color: #fff;
                }
            }

            .desc {
                margin-top: px2rem(30);
                font-size: px2rem(30);
                color: #fff;
            }
        }
    }

    .info {
        background-color: #fff;
        width: 100%;
        display: flex;

        .item {
            flex: 1;
            padding: px2rem(35) 0 px2rem(35) 0;

            .infoImg {
                float: left;
                display: inline-block;
                width: px2rem(40);
                height: px2rem(40);
                margin-left: px2rem(40);
                margin-top: px2rem(10);
                bg-image('../../assets/images/pro_icon1');
                background-size: 100% 100%;

                &.infoImgTerm {
                    bg-image('../../assets/images/pro_icon2');
                    background-size: 100% 100%;
                }

                &.infoImgData {
                    bg-image('../../assets/images/pro_icon3');
                    background-size: 100% 100%;
                }
            }

            .infoNum {
                text-align: left;
                margin-left: px2rem(100);
                font-size: px2rem(30);
            }

            .infoDesc {
                text-align: left;
                margin-left: px2rem(100);
                color: #999;
            }
        }
    }

    .introduceDiv {
        box-sizing: border-box;
        width: 100%;
        background-color: #fff;
        margin-top: px2rem(20);
        padding: px2rem(30) px2rem(30);

        .introduceItem {
            display: flex;

            .city {
                color: #999;
                font-size: px2rem(26);
                text-align: left;
                line-height: px2rem(50);
                white-space: nowrap;
            }

            .cityDesc {
                color: #646464;
                font-size: px2rem(26);
                line-height: px2rem(50);
            }
        }
    }

    .Conditions {
        box-sizing: border-box;
        width: 100%;
        background-color: #fff;
        margin-top: px2rem(20);
        padding: px2rem(30) px2rem(30);

        .logo {
            float: left;
            display: inline-block;
            height: px2rem(26);
            width: px2rem(6);
            margin-top: px2rem(8);
            background-color: #fe9f28;
        }

        .conditionsTitle {
            font-size: px2rem(30);
            text-align: left;
            margin-left: px2rem(26);
            line-height: px2rem(50);
        }

        .itemInfoWrap {
            background: #f7f8fa;
            padding: px2rem(30) 0;

            .infoDetail {
                padding: 0 px2rem(30) 0 px2rem(30);
                text-align: left;
                color: #646464;
                font-size: px2rem(26);
            }
        }
    }

    .applyRecord {
        box-sizing: border-box;
        width: 100%;
        background-color: #fff;
        margin-top: px2rem(20);
        padding: px2rem(30) px2rem(30) px2rem(120) px2rem(30); // 留出底部申请按钮高度

        .applylogo {
            float: left;
            display: inline-block;
            height: px2rem(26);
            width: px2rem(6);
            margin-top: px2rem(8);
            background-color: #fe9f28;
        }

        .applyRecordTitle {
            font-size: px2rem(30);
            text-align: left;
            margin-left: px2rem(26);
            line-height: px2rem(50);
        }

        .applyRecordItem {
            padding: px2rem(20) 0 px2rem(20) 0;
            width: 100%;
            border-bottom: solid px2rem(1) #f0f0f0;
            color: #646464;
            text-align: left;
            font-size: px2rem(26);

            .left {
            }

            .right {
                float: right;
            }

            .infoDetail {
                margin-top: px2rem(20);

                span {
                    color: #fc5664;
                }
            }
        }

        .recordNone {
            font-size: px2rem(28);
            line-height: px2rem(90);
            color: #888;
            text-align: center;
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