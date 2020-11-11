<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40" />

        <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100" src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png" width="100" />
      </div>

      <v-spacer></v-spacer>

      <v-btn text @click="routerGoTo('Home')" data-testId="homeBtn">
        <span class="mr-2">Home</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-btn text @click="routerGoTo('directory')" data-testId="directoryBtn">
        <span class="mr-2">Directory</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-btn text @click="routerGoTo('directoryStore')" data-testId="directoryBtn">
        <span class="mr-2">DirectoryStore</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  methods: {
    routerGoTo(routeName) {
      if (this.$route.name !== routeName) {
        this.$router.push({ name: routeName })
      }
    }
  },
  created() {
    console.log('app')
  }
}
</script>
