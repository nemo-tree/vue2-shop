<template lang="html">
    <mt-swipe :auto="4000" v-if='swiperData'>
      <mt-swipe-item v-for="k in swiperData" :key="k.id">
        <router-link :to="{ name: '详情页'}">
          <img :src="k.imgPath">
        </router-link>
      </mt-swipe-item>
    </mt-swipe>

</template>

<script>
export default {

  props:['swiperData']

}
</script>

<style lang="less" scoped>

.mint-swipe {
  width: 100%;
  height:50vw;
  a,img {
    display: block;
    width: 100%;
    height:100%;
  }
}
</style>
