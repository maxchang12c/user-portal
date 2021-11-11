<template>
  <v-app>
    <slot name="app-bar">
      <v-app-bar app absolute color="deep-purple accent-4" dark>
        <div class="d-flex flex-grow-1">
          Welcome to the world best admin portal !
        </div>
      </v-app-bar>
    </slot>

    <v-main class="main">
      <v-container fluid>
        <slot name="body"></slot>
      </v-container>
    </v-main>

    <slot name="footer-bar">
      <v-footer dark padless>
        <v-card
          width="100%"
          flat
          tile
          class="indigo lighten-1 white--text text-center"
        >
          <v-card-text class="white--text pt-4">
            Hi , im max , welcome to test and use this demo admin portal. If you
            think it can be improve better do send me an email
            (maxchang12c@gmail.com) : )
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text class="white--text">
            {{ new Date().getFullYear() }} — <strong>Admin portal</strong>
          </v-card-text>
        </v-card>
      </v-footer>
      <!-- <v-footer app> </v-footer> -->
    </slot>
  </v-app>
</template>
<script>
export default {
  name: "BasicTemplate",
};
</script>
<style lang="scss">
.main {
  background: darkslateblue;
}
</style>
