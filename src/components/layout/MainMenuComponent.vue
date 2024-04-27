<template>
  <Toolbar>
    <template #start>
      <InlineToolbarComponent />
    </template>

    <template #center>
      <InputText placeholder="Procurar" />
    </template>

    <template #end>
      <SplitButton label="Save" :model="items"></SplitButton>
    </template>
  </Toolbar>
</template>

<script>
import InlineToolbarComponent from '@/components/layout/InlineToolbarComponent.vue';
export default {
  components: {
    InlineToolbarComponent
  },
  data() {
    return {
      search: null,
      items: [
        {
          label: 'Update',
          icon: 'pi pi-refresh'
        },
        {
          label: 'Delete',
          icon: 'pi pi-times'
        }
      ]
    };
  }
};
</script>

<style scoped>
.p-menubar {
  padding: 0.2rem;
  border: none;
}
</style>
