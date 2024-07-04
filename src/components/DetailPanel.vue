<!--
 * @Author: zi.yang
 * @Date: 2023-07-29 18:46:56
 * @LastEditors: zi.yang
 * @LastEditTime: 2023-08-05 19:39:39
 * @Description:
 * @FilePath: /vue-project/src/components/detailPanel.vue
-->
<script setup lang="ts">
import {type Component, onMounted, reactive, ref} from 'vue';
import BaseInput from './BaseInput.vue';
import EllipseFeature from './features/EllipseFeature.vue';
import PolygonFeature from './features/PolygonFeature.vue';
import RectFeature from './features/RectFeature.vue';
import StarFeature from './features/StarFeature.vue';
import {NSlider, NColorPicker, useMessage} from 'naive-ui';
import {App, DragEvent} from 'leafer-ui'
import type {IUIInputData} from "@leaxfer-ui/interface";

const message = useMessage();

const props = defineProps<{
  app: App,
  node: IUIInputData,
}>();

// 注册组件
const featureComponent: { [key: string]: Component } = {
  EllipseFeature,
  PolygonFeature,
  RectFeature,
  StarFeature,
};
const featureName = ref('');
let config = reactive({}) as IUIInputData;

function setConfig(node: IUIInputData) {
  if (!node) return;
  config.x = node.x;
  config.y = node.y;
  config.rotation = node.rotation;
  config.width = node.width;
  config.height = node.height;
  config.opacity = node.opacity * 100;
  config.fill = node.fill;
  config.stroke = node.stroke;
  config.strokeWidth = node.strokeWidth;
  config.zIndex = node.zIndex;
  // 组件特性
  config.startAngle = node.startAngle;
  config.endAngle = node.endAngle;
  config.innerRadius = node.innerRadius;
  config.sides = node.sides;
  config.cornerRadius = node.cornerRadius;
  config.points = node.points;
}

// 编辑器的拖拽操作事件
props.app.editor.on(DragEvent.END, (dragEvent) => {
  const pointNode = dragEvent?.target;
  const editorNode = pointNode?.parent?.parent?.editor?.target;
  if (!editorNode) return;
  setConfig(editorNode)
})

onMounted(() => {
  setConfig(props.node)
  const component = props.node.tag + 'Feature';
  featureName.value = featureComponent[component] ? component : ''
})

// 设置节点属性
function handleChangeGraph(prop: string, value: string | number) {
  props.node.set({[prop]: value});
}

function handleClickCopy() {
  const node = props.node
  navigator.clipboard.writeText(JSON.stringify({...config, tag: node.tag}));
  message.success('已成功复制到剪切板！');
}
</script>

<template>
  <div class="detail-panel__wrapper">
    <div flex="main:justify">
      <h5 class="zy-mb-10" style="font-weight: 400">配置面板</h5>
      <button class="copy-btn" @click="handleClickCopy">复制属性</button>
    </div>
    <hr style="margin: 1.4rem 0 1.2rem 0"/>

    <div>位置和尺寸</div>
    <div class="zy-mt-15" flex>
      <span class="small-label">X:</span>
      <base-input
          v-model.trim="config.x"
          @input="handleChangeGraph('x', +$event)"
          type="number"
          style="width: 80px; margin-right: 4px"
      />
      <span class="small-label">Y:</span>
      <base-input
          v-model.trim="config.y"
          @input="handleChangeGraph('y', +$event)"
          type="number"
          style="width: 80px"
      />
    </div>
    <div class="zy-mt-15" flex>
      <span class="small-label">W:</span>
      <base-input
          v-model.trim="config.width"
          @input="handleChangeGraph('width', +$event)"
          type="number"
          style="width: 80px; margin-right: 4px"
      />
      <span class="small-label">H:</span>
      <base-input
          v-model.trim="config.height"
          @input="handleChangeGraph('height', +$event)"
          type="number"
          style="width: 80px"
      />
    </div>

    <div class="zy-mt-15" flex>
      <span class="small-label">R:</span>
      <base-input
          v-model.trim="config.rotation"
          @input="handleChangeGraph('rotation', +$event)"
          :min="-360"
          :max="360"
          type="number"
          style="width: 80px"
          label="旋转"
      />
      °
      <span class="small-label">Z:</span>
      <base-input
          v-model.trim="config.zIndex"
          @input="handleChangeGraph('zIndex', +$event)"
          type="number"
          style="width: 80px"
          label="层级"
      />
    </div>
    <hr/>
    <div flex>
      <div>不透明性</div>
      <n-slider
          v-model:value="config.opacity"
          :step="1"
          :max="100"
          class="zy-mr-5 zy-ml-5 w-100"
          @update:value="handleChangeGraph('opacity', +$event / 100)"
      />
      <base-input
          v-model="config.opacity"
          @input="handleChangeGraph('opacity', +$event / 100)"
          :min="0"
          :max="100"
          type="number"
          style="width: 46px"
      />
    </div>

    <hr/>
    <div flex>
      <div class="zy-mr-10">填充</div>
      <n-color-picker
          v-model="config.fill"
          :swatches="[
          '#FFFFFF',
          '#18A058',
          '#2080F0',
          '#F0A020',
          'rgba(208, 48, 80, 1)',
        ]"
          size="small"
          style="width: 50px; margin-right: 4px"
          @update:value="handleChangeGraph('fill', $event)"
      >
        <template #label></template>
      </n-color-picker>
    </div>

    <hr/>
    <div flex>
      <div class="zy-mr-10">线段</div>

      <n-color-picker
          v-model="config.stroke"
          :swatches="[
          '#FFFFFF',
          '#18A058',
          '#2080F0',
          '#F0A020',
          'rgba(208, 48, 80, 1)',
        ]"
          size="small"
          class="zy-mr-10"
          style="width: 50px"
          @update:value="handleChangeGraph('stroke', $event)"
      >
        <template #label></template
        >
      </n-color-picker>

      <base-input
          v-model.trim="config.strokeWidth"
          @input="handleChangeGraph('strokeWidth', $event)"
          type="number"
          style="width: 82px; margin-right: 4px"
          label="宽度"
      />
    </div>

    <hr/>
    <!-- 各类元素特性 -->
    <component
        v-if="featureName"
        :is="featureComponent[featureName]"
        :key="node.innerId"
        :node="props.node"
        :config="config"
    ></component>
  </div>
</template>

<style>
input.n-input__input-el {
  margin: 0;
}
</style>

<style lang="scss" scoped>
.copy-btn {
  height: 2.4rem;
  line-height: 2.2rem;
  padding: 0 1rem;
}

.small-label {
  display: inline-block;
  width: 2.4rem;
  text-align: right;
  height: 0.224rem;
  letter-spacing: 0.2rem;
}

.detail-panel__wrapper {
  position: fixed;
  top: 7rem;
  right: 1rem;
  max-height: calc(100% - 8rem);
  width: 24rem;
  border-radius: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
  background-color: rgba(255, 255, 255, 0.6);
  filter: drop-shadow(0 0 1.2rem rgba(255, 255, 255, 0.6));
  padding: 1.2rem 1.4rem;
  font-size: 1.2rem;
  font-weight: 400;
}
</style>
