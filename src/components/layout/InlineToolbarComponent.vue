<template>
  <div v-for="item in items" :key="item.label">
    <div class="btn">
      <ButtonPrime :icon="item.icon" @click="open(item)" severity="secondary" />
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button';

export default {
  components: {
    ButtonPrime: Button
  },
  data() {
    return {
      items: []
    };
  },
  mounted() {
    console.log('InlineToolbarComponent mounted');
    this.app.registerToolbar('inline', this);
  },
  methods: {
    addControl(item) {
      this.items.push(item);
      if (item.open) {
        this.open(item);
      }
    },
    open(item) {
      console.log('open', item);

      if (item.type == 'widget') {
        const dock = this.app.getDock(item.placement);
        dock.openWidget(item);
      }
    }
  }
};
</script>

<style scoped>
.btn {
  padding: 0 10px;
}

.btn:first-child {
  padding-left: 0;
}
</style>
