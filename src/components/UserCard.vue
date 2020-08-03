<template>
  <v-card class="mx-auto" max-width="300" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">STAFF</div>
        <v-list-item-title class="headline mb-1" data-testId="fullName">{{ fullName }}</v-list-item-title>
        <v-list-item-subtitle data-testId="email">{{ user.email }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey">
        <v-img :src="user.avatar" data-testId="avatar" />
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
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
