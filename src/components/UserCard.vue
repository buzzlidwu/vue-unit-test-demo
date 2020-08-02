<template>
  <v-card class="" max-width="300" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">TITANSOFT</div>
        <v-list-item-title class="headline mb-1">{{ fullName }}</v-list-item-title>
        <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey">
        <v-img :src="user.avatar" />
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    fullName() {
      const { first_name, last_name } = this.user
      return `${first_name}_${last_name}`
    }
  }
}
</script>
