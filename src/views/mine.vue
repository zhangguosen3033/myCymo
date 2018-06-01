<template lang="html">

<div class="content">
 <div class="headDiv">
     <div class="headBox">
        <div class="leftBox" @click="goLogin()">
            <p class="login">{{userName}}</p>
            <p class="logoTitle">房金云在手，银行贷款无忧</p>
        </div>
        <div class="rightBox">
            <div class="headIconDiv">
                 <img :src= "headIcon" class="headIcon"/>
            </div>
            <img src = "../assets/images/arrow_right@2x.png" class="rightIcon"/>
        </div>
     </div>
    <div class="loanDiv">
        <div class="item">
            <img src= "../assets/images/wait_sign@2x.png" class="image"/>
            <p class="title">待签章</p>
        </div>
            <div class="item item2">
            <img src= "../assets/images/wait_pay@2x.png" class="image"/>
            <p class="title">待付服务费</p>
        </div>
            <div class="item item3">
            <img src= "../assets/images/has_complete@2x.png" class="image"/>
            <p class="title">已完成</p>
        </div>
            <div class="item item4">
            <img src= "../assets/images/all_order@2x.png" class="image"/>
            <p class="title">全部贷款</p>
        </div>   
    </div>
 </div>

<!-- 利用cell组件 显示信息 -->
<cell :cellData='myBankCard' :isLogined='isLogined'></cell>
<cell :cellData='payBill' :tel='tel' :isLogined='isLogined'></cell>
<cell :cellData='personInfo' :isLogined='isLogined'></cell>
<cell :cellData='hr' :isLogined='isLogined'></cell>
<cell :cellData='myCollect' :isLogined='isLogined'></cell>
<cell :cellData='invite' :isLogined='isLogined'></cell>
<cell :cellData='applyRecord ' :isLogined='isLogined'></cell>

</div>

</template>
<script>
import { getUserInfo } from "./../api/productApi.js";
import cell from "../components/mine/cell.vue";
export default {
  components: {
    cell
  },
  data() {
    return {
      isLogined: false,
      headIcon: "../assets/images/my_pic@2x.png",
      userName: "立即登录",
      tel: "",
      myBankCard: {
        text: "我的银行卡",
        path: "/myCard/cardList"
      },
      payBill: {
        text: "支付账单",
        path: "/payBill/payBillList"
      },
      personInfo: {
        text: "个人资料",
        path: "/personal/personalInfo"
      },
      myCollect: {
        text: "我的收藏",
        path: "/collection/collection"
      },
      invite: {
        text: "邀请注册",
        path: "/invitation/invitation"
      },
      applyRecord: {
        text: "申请记录",
        path: "/myloan/recordItem"
      },
      hr: {
        text: "智能客服",
        path: "/setting/serviceRobot"
      }
    };
  },
  mounted() {},
  created() {
    this.isLogined = localStorage.getItem("userToken") ? true : false;
    if (this.isLogined) {
      //   console.log("已经登陆过");
      this.getUserInfoFuc();
    } else {
    }
  },
  methods: {
    getUserInfoFuc() {
      getUserInfo(null, res => {
        if (res.status == 200) {
          if (res.data.result == 0) {
            let dataContent = res.data.data;
            var transformName = "";
            if (dataContent.name) {
              var transformName = dataContent.name;
            }
            //	                    let transformPhone = dataContent.telephone;
            this.userName = transformName || "亲爱的用户";
            localStorage.setItem("userNameLocal", dataContent.name);

            // //加载其他信息
            // this.userPhone = dataContent.telephone;
            this.tel = dataContent.telephone;
            this.headIcon =
              dataContent.portrait || "../assets/images/my_pic@2x.png";
            // this.getLoanInfoData();
          } else {
            this.$vux.toast.text(res.data.message);
          }
        }
      });
    },
    goLogin() {
      this.isLogined = localStorage.getItem("userToken") ? true : false;
      if (this.isLogined) {
        //设置界面
      } else {
        //未登陆
        this.$router.push({
          path: "/login/login"
        });
      }
    }
  }
};
</script>
<style scoped lang="stylus"  type="text/stylus" rel="stylesheet/stylus" >
@import './../common/stylus/pxrem.styl';

.content {
    background-color: #fff;
    overflow hidden

    .headDiv {
        z-index: 100;
        width: 100%;
        height: px2rem(450);
        bg-image('../assets/images/has_sign_back');
        background-size: 100% 100%;

        .headBox {
            position: relative;
            padding: px2rem(100) px2rem(50) px2rem(40) px2rem(30);
            height: px2rem(161);

            .leftBox {
                padding: 0 px2rem(300) 0 0;
                height: 100%;

                .login {
                    padding-top: px2rem(20);
                    text-align: left;
                    font-size: px2rem(52);
                    font-weight: bolder;
                    color: #282828;
                }

                .logoTitle {
                    left: px2rem(30);
                    bottom: px2rem(35);
                    text-align: left;
                    font-size: px2rem(30);
                    color: #999;
                }
            }

            .rightBox {
                display: flex;
                position: absolute;
                top: px2rem(100);
                right: px2rem(50);
                padding: 0 px2rem(50) 0 px2rem(200);
                height: px2rem(160);

                .rightIcon {
                    margin: auto;
                    width: px2rem(17);
                    height: px2rem(30);
                }

                .headIconDiv {
                    display: flex;
                    width: px2rem(160);
                    height: px2rem(160);
                    margin-right: px2rem(20);
                    bg-image('../assets/images/avatar_bg');
                    background-size: 100% 100%;

                    .headIcon {
                        margin: auto;
                        border-radius: 50%;
                        width: px2rem(125);
                        height: px2rem(125);
                    }
                }
            }
        }

        .loanDiv {
            display: flex;
            width: 100%;
            height: px2rem(150);
            background-color: #fff;

            .item {
                width: 25%;

                .image {
                    margin: auto;
                    padding-top: px2rem(20);
                    width: px2rem(55);
                    height: px2rem(55);
                }

                .title {
                    color: #282828;
                    margin-top: px2rem(20);
                }
            }
        }
    }
}
</style>