<template>
  <div class="singer">
    <ListView :data="singers" @select="selectSinger"></ListView>
    <router-view></router-view>
  </div>
</template>
<script>
import {getSingerList} from 'api/singer'
import Singer from 'common/js/singer'
import {ERR_OK} from 'api/config'
import ListView from 'base/listView/listView'
import {mapMutations} from 'vuex'

const HOT_NAME = '热门'
const HOT_NAME_LEN = 10

export default{
  data () {
    return {
      singers: []
    }
  },
  created () {
    this._getSingerList()
  },
  methods: {
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    selectSinger (singer) {
      this.$router.push({path: `/singer/${singer.id}`})
      this.setSinger(singer)
    },
    _getSingerList () {
      getSingerList().then(res => {
        console.log(res)
        if (res.code === ERR_OK) {
          this.singers = res.data.list
          this.singers = this._normalizeSinger(this.singers)
          console.log(this.singers)
        }
      })
    },
    _normalizeSinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_NAME_LEN) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      console.log(map)

      // 为了得到有序列表
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      console.log(ret)
      return hot.concat(ret)
    }
  },
  components: {
    ListView
  }

}
</script>
<style scoped lang="scss" type="text/scss">
.singer{
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
