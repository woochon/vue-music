<template>
  <div>
    <ul>
      <li v-for="(item,index) in data" :key="index">
        <h2>{{item.title}}</h2>
        <ul>
          <li v-for="(item1,index1) in item.items" :key="index+index1">
            <img :src="item.vatar" alt="">
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props:{
      data:{
        type:Array,
        require:true
      }
    }
  }
</script>
<style scoped lang="scss" type="text/scss"></style>
