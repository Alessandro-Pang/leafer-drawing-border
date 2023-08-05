<!--
 * @Author: zi.yang
 * @Date: 2023-07-29 18:46:56
 * @LastEditors: zi.yang
 * @LastEditTime: 2023-08-05 19:39:39
 * @Description: 
 * @FilePath: /vue-project/src/components/detailPanel.vue
-->
<script setup>
import { reactive, ref, watch } from 'vue';
import BaseInput from './BaseInput.vue';
import EllipseFeature from './features/EllipseFeature.vue';
import PolygonFeature from './features/PolygonFeature.vue';
import RectFeature from './features/RectFeature.vue';
import StarFeature from './features/StarFeature.vue';
import { NSlider, NColorPicker, useMessage } from 'naive-ui';
import { getWrapperBox } from '../graph/utils';

const message = useMessage();

const props = defineProps({
  leafer: Object,
  node: Object,
});

// 注册组件
const featureComponent = {
  EllipseFeature,
  PolygonFeature,
  RectFeature,
  StarFeature,
};
const featureName = ref('');
let config = reactive({});

let timerId = null;
// 简单的防抖功能，避免移动元素导致频繁刷新
function setConfig(node) {
  if (timerId) clearTimeout(timerId);
  timerId = setTimeout(() => {
    if (!node) return;
    featureName.value = node?.tag + 'Feature';
    const wrapper = getWrapperBox(node);
    if (!wrapper) return;
    config.x = wrapper.x;
    config.y = wrapper.y;
    config.rotation = wrapper.rotation;
    config.width = node.width;
    config.height = node.height;
    config.opacity = node.opacity * 100;
    config.fill = node.fill;
    config.stroke = node.stroke;
    config.strokeWidth = node.strokeWidth;
    clearTimeout(timerId);
  }, 60);
}
watch(props.node, (value) => setConfig(value));

// 设置节点属性
function setNodeProp(prop, value) {
  const wrapper = getWrapperBox(props.node);
  if (!wrapper) return;
  props.node.set({ [prop]: value });
}

function handleChangeGraph(prop, value) {
  setNodeProp(prop, value);
}

// 设置容器属性
function handleChangeWrapper(prop, value) {
  value = +value;
  const wrapper = getWrapperBox(props.node);
  if (!wrapper) return;
  wrapper.set({ [prop]: value });
}

function handleChangeSize(prop, value) {
  value = +value;
  const wrapper = getWrapperBox(props.node);
  if (!wrapper) return;
  wrapper.set({ [prop]: value + 2 });
  props.node.set({ [prop]: value });
}

function handleClickCopy() {
  const node = props.node
  const copyObj = {
    tag: node.tag,
    x: node.x,
    y: node.y,
    rotation: node.rotation,
    width: node.width,
    height: node.height,
    opacity: node.opacity,
    fill: node.fill,
    stroke: node.stroke,
    strokeWidth: node.strokeWidth,
    // 元素特定属性
    startAngle: node.startAngle,
    endAngle: node.endAngle,
    innerRadius: node.innerRadius,
    sides: node.sides,
    cornerRadius: node.cornerRadius,
    points: node.points,
    innerRadius: node.innerRadius,
  };
  navigator.clipboard.writeText(JSON.stringify(copyObj));
  message.success('已成功复制到剪切板！');
}
</script>

<template>
  <div class="detail-panel__wrapper">
    <div flex="main:justify">
      <h5 class="zy-mb-10" style="font-weight: 400">配置面板</h5>
      <button class="copy-btn" @click="handleClickCopy">复制属性</button>
    </div>
    <hr style="margin: 1.4rem 0 1.2rem 0" />

    <div>位置和尺寸</div>
    <div class="zy-mt-15" flex>
      <span class="small-label">X:</span>
      <base-input
        v-model.trim="config.x"
        @input="handleChangeWrapper('x', $event)"
        type="number"
        style="width: 80px; margin-right: 4px"
      />
      <span class="small-label">Y:</span>
      <base-input
        v-model.trim="config.y"
        @input="handleChangeWrapper('y', $event)"
        type="number"
        style="width: 80px"
      />
    </div>
    <div class="zy-mt-15" flex>
      <span class="small-label">W:</span>
      <base-input
        v-model.trim="config.width"
        @input="handleChangeSize('width', $event)"
        type="number"
        style="width: 80px; margin-right: 4px"
      />
      <span class="small-label">H:</span>
      <base-input
        v-model.trim="config.height"
        @input="handleChangeSize('height', $event)"
        type="number"
        style="width: 80px"
      />
    </div>

    <div class="zy-mt-15" flex>
      <span class="small-label">R:</span>
      <base-input
        v-model.trim="config.rotation"
        @input="handleChangeWrapper('rotation', $event)"
        :min="-360"
        :max="360"
        type="number"
        style="width: 80px"
        label="旋转"
      />°
    </div>
    <hr />
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

    <hr />
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
        ><template #label></template
      ></n-color-picker>
    </div>

    <hr />
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
        ><template #label></template
      ></n-color-picker>

      <base-input
        v-model.trim="config.strokeWidth"
        @input="handleChangeGraph('strokeWidth', $event)"
        type="number"
        style="width: 82px; margin-right: 4px"
        label="宽度"
      />
    </div>

    <hr />
    <!-- 各类元素特性 -->
    <component
      :is="featureComponent[featureName]"
      :key="node.innerId"
      :node="props.node"
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
