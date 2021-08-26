<template>
  <v-app>
    <v-app-bar app color="white" dark flat>
      <div class="d-flex align-center">
        <v-img
          alt="Logo"
          class="shrink ml-2"
          contain
          src="./assets/logo.svg"
          transition="scale-transition"
          width="120"
        />
      </div>
      <v-spacer></v-spacer>
      <v-btn
        v-for="menu in menus"
        :key="menu"
        color="black"
        text
        href="https://www.integraledger.com/"
        target="_blank"
      >
        {{ menu }}
      </v-btn>
      <v-btn
        color="black"
        href="https://www.integraledger.com/"
        target="_blank"
      >
        DEMO CENTER
      </v-btn>
    </v-app-bar>

    <v-main :style="{ height: '100%' }">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    menus: ["HOST A NODE", "FOR DEVELOPERS", "COMMUNITY", "CONTACT US"],
  }),
};
</script>
<style lang="scss">
body {
  margin: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
