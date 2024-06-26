<template>
  <div
    ref="container"
    class="container"
    @mouseup="horizontalResizeMouseUp"
    @mousemove="horizontalResizeMouseMove"
  >
    <div ref="header" class="header" v-show="visible.header">
      <main-menu-component></main-menu-component>
    </div>
    <div class="toolbar" v-show="visible.toolbar">
      <RibbonToolbar></RibbonToolbar>
    </div>
    <div ref="leftSection" class="left-sidebar" v-show="visible.left">
      <div
        class="left resizer"
        ref="leftResizer"
        @mousedown="horizontalResizeMouseDown($event, 'left')"
      ></div>

      <dock-component ref="left" name="left"></dock-component>
    </div>
    <div class="right-sidebar" v-show="visible.right">
      <div
        class="right resizer"
        ref="rightResizer"
        @mousedown="horizontalResizeMouseDown($event, 'right')"
      ></div>
      <dock-component ref="right" name="right"></dock-component>
    </div>
    <div ref="mapSection" class="map">
      <map-component></map-component>
    </div>
    <div class="footer" v-show="visible.footer">
      <div
        class="bottom resizer"
        ref="bottomtResizer"
        @mousedown="horizontalResizeMouseDown($event, 'bottom')"
      ></div>
      <dock-component ref="bottom" name="bottom"></dock-component>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import appStatusStore from '@/stores/appStatusStore.js';

import MapComponent from '@/components/MapComponent.vue';
import DockComponent from '@/components/layout/DockComponent.vue';
import MainMenuComponent from '@/components/layout/MainMenuComponent.vue';
import RibbonToolbar from '@/components/layout/RibbonToolbarComponent.vue';

export default {
  name: 'MainLayoutComponent',
  components: {
    MapComponent,
    DockComponent,
    MainMenuComponent,
    RibbonToolbar
  },
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    showToolbar: {
      type: Boolean,
      default: true
    },
    showLeftSidebar: {
      type: Boolean,
      default: false
    },
    showRightSidebar: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: {
        header: this.showHeader,
        toolbar: this.showToolbar,
        left: this.showLeftSidebar,
        right: this.showRightSidebar,
        footer: this.showFooter
      },
      headerHeight: 48,
      toolbarHeight: 128,
      footerHeight: 320,
      leftSidebarWidth: 320,
      rightSidebarWidth: 320,
      mouseIsDown: false,
      hasMoved: false,
      resizePanel: null,
      startX: 0,
      startY: 0,
      deltaX: 0,
      deltaY: 0
    };
  },
  mounted() {
    this.resize();

    document.addEventListener('resize', () => {
      this.resize();
    });

    document.addEventListener('fullscreenchange', () => {
      setTimeout(() => {
        this.resize();
      }, 100);
    });

    this.app.registerCommand('layout:hideDock', this.hide);
    this.app.registerCommand('layout:showDock', this.show);

    this.appStatusStore.setLayoutIsDone(true);
  },
  methods: {
    hide(key) {
      console.log('hide', key);
      if (key == 'map') return;
      this.visible[key] = false;
      this.resize();
    },
    show(key) {
      console.log('show', key);
      this.visible[key] = true;
      this.resize();
    },
    resize() {
      const headerHeight = this.visible.header ? this.headerHeight : 0;
      const toolbarHeight = this.visible.toolbar ? this.toolbarHeight : 0;
      const footerHeight = this.visible.footer ? this.footerHeight : 0;

      const leftSidebarWidth = this.visible.left ? this.leftSidebarWidth : 0;
      const rightSidebarWidth = this.visible.right ? this.rightSidebarWidth : 0;

      const bodyWidth = document.body.clientWidth;
      const bodyHeight = document.body.clientHeight;

      this.$refs.mapSection.style.maxHeight = `calc(${bodyHeight}px - ${headerHeight + toolbarHeight + footerHeight}px)`;
      this.$refs.mapSection.style.maxWidth = `calc(${bodyWidth}px - ${leftSidebarWidth + rightSidebarWidth})`;

      this.$refs.leftSection.style.maxHeight = `calc(${bodyHeight}px - ${headerHeight + toolbarHeight}px)`;

      this.$refs.container.style.gridTemplateRows = `${headerHeight}px ${toolbarHeight}px auto ${footerHeight}px`;
      this.$refs.container.style.gridTemplateColumns = `${leftSidebarWidth}px auto ${rightSidebarWidth}px`;

      this.app.emitter.emit('layout:resize');
    },
    horizontalResizeMouseDown(event, painel) {
      if (painel === 'left') {
        this.startX = event.target.offsetLeft;
      } else if (painel === 'right') {
        this.startX = this.rightSidebarWidth;
      } else if (painel === 'bottom') {
        this.startY = this.footerHeight;
      }

      this.mouseIsDown = true;
      this.resizePanel = painel;
    },
    horizontalResizeMouseUp() {
      if (!this.hasMoved) return;
      this.mouseIsDown = false;
      this.startX = 0;
      this.startY = 0;

      if (this.resizePanel === 'left') {
        this.leftSidebarWidth += this.deltaX;
      } else if (this.resizePanel === 'right') {
        this.rightSidebarWidth += this.deltaX;
      } else if (this.resizePanel === 'bottom') {
        this.footerHeight += this.deltaY;
      }
      this.resize();
      this.hasMoved = false;
    },
    horizontalResizeMouseMove(event) {
      if (!this.mouseIsDown) return;

      if (this.resizePanel === 'left') {
        this.$refs.leftResizer.style.left = `${event.clientX}px`;
        this.deltaX = event.clientX - this.startX;
      } else if (this.resizePanel === 'right') {
        const bodyWidth = document.body.clientWidth;
        this.$refs.rightResizer.style.right = `${bodyWidth - event.clientX}px`;
        this.deltaX = bodyWidth - event.clientX - this.startX;
      } else if (this.resizePanel === 'bottom') {
        const bodyHeight = document.body.clientHeight;
        this.$refs.bottomtResizer.style.bottom = `${bodyHeight - event.clientY}px`;
        this.deltaY = bodyHeight - event.clientY - this.startY;
      }

      this.hasMoved = true;
    }
  },
  computed: {
    ...mapStores(appStatusStore)
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  display: grid;
  grid-template-rows: 48px 128px auto 320px;
  grid-template-columns: 320px auto 320px;
}

.container > div {
  border: 1px solid #e8e8e8;
}

.header {
  grid-column: 1 / span 3;
  grid-row: 1;
  background: #f0f0f0;
}

.toolbar {
  grid-column: 1 / span 3;
  grid-row: 2;
  background: #f0f0f0;
}

.left-sidebar {
  grid-column: 1;
  grid-row: 3/5;
  background: #f0f0f0;
  position: relative;
}

.right-sidebar {
  grid-column: 3;
  grid-row: 3/5;
  background: #f0f0f0;
  position: relative;
}

.map {
  grid-column: 2/3;
  grid-row: 3;
  background: #f0f0f0;
  position: relative;
  overflow: hidden;
}

.footer {
  grid-column: 2/3;
  grid-row: 4;
  background: #f0f0f0;
  position: relative;
}

.resizer {
  position: absolute;
  top: 50%;
  width: 3px;
  height: 2rem;
  background: #e1e1e1;
  cursor: ew-resize;
  border-radius: 0.2rem;
}

.resizer.left {
  right: 0;
  transform: translate(2px, -50%);
}

.resizer.right {
  right: 320px;
  transform: translate(2px, -50%);
}

.resizer.bottom {
  top: unset;
  bottom: 320px;
  left: 50%;
  height: 3px;
  width: 2rem;
  cursor: ns-resize;
  transform: translate(-50%, 4 px);
}

.resizer:hover {
  background: #b4b4b4;
}
</style>
