<template>
  <Toolbar>
    <template #start>
      <ButtonPrime icon="pi pi-plus" class="mr-2" severity="secondary" />
      <ButtonPrime icon="pi pi-print" class="mr-2" severity="secondary" />
      <ButtonPrime icon="pi pi-upload" severity="secondary" />
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
import Button from 'primevue/button';

export default {
  components: {
    ButtonPrime: Button
  },
  data() {
    return {
      search: null,
      itens: [
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
