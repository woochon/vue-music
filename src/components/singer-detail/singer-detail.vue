<template>
  <transition name="slide">
    <div class="singer-detail">

    </div>
  </transition>
</template>
<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'

export default {
  computed: {
    ...mapGetters(['singer'])
  },
  created () {
    console.log(this.singer)
    this._getDetail()
  },
  methods: {
    _getDetail () {
      if (!this.singer.id) {
        this.$router.push({path: '/singer'})
        return
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          console.log(res.data.list)
        }
      })
    }
  }
}
</script>
<style scoped lang="scss" type="text/scss">
  @import '../../common/scss/variable';
  .singer-detail{
    position: fixed;
    z-index:100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: $color-background;
  }
  .slide-enter-active,.slide-leave-active{
    transition:all 0.3s
  }
  .slide-enter,.slide-leave-to{
    transform: translate3d(100%,0,0);
  }
</style>
