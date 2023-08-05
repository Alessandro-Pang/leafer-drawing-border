<!--
 * @Author: zi.yang
 * @Date: 2023-08-05 10:58:08
 * @LastEditors: zi.yang
 * @LastEditTime: 2023-08-05 18:37:10
 * @Description: 多边形
 * @FilePath: /vue-project/src/components/features/PolygonFeature.vue
-->
<script setup>
import BaseInput from '../BaseInput.vue';
import { reactive, watch } from 'vue';

const props = defineProps({
  leafer: Object,
  node: Object,
});

const config = reactive({});

let timerId = null;
// 简单的防抖功能，避免移动元素导致频繁刷新
function setConfig(node) {
  if (timerId) clearTimeout(timerId);
  timerId = setTimeout(() => {
    if (!node) return;
    config.sides = node.sides;
    clearTimeout(timerId);
  }, 60);
}
watch(props.node, (value) => setConfig(value));

function handleChangeProp(prop, value) {
  props.node.set({ [prop]: value });
}
</script>

<template>
  <div flex>
    <div class="zy-mr-5">特性</div>

    <base-input
      style="width: 60px"
      v-model.trim="config.sides"
      :min="3"
      type="number"
      @input="handleChangeProp('sides', $event)"
      label="边数"
    ></base-input>
  </div>
</template>

<style scoped></style>