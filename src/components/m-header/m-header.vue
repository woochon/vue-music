<template>
  <div class="m-header">
    <h1 class="text">Woochon Music</h1>
  </div>
</template>
<script>
export default{
  data () {
    return {

    }
  }
}
</script>
<style scoped lang="scss" type="css/scss">
  @import  '../../common/scss/index.scss';
  @import  '../../common/scss/variable.scss';
  .m-header{
    position: relative;
    height: 44px;
    text-align: center;
    background-color: $color-background;
    font-size: 0;
    .text{
      display: inline-block;
      font-size: $font-size-medium;
      line-height: 44px;
      color: $color-theme;
    }
  }

</style>
