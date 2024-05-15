<template>
  <div
    class="scale"
    :style="{
      width: size,
      borderBottom: bStyle,
      borderLeft: bStyle,
      borderRight: bStyle
    }"
  >
    <span>{{ distance }}</span>
  </div>
</template>

<script>
import MapSingleton from '@/classes/MapSingleton.js';
export default {
  name: 'ScaleComponent',
  data() {
    return {
      scale: '',
      size: 0,
      distance: '',
      bStyle: '0 solid #00000000',
      map: MapSingleton.getInstance().getMap()
    };
  },
  mounted() {
    setTimeout(() => {
      this.map.on('zoomend', () => {
        this.update();
      });
      this.update();
      this.bStyle = '1px solid #000';
    }, 500);
  },
  methods: {
    update() {
      const maxWidth = 100;

      const map = this.map;
      const y = map._container.clientHeight / 2;
      const x = map._container.clientWidth / 2 - maxWidth / 2;
      const left = map.unproject([x, y]);
      const right = map.unproject([x + maxWidth, y]);
      const maxMeters = left.distanceTo(right);
      let maxDistance = maxMeters;

      if (maxMeters >= 1000) {
        maxDistance = maxMeters / 1000;
      }

      const distance = this.getRoundNum(maxDistance);
      const ratio = distance / maxDistance;

      this.size = `${maxWidth * ratio}px`;
      this.distance = `${distance} ${maxMeters >= 1000 ? 'km' : 'm'}`;
    },
    getDecimalRoundNum(d) {
      const multiplier = Math.pow(10, Math.ceil(-Math.log(d) / Math.LN10));
      return Math.round(d * multiplier) / multiplier;
    },
    getRoundNum(num) {
      const pow10 = Math.pow(10, `${Math.floor(num)}`.length - 1);
      let d = num / pow10;

      d =
        d >= 10
          ? 10
          : d >= 5
            ? 5
            : d >= 3
              ? 3
              : d >= 2
                ? 2
                : d >= 1
                  ? 1
                  : this.getDecimalRoundNum(d);

      return pow10 * d;
    }
  }
};
</script>

<style scoped>
.scale {
  width: 100%;
  height: 40%;
  margin-top: 6px;
  position: relative;
}

.scale span {
  font-size: 0.5rem;
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  text-overflow: ellipsis;
}
</style>
