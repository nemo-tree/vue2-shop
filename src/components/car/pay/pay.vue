<template lang="html">

  <div class="pay">
    <v-header>
      <h1 slot="title">支付订单</h1>
    </v-header>

    <div class="pay-address">
      <div>
        <p class="main-address-per">收货人:<span>王先生</span></p>
        <p class="main-address-tel">15985698749</p>
      </div>
      <p>收货地址:<span>河南省郑州市中原区秦岭路8号院59号单元28层15号东户第三家</span></p>
    </div>

    <div class="pay-product">
      <ul v-if="!confirm">
        <li v-for="k in carList">
          <a>
            <img :src="k.imgPath" alt="">
            <div>
              <h2><span style="color:#ee7150"> {{k.size}} - {{k.col}} </span>- {{k.title}} -</h2>
              <p>{{k.price}} 元</p>
            </div>
          </a>
        </li>
      </ul>

      <!-- 支付成功后的提示 -->
      <div class="pay-confirm" v-else>
        支付成功!!!</br>
        当页面数据清空</br>
        购物车列表重新设置
      </div>
    </div>
    <h3 class="pay-allpay">总需要支付 : <i>￥</i><span>{{allpay}}</span></h3>
    <footer class="pay-footer" ontouchstrat="" @click="payConfirm">
      <span>立即支付</span>
    </footer>


  </div>
</template>

<script>
import Util from '../../../util/common'
import Header from '@/common/_header.vue'
import {
  MessageBox
} from 'mint-ui';
export default {
  components: {
    'v-header': Header
  },
  data() {
    return {
      confirm: ''
    }
  },
  mounted() {
// 防止页面刷新后数据丢失
    if (this.$store.state.detail.selectedList == '') {
      this.$store.commit('SET_SELECTEDLIST')
    }
  },
  computed: {

    //所有商品列表
    carList() {

      return this.$store.state.detail.selectedList
    },

    // 商品价格总和
    allpay() {
      let allpay = 0;
      for (let i = 0; i < this.$store.state.detail.selectedList.length; i++) {
        allpay += this.$store.state.detail.selectedList[i].price
      }
      return allpay
    }
  },

  methods: {
    payConfirm() {
      if (this.carList) { //还未提交了订单,数据还未清空
        MessageBox
          .confirm(
            `确定支付${this.allpay}元`
          )
          .then(action => { //点击成功执行这里的函数
            this.confirm = false;
            this.$store.commit('SET_LOADING', true);
            this.$store.dispatch('resetCarList'); //重置购物车（用unSelectedList替换）
            this.$store.dispatch('resetCount'); //重置购物车数量
            setTimeout(() => {
              this.$store.commit('SET_LOADING', false); //关闭loading
              this.confirm = true; //支付完成后切换视图
            }, 300)
          }, function(err) {
            //点击取消执行这里的函数
          });
      } else { //提交了订单,数据清空
        alert('请勿重复提交订单')
      }

    }
  }

}
</script>

<style lang="less" scoped>
@import '../../../assets/fz.less';
.pay {
    width: 100%;
    background-color: #F7F7F7;

    .pay-address {
        background-color: #fff;
        border-bottom: 1*10vw/75 solid #DEDEDE;
        padding: 30*10vw/75;

        > div {
            display: -webkit-flex;
            display: -ms-flex;
            display: flex;
            justify-content: space-between;

            p {
                color: #868686;
                .fz(font-size,32px);
            }
        }

        > p {
            .fz(font-size,28px);
            color: #868686;
            padding-top: 30*10vw/75;
            letter-spacing: 3*10vw/75;
            line-height: 45*10vw/75;
        }
    }
    .pay-product {
        background-color: #fff;
        height: 60vw;
        overflow: auto;

        li {
            a {
                display: -webkit-flex;
                display: -ms-flex;
                display: flex;
                box-sizing: border-box;
                padding: 20*10vw/75 30*10vw/75;
                color: #4D4D4D;
                .fz(font-size,30px);
                border-bottom: 1*10vw/75 solid #DEDEDE;

                > img {
                    display: block;
                    width: 2.5*10vw;
                    height: 2.5*10vw;
                }

                > div {
                    box-sizing: border-box;
                    padding-left: 50*10vw/75;
                    width: 70%;
                    h2 {
                        padding-top: 0.09*10vw;
                        overflow: hidden;
                        word-break: keep-all;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }

                    p {
                        text-align: right;
                        .fz(font-size,24px);
                        padding-top: 1.4*10vw;
                    }
                }
            }
        }
    }

    .pay-allpay {
        text-align: right;
        margin-top: 6vw;
        padding: 4vw 5vw;
        .fz(font-size,32px);
        color: #999999;
        background-color: #fff;
        i,
        span {
            color: @cl;
        }
    }

    .pay-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding-bottom: 4vw;
        span {
            display: block;
            width: 85%;
            background-color: #fd729c;
            border-radius: 1.3vw;
            color: #fff;
            font-size: 17px;
            padding: 4vw;
            margin: 0 auto;
            text-align: center;
            &:active {
                background-color: @cl;
            }
        }

    }

    .pay-confirm {
        padding: 20px 0;
        background-color: @cl;
        text-align: center;
        color: #fff;
        line-height: 30px;
        .fz(font-size,40);
    }
}
</style>
