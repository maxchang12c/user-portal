<template>
  <v-app>
    <slot name="app-bar">
      <v-app-bar app> </v-app-bar>
    </slot>

    <v-main>
      <v-container fluid>
        <slot name="body"></slot>
      </v-container>
    </v-main>

    <slot name="footer-bar">
      <v-footer app> </v-footer>
    </slot>
  </v-app>
</template>
<script>
export default {
  name: "BasicTemplate",
};
</script>
