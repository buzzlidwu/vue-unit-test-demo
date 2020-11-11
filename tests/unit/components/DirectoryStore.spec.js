import DirectoryStore from '@/views/DirectoryStore.vue'
import { getEmployeeList } from '@/apis/userApi'
import Vuex from 'vuex'
import { mount } from '@vue/test-utils'
import Vuetify from 'vuetify'

import Store, { ActionTypes } from '@/store'
import flushPromises from 'flush-promises'
jest.mock('@/apis/userApi')

describe('DirectoryStore.vue', () => {
  const actions = {
    [ActionTypes.NEXT_PAGE]: jest.fn(),
    [ActionTypes.PREV_PAGE]: jest.fn(),
    [ActionTypes.GET_EMPLOYEE_LIST]: jest.fn()
  }

  const state = {
    buttonStatus: false,
    errorStatus: false,
    page: 1,
    employeeList: []
  }

  const wrapper = mount(DirectoryStore, {
    vuetify: new Vuetify(),
    store: new Vuex.Store({
      actions,
      state,
      getters: {
        page: state => state.page,
        employee: state => state.employeeList
      }
    })
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('click next button should call store NEXT_PAGE actions', async () => {
    await wrapper.find('[data-testId="nextBtn"]').trigger('click')
    expect(actions[ActionTypes.NEXT_PAGE]).toHaveBeenCalled()
  })

  it('click next button should call store actions', async () => {
    await wrapper.find('[data-testId="prevBtn"]').trigger('click')
    expect(actions[ActionTypes.PREV_PAGE]).toHaveBeenCalled()
  })
})

describe('store', () => {
  beforeEach(() => {
    Store.state.page = 1
    Store.state.employeeList = []
  })
  it('call next page will add page and call get employee lists', async () => {
    const mockEmployee = {
      data: { data: {} }
    }
    getEmployeeList.mockResolvedValue(mockEmployee)
    Store.dispatch(ActionTypes.NEXT_PAGE)
    expect(Store.state.errorStatus).toBe(false)
    expect(Store.state.buttonStatus).toBe(true)
    await flushPromises()
    expect(Store.state.buttonStatus).toBe(false)
    expect(Store.state.page).toBe(2)
  })

  it('call next page will add page and mock api catch', async () => {
    getEmployeeList.mockRejectedValue({})
    Store.dispatch(ActionTypes.NEXT_PAGE)
    expect(Store.state.errorStatus).toBe(false)
    expect(Store.state.buttonStatus).toBe(true)
    await flushPromises()
    expect(Store.state.errorStatus).toBe(true)
    expect(Store.state.buttonStatus).toBe(false)
    expect(Store.state.page).toBe(2)
  })
})
