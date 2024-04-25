<template>
  <div
    ref="container"
    class="container"
    @mouseup="horizontalResizeMouseUp"
    @mousemove="horizontalResizeMouseMove"
  >
    <div ref="header" class="header" v-show="visible.header">
      <div class="btn" @click="hide('header')">Fechar</div>
    </div>
    <div class="toolbar" v-show="visible.toolbar">
      <div class="btn" @click="hide('toolbar')">Fechar</div>
    </div>
    <div class="left-sidebar" v-show="visible.leftSidebar">
      <div
        class="left resizer"
        ref="leftResizer"
        @mousedown="horizontalResizeMouseDown($event, 'left')"
      ></div>
      <dock-component></dock-component>
    </div>
    <div class="right-sidebar" v-show="visible.rightSidebar">
      <div
        class="right resizer"
        ref="rightResizer"
        @mousedown="horizontalResizeMouseDown($event, 'right')"
      ></div>
      <dock-component></dock-component>
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
      <dock-component></dock-component>
    </div>
  </div>
</template>

<script>
import MapComponent from '@/components/MapComponent.vue';
import DockComponent from '@/layout/DockComponent.vue';

export default {
  name: 'MainLayoutComponent',
  components: {
    MapComponent,
    DockComponent
  },
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    showToolbar: {
      type: Boolean,
      default: false
    },
    showLeftSidebar: {
      type: Boolean,
      default: true
    },
    showRightSidebar: {
      type: Boolean,
      default: true
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
        leftSidebar: this.showLeftSidebar,
        rightSidebar: this.showRightSidebar,
        footer: this.showFooter
      },
      headerHeight: 48,
      toolbarHeight: 128,
      footerHeight: 320,
      leftSidebarWidth: 320,
      rightSidebarWidth: 320,
      mouseIsDown: false,
      resizePanel: null,
      startX: 0,
      startY: 0,
      deltaX: 0,
      deltaY: 0
    };
  },
  mounted() {
    this.resize();
  },
  methods: {
    hide(key) {
      if (key == 'map') return;
      this.visible[key] = false;
      this.resize();
    },
    resize() {
      const headerHeight = this.visible.header ? this.headerHeight : 0;
      const toolbarHeight = this.visible.toolbar ? this.toolbarHeight : 0;
      const footerHeight = this.visible.footer ? this.footerHeight : 0;

      const leftSidebarWidth = this.visible.leftSidebar ? this.leftSidebarWidth : 0;
      const rightSidebarWidth = this.visible.rightSidebar ? this.rightSidebarWidth : 0;

      const bodyWidth = document.body.clientWidth;
      const bodyHeight = document.body.clientHeight;

      this.$refs.mapSection.style.maxHeight = `calc(${bodyHeight}px - ${headerHeight + toolbarHeight + footerHeight}px)`;
      this.$refs.mapSection.style.maxWidth = `calc(${bodyWidth}px - ${leftSidebarWidth + rightSidebarWidth})`;

      this.$refs.container.style.gridTemplateRows = `${headerHeight}px ${toolbarHeight}px auto ${footerHeight}px`;
      this.$refs.container.style.gridTemplateColumns = `${leftSidebarWidth}px auto ${rightSidebarWidth}px`;
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
    }
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
