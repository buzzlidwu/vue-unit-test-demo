<template>
  <div>
    <v-row justify="center">
      <v-col cols="6" style="textAlign:center">
        <v-row>
          <v-col cols="4">
            <v-btn large color="error" width="100px" @click.prevent="prevPage" :disabled="buttonDisable" data-testId="prevBtn">Prev Page </v-btn>
          </v-col>
          <v-col cols="4" style="textAlign:center">
            <h1 data-testId="pageNumber">{{ pageNumber }}</h1>
          </v-col>
          <v-col cols="4" style="textAlign:center">
            <v-btn large color="primary" width="100px" @click.prevent="nextPage" :disabled="buttonDisable" data-testId="nextBtn">Next Page </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" style="textAlign:center" v-if="employeeList.length === 0">
        <span data-testId="emptyListMsg">USER LIST IS EMPTY</span>
        <br />
        <span test-dataId="errorMsg" v-if="errorResp" style="color:#ff0000;fontSize:30px"> {{ errorMsg }} </span>
      </v-col>
      <v-col cols="4" v-else v-for="user of employeeList" :key="user.mail" data-testId="user-info">
        <UserCard :user="user" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import UserCard from '@/components/UserCard'
import { getEmployeeList } from '@/apis/userApi'

export default {
  name: 'Directory',
  components: {
    UserCard
  },

  data: () => ({
    pageNumber: 1,
    employeeList: [],
    buttonDisable: false,
    errorResp: false,
    errorMsg: 'API CALL ERROR PLEASE TRY AGAIN'
  }),

  watch: {
    pageNumber: async function() {
      await this.getUsers()
    }
  },

  methods: {
    delay(ms) {
      return new Promise(res => {
        return res()
      })
    },
    async getUsers() {
      this.buttonDisable = true
      this.errorResp = false
      try {
        await this.delay(5000)
        const res = await getEmployeeList(this.pageNumber)
        const { data } = res.data
        this.employeeList = data
      } catch {
        this.errorResp = true
        this.employeeList = []
      } finally {
        this.buttonDisable = false
      }
    },
    nextPage() {
      this.pageNumber++
    },
    prevPage() {
      if (this.pageNumber <= 1) {
        return
      }
      this.pageNumber--
    }
  },

  async created() {
    console.log('Directory')

    await this.getUsers()
  }
}
</script>
