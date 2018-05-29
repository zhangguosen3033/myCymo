<template lang="html">

<div class="content">
 <div class="headDiv">
     <div class="headBox">
        <div class="leftBox">
            <p class="login">立即登录</p>
            <p class="logoTitle">房金云在手，银行贷款无忧</p>
        </div>
        <div class="rightBox">
            <div class="headIconDiv">
                 <img src= "../assets/images/my_pic@2x.png" class="headIcon"/>
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

 <div class="listDIv">
   <ul >
       <li class="list">
           <p>我的银行卡</p>
           <img src = "../assets/images/arrow_right@2x.png"/>
       </li>
        <li class="list">
           <p>支付账单</p>
           <img src = "../assets/images/arrow_right@2x.png" />
       </li>
       <li class="list">
           <p>个人资料</p>
           <img src = "../assets/images/arrow_right@2x.png" />
       </li>
       <li class="list">
           <p>智能客服</p>
           <img src = "../assets/images/arrow_right@2x.png" />
       </li>
   </ul>
   </div>
</div>



</template>
<style scoped lang="stylus"  type="text/stylus" rel="stylesheet/stylus" >
@import './../common/stylus/pxrem.styl';

.content {
    background-color: #fff;

    .headDiv {
        z-index 100
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
                padding: 0 0 0 px2rem(200);
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
    .listDIv {
        width: 100%;
        border-top : solid #f0f0f0 px2rem(2);

        .list {
            width: 100%;
            height: px2rem(120);
            border-bottom: solid #f0f0f0 px2rem(1);

            p {
                position absolute
                margin-top px2rem(40) 
                font-size: px2rem(30);
                font-weight: bolder;
                text-align: left;
                margin-left: px2rem(30);
            }
            img {
                float: right;
                margin-top px2rem(40)
                margin-right: px2rem(30);
                width: px2rem(17);
                height: px2rem(31);
            }
        }
    }
}
</style>