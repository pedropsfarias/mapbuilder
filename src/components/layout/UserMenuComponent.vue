<template>
  <div class="items">
    <Button
      v-tooltip="'Ajuda'"
      icon="pi pi-question-circle"
      iconClass="btn-icon"
      @click="toggleHelpMenu"
      severity="secondary"
      text
    />
    <Button
      v-tooltip="'Configurações'"
      icon="pi pi-cog"
      iconClass="btn-icon"
      @click="toggleConfigMenu"
      severity="secondary"
      text
    />
    <Button
      v-tooltip="'Usuário'"
      icon="pi pi-user"
      iconClass="btn-icon"
      severity="secondary"
      aria-label="User"
      text
      @click="toggleUserMenu"
    />

    <OverlayPanel ref="config" :dismissable="true">
      <div class="menu" style="height: 400px">
        <div class="menu-group">
          <div class="menu-title">
            <i class="pi pi-objects-column"></i>
            <span>Modelos</span>
          </div>

          <div class="menu-item">
            <Button
              class="w-100 user-menu-item"
              severity="secondary"
              text
              label="Classes"
              @click="toggleConfigMenu"
              size="small"
            />
          </div>

          <div class="menu-item">
            <Button
              class="w-100 user-menu-item"
              severity="secondary"
              text
              label="Atributos"
              @click="toggleConfigMenu"
              size="small"
            />
          </div>

          <div class="menu-item">
            <Button
              class="w-100 user-menu-item"
              severity="secondary"
              text
              label="Tipos"
              @click="toggleConfigMenu"
              size="small"
            />
          </div>

          <div class="menu-item">
            <Button
              class="w-100 user-menu-item"
              severity="secondary"
              text
              label="Telas"
              @click="toggleConfigMenu"
              size="small"
            />
          </div>
        </div>

        <div class="menu-group">
          <div class="menu-title">
            <i class="pi pi-cog"></i>
            <span>Geral</span>
          </div>

          <div class="menu-item">
            <Button
              class="w-100 user-menu-item"
              severity="secondary"
              text
              label="Relatórios"
              @click="toggleConfigMenu"
              size="small"
            />
          </div>

          <div class="menu-item">
            <Button
              class="w-100 user-menu-item"
              severity="secondary"
              text
              label="Funcionalidades"
              @click="toggleConfigMenu"
              size="small"
            />
          </div>

          <div class="menu-item">
            <Button
              class="w-100 user-menu-item"
              severity="secondary"
              text
              label="Sistema"
              @click="toggleConfigMenu"
              size="small"
            />
          </div>
        </div>

        <div class="menu-group">
          <div class="menu-title">
            <i class="pi pi-map"></i>
            <span>Mapa</span>
          </div>

          <div class="menu-item">
            <Button
              class="w-100 user-menu-item"
              severity="secondary"
              text
              label="Mapas"
              @click="toggleConfigMenu"
              size="small"
            />
          </div>

          <div class="menu-item">
            <Button
              class="w-100 user-menu-item"
              severity="secondary"
              text
              label="Grupos"
              @click="toggleConfigMenu"
              size="small"
            />
          </div>

          <div class="menu-item">
            <Button
              class="w-100 user-menu-item"
              severity="secondary"
              text
              label="Camadas"
              @click="toggleConfigMenu"
              size="small"
            />
          </div>
        </div>

        <div class="menu-group">
          <div class="menu-title">
            <i class="pi pi-lock"></i>
            <span>Segurança</span>
          </div>

          <div class="menu-item">
            <Button
              class="w-100 user-menu-item"
              severity="secondary"
              text
              label="Usuários"
              @click="toggleConfigMenu"
              size="small"
            />
          </div>

          <div class="menu-item">
            <Button
              class="w-100 user-menu-item"
              severity="secondary"
              text
              label="Perfis"
              @click="toggleConfigMenu"
              size="small"
            />
          </div>

          <div class="menu-item">
            <Button
              class="w-100 user-menu-item"
              severity="secondary"
              text
              label="Permissões Sistema"
              @click="toggleConfigMenu"
              size="small"
            />
          </div>

          <div class="menu-item">
            <Button
              class="w-100 user-menu-item"
              severity="secondary"
              text
              label="Permissões Mapa"
              @click="toggleConfigMenu"
              size="small"
            />
          </div>

          <div class="menu-item">
            <Button
              class="w-100 user-menu-item"
              severity="secondary"
              text
              label="Preferências"
              @click="toggleConfigMenu"
              size="small"
            />
          </div>
        </div>
      </div>
    </OverlayPanel>

    <OverlayPanel ref="help" :dismissable="true">
      <p>Contacte o administrador do sistema</p>
    </OverlayPanel>

    <OverlayPanel ref="user" :dismissable="true">
      <div class="user-menu">
        <Avatar
          image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png"
          class="mr-2"
          size="xlarge"
        />
        <br />
        <div class="user-name">Onya Malimba</div>
      </div>
      <Button type="button" label="Sair" class="user-menu-btn" badgeSeverity="contrast" outlined />
      <Button
        type="button"
        label="Mensagens"
        badge="2"
        badgeSeverity="contrast"
        outlined
        class="user-menu-btn"
      />
      <br />
      <div class="menu">
        <div class="menu-group" style="height: 100px">
          <div class="menu-title">
            <i class="pi pi-cog"></i>
            <span>Configurações do Usuário</span>
          </div>

          <div class="menu-item">
            <Button
              class="w-100 user-menu-item"
              severity="secondary"
              text
              label="Perfil"
              @click="toggleConfigMenu"
              size="small"
            />
          </div>

          <div class="menu-item">
            <Button
              class="w-100 user-menu-item"
              severity="secondary"
              text
              label="Senha"
              @click="toggleConfigMenu"
              size="small"
            />
          </div>

          <div class="menu-item">
            <Button
              class="w-100 user-menu-item"
              severity="secondary"
              text
              label="Personalização"
              @click="toggleConfigMenu"
              size="small"
            />
          </div>
        </div>
      </div>
    </OverlayPanel>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toggleConfigMenu(event) {
      this.$refs.config.toggle(event);
    },
    toggleHelpMenu(event) {
      this.$refs.help.toggle(event);
    },
    toggleUserMenu(event) {
      this.$refs.user.toggle(event);
    }
  }
};
</script>

<style scoped>
.menu {
  width: 300px;
  /* height: 400px; */
  padding: 0 1rem 1rem 1rem;
}

.menu-group {
  display: block;
  position: relative;
}

.menu-title {
  width: 100%;
  height: 3.3rem;
  font-weight: 500;
  position: relative;
  float: left;
  padding-top: 1.5rem;
}

.menu-title span {
  padding-left: 1rem;
}

.menu-item {
  margin-left: 6%;
  width: 44%;
  position: relative;
  float: left;
}

.menu-item i {
  margin-right: 0.5rem;
  font-size: 0.5rem;
}

.items button {
  margin-left: 0.5rem;
}

.user-menu-item {
  transition-duration: 0.2s;
  text-align: start;
  padding-left: 0.5rem;
}

.user-menu {
  width: 300px;
  padding-top: 1rem;
}
.user-name {
  width: 100%;
  text-align: center;
  padding-top: 0.5rem;
}
.user-menu-btn {
  margin: 1rem;
  width: calc(50% - 2rem);
}
</style>

<style>
.user-menu .p-avatar {
  margin-left: 125px;
}
</style>
