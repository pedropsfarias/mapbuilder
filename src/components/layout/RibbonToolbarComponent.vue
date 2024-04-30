<template>
  <div class="content">
    <RibbonGroupComponent />
  </div>
</template>

<script>
import RibbonGroupComponent from '@/components/layout/RibbonGroupComponent.vue';
export default {
  name: 'ToolbarComponent',
  components: {
    RibbonGroupComponent
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    console.log('ToolbarComponent mounted');
    this.app.registerToolbar('toolbar', this);
  },
  methods: {}
};
</script>

<style scoped>
.content {
  padding: 0.5rem;
  position: relative;
  background-color: #fff;
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
