<!--
 * @Author: zi.yang
 * @Date: 2023-07-04 11:24:27
 * @LastEditors: zi.yang
 * @LastEditTime: 2023-07-05 21:10:54
 * @Description: 
 * @FilePath: /vue-project/src/App.vue
-->
<script setup>
import { nextTick } from 'vue'
import { createGraph } from './graph';
nextTick(()=> createGraph("main"))
</script>

<template>
  <main id="main"></main>
</template>

<style scoped>
#main {
  height: 100%;
}
</style>
