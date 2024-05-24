<template>
  <div ref="container" class="container">
    <div ref="header" class="header">
      <Toolbar>
        <template #end>
          <UserMenuComponent />
        </template>
      </Toolbar>
    </div>
    <div class="menu">
      <PanelMenu :model="menuItems" class="w-100" />
    </div>
    <div class="content">
      <Card>
        <template #title>Classes</template>
        <template #content>
          <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur
            error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis,
            culpa ratione quam perferendis esse, cupiditate neque quas!
          </p>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import UserMenuComponent from './UserMenuComponent.vue';
export default {
  name: 'MainLayoutComponent',
  components: {
    UserMenuComponent
  },
  props: {},
  data() {
    return {
      menuItems: [
        {
          label: 'Definição das Classes',
          icon: 'pi pi-envelope',
          badge: 5,
          items: [
            {
              label: 'Classes',
              icon: 'pi pi-file-edit',
              shortcut: '⌘+N'
            },
            {
              label: 'Atributos',
              icon: 'pi pi-inbox',
              badge: 5
            },
            {
              label: 'Relacionamentos',
              icon: 'pi pi-send',
              shortcut: '⌘+S'
            }
          ]
        },
        {
          label: 'Segurança',
          icon: 'pi pi-chart-bar',
          shortcut: '⌘+R',
          items: [
            {
              label: 'Sales',
              icon: 'pi pi-chart-line',
              badge: 3
            },
            {
              label: 'Products',
              icon: 'pi pi-list',
              badge: 6
            }
          ]
        },
        {
          label: 'Perfil',
          icon: 'pi pi-user',
          shortcut: '⌘+W',
          items: [
            {
              label: 'Settings',
              icon: 'pi pi-cog',
              shortcut: '⌘+O'
            },
            {
              label: 'Privacy',
              icon: 'pi pi-shield',
              shortcut: '⌘+P'
            }
          ]
        }
      ]
    };
  },
  mounted() {}
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.menu {
  display: flex;
  flex-direction: row;
  width: 250px;
  height: calc(100% - 52px);
  position: relative;
  float: left;
  padding: 1rem;
  background: #fff;
}
.content {
  width: calc(100% - 250px);
  height: calc(100% - 52px);
  position: relative;
  float: left;
  padding: 1rem;
}
</style>
