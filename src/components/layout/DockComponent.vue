<template>
  <div ref="dock" class="card">
    <TabView v-model:activeIndex="activeIndex" :scrollable="false" class="tabview-custom">
      <TabPanel v-for="(item, i) in items" :key="i">
        <template #header>
          <div class="title" :style="{ width: tabSize }">
            <div class="text">{{ item.title }}</div>

            <div class="actions">
              <i @click="close(i)" class="pi pi-times"></i>
            </div>
          </div>
        </template>
        <p class="m-0">
          <component :is="item.component"></component>
        </p>
      </TabPanel>
    </TabView>
  </div>
</template>

<script>
import { defineAsyncComponent, markRaw } from 'vue';

export default {
  name: 'DockComponent',
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activeIndex: 0,
      tabSize: 0,
      items: []
    };
  },
  mounted() {
    this.app.emitter.on('layout:resize', this.setTabSize);
  },
  methods: {
    openWidget(config) {
      //   name: 'MeasureComponent',
      //   title: 'Measure Component',
      //   component: markRaw(defineAsyncComponent(() => import('@/components/map/MeasureComponent.vue')))

      const item = {
        title: config.title,
        component: markRaw(defineAsyncComponent(() => import('@/components/' + config.name)))
      };

      this.items.push(item);

      
    },
    close(index) {
      this.items.splice(index, 1);
      this.setTabSize();
      if (this.items.length === 0) {
        this.app.run('layout:hideDock', this.name);
      }
      setTimeout(() => {
        this.activeIndex = 0;
      }, 10);
    },
    setTabSize() {
      const padding = this.items.length * 28;
      const dockWidth = this.$refs.dock.clientWidth - padding;
      this.tabSize = dockWidth / this.items.length + 'px';
    }
  }
};
</script>

<style scoped>
.dock {
  width: 100%;
  height: 100%;
}

.title {
  position: relative;
}

.text {
  width: calc(100% - 10px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.actions {
  position: absolute;
  right: 0;
  top: 1px;
  z-index: 10;
}

.actions i {
  cursor: pointer;
  font-size: 0.8rem;
}

.actions i:hover {
  color: #ff0000;
}
</style>
