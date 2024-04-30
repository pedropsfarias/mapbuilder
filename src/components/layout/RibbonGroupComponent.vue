<template>
  <div :style="`
    width: ${width};
    height: ${height};
  `" class="group">
    <div class="group-content">
      <slot></slot>
    </div>
    <div class="group-title">{{ title }}</div>
  </div>
</template>

<script>
import { h } from 'vue';

export default {
  name: 'RibbonGroupComponent',
  props: {
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
};
</script>

<style scoped>
.group {
  position: relative;
  border: 1px solid #e8e8e8;
  border-radius: 0.5rem;
  overflow: hidden;
}

.group-title {
  position: absolute;
  width: 100%;
  border-top: 1px solid #e8e8e8;
  font-size: 0.9rem;
  bottom: 0rem;
  left: 0;
  user-select: none;
  text-align: center;
  padding: 0.1rem 0;
  color: #334155;
  background: #fafafa;
}

.group-content {
  height: calc(100% - 1.5rem);
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 33.33% 33.33% 33.33%;

}
</style>