<template>
  <div class="">
    <SplitButton label="Save" :model="items"></SplitButton>
  </div>
</template>

<script>
export default {
  name: 'UserMenuComponent',
  data() {
    return {
      items: [
        {
          label: 'Profile',
          icon: 'pi pi-user'
        },
        {
          label: 'Settings',
          icon: 'pi pi-cog'
        },
        {
          label: 'Logout',
          icon: 'pi pi-power-off'
        }
      ]
    };
  }
};
</script>

<style scoped></style>
