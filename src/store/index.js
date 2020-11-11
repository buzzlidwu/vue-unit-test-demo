import Vue from 'vue'
import Vuex from 'vuex'
import { getEmployeeList } from '@/apis/userApi'

export const MutationsTypes = {
  ADD_PAGE_NUMBER: 'ADD_PAGE_NUMBER',
  REDUCE_PAGE_NUMBER: 'REDUCE_PAGE_NUMBER',
  SET_EMPLOYEE: 'SET_EMPLOYEE',
  SET_BUTTON_STATUS: 'SET_BUTTON_STATUS',
  SET_ERROR_STATUS: 'SET_ERROR_STATUS'
}
export const ActionTypes = {
  GET_EMPLOYEE_LIST: 'GET_EMPLOYEE_LIST',
  PREV_PAGE: 'PREV_PAGE',
  NEXT_PAGE: 'NEXT_PAGE'
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    buttonStatus: false,
    errorStatus: false,
    page: 1,
    employeeList: []
  },
  mutations: {
    [MutationsTypes.ADD_PAGE_NUMBER]: state => state.page++,
    [MutationsTypes.REDUCE_PAGE_NUMBER]: state => state.page--,
    [MutationsTypes.SET_EMPLOYEE]: (state, employeeList) => (state.employeeList = employeeList),
    [MutationsTypes.SET_BUTTON_STATUS]: (state, status) => (state.buttonStatus = status),
    [MutationsTypes.SET_ERROR_STATUS]: (state, status) => (state.errorStatus = status)
  },
  actions: {
    [ActionTypes.NEXT_PAGE]: async ({ dispatch, commit }) => {
      commit(MutationsTypes.ADD_PAGE_NUMBER)
      await dispatch(ActionTypes.GET_EMPLOYEE_LIST)
    },
    [ActionTypes.PREV_PAGE]: async ({ dispatch, commit, state }) => {
      if (state.page > 1) {
        commit(MutationsTypes.REDUCE_PAGE_NUMBER)
        await dispatch(ActionTypes.GET_EMPLOYEE_LIST)
      }
    },
    [ActionTypes.GET_EMPLOYEE_LIST]: async ({ commit, state }) => {
      commit(MutationsTypes.SET_BUTTON_STATUS, true)
      commit(MutationsTypes.SET_ERROR_STATUS, false)
      try {
        // await dispatch('delay', 3000)
        const { data: resp } = await getEmployeeList(state.page)
        commit(MutationsTypes.SET_EMPLOYEE, resp.data)
      } catch (e) {
        commit(MutationsTypes.SET_ERROR_STATUS, true)
      } finally {
        commit(MutationsTypes.SET_BUTTON_STATUS, false)
      }
    }
  },
  getters: {
    page: state => state.page,
    employee: state => state.employeeList
  },
  modules: {}
})
