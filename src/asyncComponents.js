import { defineAsyncComponent } from 'vue';

const LayerSwitcherComponent = defineAsyncComponent(() => import('./components/map/LayerSwitcherComponent.vue'));
const MeasureComponent = defineAsyncComponent(() => import('./components/map/MeasureComponent.vue'));
const NavigationComponent = defineAsyncComponent(() => import('./components/map/NavigationComponent.vue'));

export default {
    LayerSwitcherComponent,
    MeasureComponent,
    NavigationComponent
}