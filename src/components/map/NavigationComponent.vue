<template>
  <RibbonGroupComponent title="Navegação" width="180px">
    <RibbonItemGroupComponent rows="2" cols="1">
      <Button
        @click="goToHome"
        v-tooltip="'Ir para a posição inicial'"
        icon="fg-2x fg fg-poi-home-o"
        severity="secondary"
        outlined
        class="w-100 h-100"
        style="height: 100% !important"
      />
    </RibbonItemGroupComponent>

    <RibbonItemGroupComponent rows="1" cols="1">
      <Button
        @click="goBack"
        v-tooltip="'Voltar posição'"
        icon="pi pi-chevron-left"
        severity="secondary"
        outlined
        class="w-100 h-100"
        style="height: 100% !important"
      />
    </RibbonItemGroupComponent>
    <RibbonItemGroupComponent rows="1" cols="1">
      <Button
        @click="goForward"
        v-tooltip="'Avançar posição'"
        icon="pi pi-chevron-right"
        severity="secondary"
        outlined
        class="w-100 h-100"
        style="height: 100% !important"
      />
    </RibbonItemGroupComponent>
    <RibbonItemGroupComponent rows="1" cols="1">
      <Button
        @click="handleFullscreen"
        v-tooltip="'Tela Cheia'"
        :icon="
          isFullscreen
            ? 'pi pi-arrow-down-left-and-arrow-up-right-to-center'
            : 'pi pi-arrow-up-right-and-arrow-down-left-from-center'
        "
        severity="secondary"
        outlined
        class="w-100 h-100"
        style="height: 100% !important"
      />
    </RibbonItemGroupComponent>
  </RibbonGroupComponent>
</template>

<script>
import MapSingleton from '@/classes/MapSingleton.js';
import { rotateArray } from '@/helpers/arrays.js';
export default {
  name: 'NavigationComponent',
  data() {
    return {
      map: MapSingleton.getInstance().getMap(),
      isFullscreen: false
    };
  },
  mounted() {
    this.map.on('moveend', (evt) => {
      if (evt.originalEvent) {
        const position = {
          center: this.map.getCenter(),
          zoom: this.map.getZoom()
        };
        this.saveToLocalStorage(position);
      }
    });
  },
  methods: {
    saveToLocalStorage(item) {
      let itemList = JSON.parse(localStorage.getItem('map:navigation')) || [];
      if (itemList.length >= 10) {
        itemList.shift();
      }
      itemList.push(item);
      localStorage.setItem('map:navigation', JSON.stringify(itemList));
    },
    goBack() {
      let itemList = JSON.parse(localStorage.getItem('map:navigation')) || [];
      if (itemList.length > 0) {
        itemList = rotateArray(itemList, 1, 'right');
        const lastItem = itemList[itemList.length - 1];
        this.map.flyTo({
          center: lastItem.center,
          zoom: lastItem.zoom,
          speed: 0.5
        });
        localStorage.setItem('map:navigation', JSON.stringify(itemList));
      }
    },
    goForward() {
      let itemList = JSON.parse(localStorage.getItem('map:navigation')) || [];
      if (itemList.length > 0) {
        itemList = rotateArray(itemList, 1, 'left');
        const lastItem = itemList[itemList.length - 1];
        this.map.flyTo({
          center: lastItem.center,
          zoom: lastItem.zoom,
          speed: 0.5
        });
        localStorage.setItem('map:navigation', JSON.stringify(itemList));
      }
    },
    goToHome() {
      const initialCenter = this.map.getStyle().center;
      const initialZoom = this.map.getStyle().zoom;
      this.map.flyTo({
        center: initialCenter,
        zoom: initialZoom,
        speed: 0.5
      });
    },
    openFullscreen() {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
        this.isFullscreen = true;
      } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
        this.isFullscreen = true;
      } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
        this.isFullscreen = true;
      }
    },
    closeFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        this.isFullscreen = false;
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
        this.isFullscreen = false;
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
        this.isFullscreen = false;
      }
    },
    handleFullscreen() {
      if (document.fullscreenElement) {
        this.closeFullscreen();
      } else {
        this.openFullscreen();
      }
    }
  }
};
</script>

<style scoped></style>
