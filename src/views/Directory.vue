<template>
  <div>
    <v-row justify="center">
      <v-col cols="6" style="textAlign:center">
        <v-row>
          <v-col cols="4">
            <v-btn large color="error" width="100px" @click.prevent="prevPage" :disabled="pageButtonStatus" data-testId="prevBtn">Prev Page</v-btn>
          </v-col>
          <v-col cols="4" style="textAlign:center">
            <h1 data-testId="pageSize">{{ page }}</h1>
          </v-col>
          <v-col cols="4" style="textAlign:center">
            <v-btn large color="primary" width="100px" @click.prevent="nextPage" :disabled="pageButtonStatus" data-testId="nextBtn">Next Page</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" style="textAlign:center" v-if="userList.length === 0">
        <span data-testId="emptyListMsg">USER LIST IS EMPTY</span>
        <br />
        <span test-dataId="errorMsg" v-if="errorResp" style="color:red;fontSize:30px"> {{ errorMsg }} </span>
      </v-col>
      <v-col cols="4" v-else v-for="user of userList" :key="user.mail" data-testId="user-info">
        <UserCard :user="user" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import UserCard from '@/components/UserCard'
import { getUserList } from '@/apis/userApi'

export default {
  name: 'AddressBook',
  components: {
    UserCard
  },

  data: () => ({
    page: 1,
    userList: [],
    pageButtonStatus: false,
    errorResp: false,
    errorMsg: 'API CALL ERROR PLEASE TRY AGAIN'
  }),

  watch: {
    async page() {
      await this.getUsers()
    }
  },

  methods: {
    delay(ms) {
      return new Promise(res => {
        setTimeout(res, ms)
      })
    },
    async getUsers() {
      this.pageButtonStatus = true
      try {
        // await this.delay(2000)
        const res = await getUserList(this.page)
        const { data } = res.data
        this.userList = data
        this.errorResp = false
      } catch {
        this.errorResp = true
        this.userList = []
      } finally {
        this.pageButtonStatus = false
      }
    },
    nextPage() {
      this.page++
    },
    prevPage() {
      if (this.page <= 1) {
        return
      }
      this.page--
    }
  },

  async created() {
    await this.getUsers()
  }
}
</script>
