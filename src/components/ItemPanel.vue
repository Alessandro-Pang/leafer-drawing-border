<!--
 * @Author: zi.yang
 * @Date: 2023-07-28 12:54:05
 * @LastEditors: zi.yang
 * @LastEditTime: 2023-08-05 19:55:50
 * @Description:
 * @FilePath: /vue-project/src/components/ItemPanel.vue
-->
<script setup>
import {nextTick, ref} from 'vue';
import {svg} from '@/utils'
import {NODE_SIZE} from '@/graph/constants';
import {createNodeItem} from '@/graph/item-wrapper';
import {DropEvent} from 'leafer-ui'

const props = defineProps({
  app: Object,
});

const items = ref([]);
items.value = [
  {label: '矩形', value: 'Rect'},
  {label: '圆形', value: 'Ellipse'},
  {label: '多边形', value: 'Polygon', sides: 6},
  {label: '星型', value: 'Star'},
];

function handleDragEndItem(event, item) {
  // const zoom = props.app.zoomLayer.scale;
  const appX = props.app.tree.x * -1
  const appY = props.app.tree.y * -1
  const x = event.x - NODE_SIZE.WIDTH / 2 + appY;
  const y = event.y - 60 - NODE_SIZE.HEIGHT / 2 + appX;
  createNodeItem(props.app, {tag: item.value, x, y, ...item});
}
</script>

<template>
  <ul class="item-panel--wrapper">
    <li
        draggable="true"
        v-for="(item, index) of items"
        :key="index"
        @dragend="handleDragEndItem($event, item)"
    >
      <img height="30" width="30" :src="svg(item.value)" :alt="item.label"/>
      <div>{{ item.label }}</div>
    </li>
  </ul>
</template>

<style scoped>
.item-panel--wrapper {
  position: fixed;
  left: 2rem;
  top: 8rem;
  width: 8rem;
  list-style-type: none;
  padding: 0;
  margin: 0;
  height: max-content;
  max-height: 100%;
  border-radius: 0.6rem;
  padding-top: 2rem;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.3);
  filter: drop-shadow(0 0 1.2rem rgba(255, 255, 255, 0.6));
}

.item-panel--wrapper li {
  margin-bottom: 12px;
  text-align: center;
  color: #333;
  font-size: 1.2rem
}
</style>
