<template>
  <Toolbar>
    <template #start>
      <InlineToolbarComponent />
    </template>

    <template #center>
      <SearchComponent />
    </template>

    <template #end>
      <UserMenuComponent />
    </template>
  </Toolbar>
</template>

<script>
import InlineToolbarComponent from '@/components/layout/InlineToolbarComponent.vue';
import SearchComponent from '@/components/SearchComponent.vue';
import UserMenuComponent from './UserMenuComponent.vue';

export default {
  components: {
    InlineToolbarComponent,
    SearchComponent,
    UserMenuComponent
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
