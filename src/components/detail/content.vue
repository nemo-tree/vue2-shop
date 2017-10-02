<template lang="html">
  <section class="content">
    <div class="img-wrap" v-for="k in content">
      <img :src="k.imgSrc">
    </div>
  </section>

</template>

<script>
export default {
  computed:{
    content(){
      return this.$store.state.detail.productDatas.contentImgSrc
    }
  }
}
</script>

<style lang="less" scoped>
  .content {
    width: 100%;
    margin-top: 10px;
    border-top: 20px solid #F8FCFF;
    .img-wrap {
    height: 120vw;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
