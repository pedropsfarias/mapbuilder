<template>
  <div class="dock">
    <!-- <component v-for="(config, i) in components" :key="i" :is="config.component"></component> -->
    <div v-for="(config, i) in components" :key="i">
      <component :is="config.component"></component>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DockComponent',
  data() {
    return {
      components: []
    };
  },
  mounted() {
    let config = {
      name: 'MeasureComponent',
      title: 'Measure Component',
      component: () => import('@/components/MeasureComponent.vue')
    };

    setTimeout(() => {
      this.components.push(config);
    }, 1000);
  },
  methods: {
    openWidget(config) {}
  }
};
</script>

<style scoped>
.dock {
  width: 100%;
  height: 100%;
}
</style>
