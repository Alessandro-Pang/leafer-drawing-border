<!--
 * @Author: zi.yang
 * @Date: 2023-08-02 08:23:52
 * @LastEditors: zi.yang
 * @LastEditTime: 2023-08-05 18:46:05
 * @Description: 
 * @FilePath: /vue-project/src/components/BaseInput.vue
-->
<script setup>
import { ref, watchEffect } from 'vue';
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  max: Number,
  min: Number,
});
defineEmits(['update:modelValue', 'input', 'blur']);

function getValue(value) {
  value = +value;
  if (props.min !== void 0 && value < props.min) {
    value = props.min;
  } else if (props.max !== void 0 && value > props.max) {
    value = props.max;
  }
  const newVal = Number.parseFloat(value);
  return isNaN(newVal) ? '' : newVal
}

const currentValue = ref(0);
watchEffect(()=>{
  currentValue.value = getValue(props.modelValue)
})

function emitModelValue(emit, event) {
  const value = getValue(event?.target?.value);
  emit('update:modelValue', value);
  emit('input', value);
  currentValue.value = value;
}
</script>

<template>
  <div class="draw-input--box">
    <input
      class="draw-input"
      v-model="currentValue"
      type="number"
      @input="emitModelValue($emit, $event)"
      @blur="$emit('blur', getValue($event.target.value))"
    />
    <div v-if="label" class="draw-label">{{ label }}</div>
  </div>
</template>

<style lang="scss" scoped>
.draw-input--box {
  display: inline-block;
  .draw-input {
    color: #333;
    border-width: 0 0 0.1rem 0;
    border-radius: 0;
    outline: none;
    height: 2.7rem;
    padding: 0.2rem;
    margin: 0;
  }
  .draw-label {
    text-align: center;
    font-weight: 200;
  }
}
</style>
