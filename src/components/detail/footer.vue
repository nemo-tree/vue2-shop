<template lang="html">
  <footer class="footer">
    <router-link :to="{name:'首页'}" class="footer-index">
      <i class="icon-index"></i>
    </router-link>
    <router-link  :to="{name:'购物车页'}" class="footer-gocar">
      <i class="icon-car"></i>
      <span v-if="count">{{count}}</span>
    </router-link>
    <span class="footer-addcar" @click="addIntoCar">
      加入购物车
    </span>
  </footer>
</template>

<script>
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
   computed:{

     count(){
       //页面刷新后 数据会消失,解决:加判断
       if(this.$store.state.detail.count=='') {
          this.$store.commit('CHANGE_COUNT');
       }
       return this.$store.state.detail.count
     },
     productDatasView(){
       return this.$store.state.detail.productDatas.view
     },
     colSelected(){
       return this.$store.state.detail.colSelected
     },
     sizeSelected(){
       return this.$store.state.detail.sizeSelected
     }
   },

   methods:{
     addIntoCar(){
      //  mint-ui的弹出式提示框
      const product = [{
        title:this.productDatasView.title,
        price:this.productDatasView.price,
        size:this.productDatasView.chose[this.sizeSelected].size,
        col:this.productDatasView.chose[this.colSelected].col,
        id:this.productDatasView.id,
        imgPath:this.$store.state.detail.productDatas.swiper[0].imgSrc,
        choseBool:false
      }];


       MessageBox
         .confirm
           (
             `商品名称:${product[0].title}</br>`+
             `价格:${product[0].price}</br>`+
             `规格:${product[0].size}</br>`+
             `颜色:${product[0].col}</br>`+
             `商品ID:${product[0].id}</br>`
           )
         .then(action => {      //点击成功执行这里的函数
           this.$store.dispatch('setLocalCount',true);
           this.$store.dispatch('addCarList',product);

            Toast({
              message:'添加成功',
              duration:1000
            });
         },function(err){
       });
     }
   }
}
</script>

<style lang="less" scoped>
@import '../../assets/fz.less';
@import '../../assets/index/style.css';

.footer {
  width: 100%;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  height: 14vw;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  -moz-user-select:none;-webkit-user-select:none;
  .bt();
  .footer-index,
  .footer-gocar,
  .footer-addcar{
    text-align: center;
  }

  .footer-index {
    -webkit-flex: 3;
    -ms-flex: 3;
    flex: 3;
    line-height: 14vw;
    height: 14vw;
    padding-top: 1.5vw;
    border-right-color: #f7f7f7;
    border-right-style: solid;
    .fz(border-right-width,1);

    i {
      .fz(font-size,45);
    }
    &:active {
      background-color: #f1f1f1;
    }
  }


  .footer-gocar {
    position: relative;
    -webkit-flex: 3;
    -ms-flex: 3;
    flex: 3;
    height: 14vw;
    line-height: 14vw;
    padding-top: 1.6vw;
    span {
      height: 5.5vw;
      width: 5.5vw;
      line-height: 5.5vw;
      position: absolute;
      top: .5vw;
      right: 5.5vw;
      background-color: @cl;
      border-radius: 50%;
      color: #fff;
      .fz(font-size,24);
    }

    &:active {
      background-color: #f1f1f1;
    }
    i {
      .fz(font-size,48);
    }
  }

  .footer-addcar {
    -webkit-flex: 6;
    -ms-flex: 6;
    flex: 6;
    line-height: 14vw;      height: 14vw;

    color:#fff;
    background-color: @cl;
    letter-spacing: .2vw;
    &:active {
      background-color: #ff7d00;
    }
  }
}
</style>
