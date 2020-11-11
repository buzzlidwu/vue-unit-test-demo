<template>
  <div>
    <v-row justify="center">
      <v-col cols="6" style="textAlign:center">
        <v-row>
          <v-col cols="4">
            <v-btn large color="error" width="100px" @click.prevent="prevPage" :disabled="buttonStatus" data-testId="prevBtn">Prev Page</v-btn>
          </v-col>
          <v-col cols="4" style="textAlign:center">
            <h1 data-testId="pageSize">{{ page }}</h1>
          </v-col>
          <v-col cols="4" style="textAlign:center">
            <v-btn large color="primary" width="100px" @click.prevent="nextPage" :disabled="buttonStatus" data-testId="nextBtn">Next Page</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" style="textAlign:center" v-if="employee.length === 0">
        <span data-testId="emptyListMsg">USER LIST IS EMPTY</span>
        <br />
        <span test-dataId="errorMsg" v-if="errorStatus" style="color:red;fontSize:30px"> {{ errorMsg }} </span>
      </v-col>
      <v-col cols="4" v-else v-for="user of employee" :key="user.mail" data-testId="user-info">
        <UserCard :user="user" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import UserCard from '@/components/UserCard'
import { mapActions, mapGetters, mapState } from 'vuex'
import { ActionTypes } from '@/store'
export default {
  name: 'DirectoryStore',
  components: {
    UserCard
  },

  data: () => ({
    errorMsg: 'API CALL ERROR PLEASE TRY AGAIN'
  }),

  methods: {
    ...mapActions({
      nextPage: ActionTypes.NEXT_PAGE,
      prevPage: ActionTypes.PREV_PAGE,
      getEmployeeList: ActionTypes.GET_EMPLOYEE_LIST
    })
  },
  computed: {
    ...mapState(['errorStatus', 'buttonStatus']),
    ...mapGetters(['page', 'employee'])
  },

  async created() {
    await this.getEmployeeList()
  }
}
</script>
