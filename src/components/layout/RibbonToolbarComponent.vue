<template>
  <div class="content">
    <component v-for="item in items" :key="item.title" :is="item.component"></component>
  </div>
</template>

<script>
import { markRaw } from 'vue';
import components from '@/asyncComponents';

export default {
  name: 'ToolbarComponent',
  components: {},
  props: {},
  data() {
    return {
      items: []
    };
  },
  mounted() {
    console.log('ToolbarComponent mounted');
    this.app.registerToolbar('ribbon', this);
  },
  methods: {
    addControl(config) {
      const item = {
        title: config.title,
        component: markRaw(components[config.name])
      };
      this.items.push(item);
    }
  }
};
</script>

<style scoped>
.content {
  padding: 0.5rem 0;
  position: relative;
  background-color: #fff;
  width: 100%;
  height: 100%;
  margin: 0;
}

.p-button {
  width: 100%;
  padding: 0.2rem 0.5rem;
}

.p-multiselect {
  height: 1.8rem;
}
</style>

<style>
.p-multiselect-label {
  padding: 0.2rem 0.5rem !important;
}
</style>
