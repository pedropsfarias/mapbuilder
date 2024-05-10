<template>
  <div
    :style="`
    grid-column: span ${cols};
    grid-row: span ${rows};
  `"
  >
    <div :class="{ 'group-item': !hasTitle, 'group-item-with-title': hasTitle }">
      <div class="group-item-title">{{ title }}</div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RibbonItemGroupComponent',
  props: {
    title: {
      type: String,
      default: ''
    },
    cols: {
      type: String,
      default: '1'
    },
    rows: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {}
  },
  computed: {
    hasTitle() {
      return this.title.length > 0
    }
  }
}
</script>

<style scoped>
.group-item {
  position: relative;
  padding: 0.5rem 0.25rem;
}

.group-item-with-title {
  position: relative;
  padding: 0.5rem 0.25rem;
}

.group-item-title {
  position: absolute;
  left: 1.2rem;
  top: -1px;
  font-size: 0.8rem;
  background: #fff;
  padding: 0 0.2rem;
  color: #64748b;
}
</style>
