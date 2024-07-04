<!--
 * @Author: zi.yang
 * @Date: 2023-08-05 10:58:06
 * @LastEditors: zi.yang
 * @LastEditTime: 2023-08-05 18:37:23
 * @Description: 矩形
 * @FilePath: /vue-project/src/components/features/RectFeature.vue
-->
<script setup lang="ts">
import BaseInput from '../BaseInput.vue';
import { reactive, watch } from 'vue';
import {IUIInputData} from '@leafer-ui/interface';
const props = defineProps<{
  config: IUIInputData,
  node: IUIInputData,
}>();

const config = reactive({}) as IUIInputData;

// 简单的防抖功能，避免移动元素导致频繁刷新
function setConfig(value: IUIInputData) {
  if (!value) return;
  config.cornerRadius = value.cornerRadius;
}
watch(props.config, (value) => setConfig(value));

function handleChangeProp(prop: string, value: string) {
  props.node.set({ [prop]: value });
}

</script>

<template>
  <div flex>
    <div class="zy-mr-5">圆角</div>

    <base-input
      style="width: 60px"
      v-model="config.cornerRadius"
      type="number"
      @input="handleChangeProp('cornerRadius', $event)"
      label="半径"
    ></base-input>
  </div>
</template>

<style scoped></style>
