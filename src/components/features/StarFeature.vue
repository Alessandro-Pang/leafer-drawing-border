<!--
 * @Author: zi.yang
 * @Date: 2023-08-05 10:58:38
 * @LastEditors: zi.yang
 * @LastEditTime: 2023-08-06 00:33:48
 * @Description: 星型
 * @FilePath: /vue-project/src/components/features/StarFeature.vue
-->
<script setup>
import BaseInput from '../BaseInput.vue';
import { reactive, watch  } from 'vue';

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
    config.points = node.points;
    config.innerRadius = node.innerRadius * 100;
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
      style="width: 54px"
      class="zy-mr-10"
      v-model.trim="config.points"
      type="number"
      :min="3"
      @input="handleChangeProp('points', $event)"
      label="顶点数"
    ></base-input>

    <base-input
      style="width: 54px"
      v-model.trim="config.innerRadius"
      :min="0"
      :max="100"
      type="number"
      @input="handleChangeProp('innerRadius', (+$event) / 100)"
      label="内半径"
    ></base-input>
  </div>
</template>

<style scoped></style>
