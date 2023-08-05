<!--
 * @Author: zi.yang
 * @Date: 2023-08-05 10:58:06
 * @LastEditors: zi.yang
 * @LastEditTime: 2023-08-05 18:37:23
 * @Description: 矩形
 * @FilePath: /vue-project/src/components/features/RectFeature.vue
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
    config.cornerRadius = node.cornerRadius;
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
    <div class="zy-mr-5">圆角</div>

    <base-input
      style="width: 60px"
      v-model.trim="config.cornerRadius"
      type="number"
      @input="handleChangeProp('cornerRadius', $event)"
      label="半径"
    ></base-input>
  </div>
</template>

<style scoped></style>
