<!--
 * @Author: zi.yang
 * @Date: 2023-08-05 10:58:08
 * @LastEditors: zi.yang
 * @LastEditTime: 2023-08-05 19:20:52
 * @Description: 圆形
 * @FilePath: /vue-project/src/components/features/EllipseFeature.vue
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
  config.startAngle = value.startAngle;
  config.endAngle = value.endAngle;
  config.innerRadius = value.innerRadius * 100
}
watch(props.config, (value) => setConfig(value));

function handleChangeProp(prop: string, value: string) {
  let newVal = prop === 'innerRadius' ? +(value) / 100 : +value
  props.node.set({ [prop]: newVal });
}
</script>

<template>
  <div flex>
    <div class="zy-mr-5">角度</div>

    <base-input
      style="width: 54px"
      class="zy-mr-10"
      v-model.trim="config.startAngle"
      type="number"
      :min="0"
      :max="360"
      @input="handleChangeProp('startAngle', $event)"
      label="起始角度"
    ></base-input>

    <base-input
      style="width: 54px"
      class="zy-mr-10"
      v-model.trim="config.endAngle"
      type="number"
      :min="0"
      :max="360"
      @input="handleChangeProp('endAngle', $event)"
      label="结束角度"
    ></base-input>

    <base-input
      style="width: 54px"
      v-model.trim="config.innerRadius"
      type="number"
      :min="0"
      :max="100"
      @input="handleChangeProp('innerRadius', $event)"
      label="内半径"
    ></base-input>
  </div>
</template>

<style scoped></style>
