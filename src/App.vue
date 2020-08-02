<template>
  <v-app>
    <v-main>
      <v-row justify="center">
        <v-col cols="6" style="textAlign:center">
          <v-row>
            <v-col cols="4">
              <v-btn large color="error" width="100px" @click.prevent="prevPage" :disabled="pageButtonStatus">Prev Page</v-btn>
            </v-col>
            <v-col cols="4" style="textAlign:center">
              <h1 page-size>{{ page }}</h1>
            </v-col>
            <v-col cols="4" style="textAlign:center">
              <v-btn large color="primary" width="100px" @click.prevent="nextPage" :disabled="pageButtonStatus">Next Page</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" style="textAlign:center" v-if="userLists.length === 0">
          <span>USER LIST IS EMPTY </span>
          <br />
          <span v-if="errorResp" style="color:red;fontSize:30px"> {{ errorMsg }} </span>
        </v-col>
        <v-col cols="4" v-else v-for="user of userLists" :key="user.mail">
          <UserCard :user="user" user-info />
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import UserCard from '@/components/UserCard.vue'

export default {
  name: 'App',

  components: {
    UserCard
  },

  data: () => ({
    page: 0,
    userLists: [],
    pageButtonStatus: false,
    errorResp: false,
    errorMsg: 'API CALL ERROR PLASE TRY AGAIN'
  }),
  watch: {
    page: {
      async handler() {
        await this.getUsers()
      },
      immediate: true
    }
  },
  methods: {
    async getUsers() {
      this.pageButtonStatus = true
      try {
        const res = await this.$axios.get(`https://reqres.in/api/users/?page=${this.page}`)
        const { data } = res.data
        this.userLists = data
        this.setError(false)
      } catch {
        this.setError(true)
      } finally {
        this.pageButtonStatus = true
      }
    },
    setPageButtonStatus(status) {
      this.pageButtonStatus = status
    },
    setError(status) {
      if (status) {
        this.userLists = []
      }
      this.errorResp = status
    },
    nextPage() {
      this.page++
    },
    prevPage() {
      this.page--
    }
  }
}
</script>
