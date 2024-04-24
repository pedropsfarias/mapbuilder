<template>
    <div ref="container" class="container">
        <div ref="header" class="header" v-show="visible.header">
            <div class="btn" @click="hide('header')">Fechar</div>
        </div>
        <div class="toolbar" v-show="visible.toolbar">
            <div class="btn" @click="hide('toolbar')">Fechar</div>
        </div>
        <div class="left-sidebar" v-show="visible.leftSidebar">
            <div class="btn" @click="hide('leftSidebar')">Fechar</div>
        </div>
        <div class="right-sidebar" v-show="visible.rightSidebar">
            <div class="btn" @click="hide('rightSidebar')">Fechar</div>
        </div>
        <div ref="mapSection" class="map">
            <map-component></map-component>
        </div>
        <div class="footer" v-show="visible.footer">
            <div class="btn" @click="hide('footer')">Fechar</div>
        </div>
    </div>
</template>

<script>
import MapComponent from '@/components/MapComponent.vue';
export default {
    name: 'MainLayoutComponent',
    components: {
        MapComponent
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
            default: true
        },
        showRightSidebar: {
            type: Boolean,
            default: true
        },
        showFooter: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            visible: {
                header: this.showHeader,
                toolbar: this.showToolbar,
                leftSidebar: this.showLeftSidebar,
                rightSidebar: this.showRightSidebar,
                map: true,
                footer: this.showFooter
            },
        };
    },
    methods: {
        hide(key) {
            if (key == 'map') return;
            this.visible[key] = false;
            this.resize();
        },
        resize() {
            const headerHeight = this.visible.header ? 3 : 0;
            const toolbarHeight = this.visible.toolbar ? 8 : 0;
            const footerHeight = this.visible.footer ? 20 : 0;

            const leftSidebarWidth = this.visible.leftSidebar ? 20 : 0;
            const rightSidebarWidth = this.visible.rightSidebar ? 20 : 0;

            const bodyWidth = document.body.clientWidth;
            const bodyHeight = document.body.clientHeight;

            this.$refs.mapSection.style.maxHeight = `calc(${bodyHeight}px - ${headerHeight + toolbarHeight + footerHeight}rem)`;
            this.$refs.mapSection.style.maxWidth = `calc(${bodyWidth}px - ${leftSidebarWidth + rightSidebarWidth})`;

            this.$refs.container.style.gridTemplateRows = `${headerHeight}rem ${toolbarHeight}rem auto ${footerHeight}rem`;
            this.$refs.container.style.gridTemplateColumns = `${leftSidebarWidth}rem auto ${rightSidebarWidth}rem`;
        }
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    background: bisque;
    display: grid;
    grid-template-rows: 3rem 8rem auto 20rem;
    grid-template-columns: 20rem auto 20rem;
}

.header {
    grid-column: 1/ span 3;
    grid-row: 1;
    background: #fff;
}

.toolbar {
    grid-column: 1/ span 3;
    grid-row: 2;
    background: #85827d;
}

.left-sidebar {
    grid-column: 1;
    grid-row: 3/5;
    background: blue;

}

.right-sidebar {
    grid-column: 3;
    grid-row: 3/5;
    background: yellowgreen;
}

.map {
    grid-column: 2/3;
    grid-row: 3;
    background: rgb(228, 233, 181);
    position: relative;
}

.footer {
    grid-column: 2/3;
    grid-row: 4;
    background: #fff;
}

/* Apagar  */
.btn {
    cursor: pointer;
    color: #fff;
    background: rgb(172, 158, 158);
    padding: 0.5rem;
    border-radius: 0.5rem;
    width: 5rem;

}
</style>