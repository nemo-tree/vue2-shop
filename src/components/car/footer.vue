<template lang="html">
  <footer class="footer">

    <div class="footer-result">
      <p>共{{count}}件 金额：</p>
      <p><span>{{allpay}} </span>元</p>
    </div>
    <router-link :to="{ name: '分类页'}" class="footer-goon" >
      继续购物
    </router-link>
    <a class="footer-pay" @click="goPay">
      去结算
    </a>
  </footer>

</template>

<script>

export default {
  computed:{
    // 勾选的商品数量
    count(){
      // 如果已选择列表为空 就返回0
      if(this.$store.getters.selectedList==undefined) {
        return 0
      }else {

        return this.$store.getters.selectedList.length
      }
    },

    //勾选的商品的价格总和
    allpay(){
      let all = 0;
      // 如果有勾选商品,计算总价格
      if(this.$store.getters.selectedList) {

        for (let i = 0; i < this.$store.getters.selectedList.length; i++) {

          all += this.$store.getters.selectedList[i].price;

        }

      }
      // 没有勾选 即为0
      return all

    }
  },

  methods:{
    //点击跳转到支付页
    goPay(){

        // 如果有选择商品才能跳转
        if(this.$store.getters.selectedList.length) {
          // 保存+缓存选择的商品 ,在支付页能用到
          this.$store.dispatch('setSelectedList')
          this.$router.push({name:'支付页'})


      } else {

        alert('你还没选择商品')

      }

    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/fz.less';

  .footer {
    width: 100%;
    height: 16vw;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    .footer-result,a {
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      text-align: center;
    }

    .footer-result {
      p {
        .fz(font-size,24);
        color: #999;
      }

      p:last-of-type {

        padding: 1vw 0 0 1vw;
        span {
          color:@cl;
          .fz(font-size,42);
        }
      }
    }

    .footer-goon {
      background-color: #F4F4F4;
      line-height: 16vw;
    }

    .footer-pay {
      background-color: @cl;
      line-height: 16vw;
      color:#fff;
    }

  }
</style>
