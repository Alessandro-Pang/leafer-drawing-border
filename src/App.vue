<!--
 * @Author: zi.yang
 * @Date: 2023-07-04 11:24:27
 * @LastEditors: zi.yang
 * @LastEditTime: 2023-08-05 19:59:44
 * @Description: 
 * @FilePath: /vue-project/src/App.vue
-->
<script setup>
import { svg } from './utils'
import { NMessageProvider } from 'naive-ui'
import ItemPanel from './components/ItemPanel.vue';
import DetailPanel from './components/DetailPanel.vue';
import { nextTick, ref } from 'vue';
import { createGraph } from './graph';

const leafer = ref(null);
const activeNode = ref(null);
nextTick(() => {
  leafer.value = createGraph('graph-container');
  leafer.value.on('click', (event) => {
    if(event.target.isLeafer) return 
    activeNode.value = event.target;
  });
});

function handleOpenGitHub(){
  window.open('https://github.com/Alessandro-Pang/leafer-drawing-border')
}
</script>

<template>
  <n-message-provider>
    <header class="header">Leafer Drawing Board</header>
    <div class="github-icon" @click="handleOpenGitHub">
      <img :src="svg('github')" alt="svg">
    </div>
    <main class="main">
      <item-panel :leafer="leafer"></item-panel>
      <div id="graph-container"></div>
      <keep-alive>
        <detail-panel v-if="activeNode?.innerId" :key="activeNode.innerId" :leafer="leafer" :node="activeNode"></detail-panel>
      </keep-alive>
    </main>
  </n-message-provider> 
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.header {
  height: 6rem;
  line-height: 6rem;
  padding-left: 2rem;
  color: #fff;
  font-size: 3rem;
  font-weight: 600;
  overflow: hidden;
  text-shadow: 0.5rem 0.4rem 0.2rem rgba(0, 0, 0, 0.4);
  background-image: linear-gradient(to right bottom, #72e3fd, #0770f7);
}
.github-icon{
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
}

.main {
  height: calc(100% - 60px);
}

#graph-container {
  height: 100%;
  width: 100%;
}
</style>
