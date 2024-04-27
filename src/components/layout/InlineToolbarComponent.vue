<template>
  <div v-for="item in items" :key="item.label">
    <ButtonPrime :icon="item.icon" class="mr-2" severity="secondary" />
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
    }
  }
};
</script>
