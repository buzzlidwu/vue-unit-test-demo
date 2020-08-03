import { mount, shallowMount } from '@vue/test-utils'
import App from '../../src/App.vue'
import Vuetify from 'vuetify'
import { getUserLists } from '../../src/apis/userApi'
import FlushPromises from 'flush-promises'
jest.mock('../../src/apis/userApi')

const mockGetUserResolved = [
  {
    id: 7,
    email: 'michael.lawson@reqres.in',
    first_name: 'Michael',
    last_name: 'Lawson',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/follettkyle/128.jpg'
  },
  {
    id: 8,
    email: 'lindsay.ferguson@reqres.in',
    first_name: 'Lindsay',
    last_name: 'Ferguson',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/araa3185/128.jpg'
  },
  {
    id: 9,
    email: 'tobias.funke@reqres.in',
    first_name: 'Tobias',
    last_name: 'Funke',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/vivekprvr/128.jpg'
  }
]

describe('App.vue', () => {
  const vuetify = new Vuetify()
  let wrapper
  beforeEach(() => {
    jest.clearAllMocks()
    wrapper = shallowMount(App, {
      vuetify
    })
  })

  it('userlists_is_empty_should_show_empty_msg', async () => {
    wrapper.vm.userLists = []

    await wrapper.vm.$nextTick()

    const emptyMsg = wrapper.find("[data-testId='emptyListMsg']")
    expect(emptyMsg.element.textContent.trim()).toBe('USER LIST IS EMPTY')
  })

  it('userLists_has_user_should_render_user_list_cols', async () => {
    wrapper.vm.userLists = mockGetUserResolved

    await wrapper.vm.$nextTick()

    const userListCols = wrapper.findAll('[data-testId="user-info"]')
    expect(userListCols.length).toBe(3)
  })

  it('getUserApi_resolved_should_insert_data_to_userLists', async () => {
    getUserLists.mockResolvedValue({
      data: { data: mockGetUserResolved }
    })

    wrapper.vm.getUsers()

    expect(wrapper.vm.userLists.length).toBe(0)
    expect(wrapper.vm.userLists).toEqual([])

    await FlushPromises()

    expect(wrapper.vm.userLists.length).toBe(3)
    expect(wrapper.vm.userLists).toBe(mockGetUserResolved)
  })

  it('getUserApi_rejected_should_clear_userlists', async () => {
    wrapper.vm.userLists = mockGetUserResolved
    expect(wrapper.vm.userLists).toEqual(mockGetUserResolved)
    getUserLists.mockRejectedValue()

    wrapper.vm.getUsers()

    await FlushPromises()

    expect(wrapper.vm.userLists).toEqual([])
  })

  it('getUserApi_rejected_should_show_errorMsg', async () => {
    getUserLists.mockRejectedValue()
    wrapper.vm.errorResp = false

    wrapper.vm.getUsers()

    await FlushPromises()

    expect(wrapper.vm.errorResp).toBe(true)
    expect(wrapper.find("[test-dataId='errorMsg']").element.textContent.trim()).toBe('API CALL ERROR PLEASE TRY AGAIN')
  })

  it('getUserApi_resloved_should_turnoff_errorResp_status', async () => {
    getUserLists.mockResolvedValue({ data: { data: [] } })
    expect(wrapper.vm.errorResp).toBe(true)

    wrapper.vm.getUsers()

    await FlushPromises()

    expect(wrapper.vm.errorResp).toBe(false)
    expect(wrapper.find("[test-dataId='errorMsg']").element).toBe(undefined)
  })

  it('call_getUsers_should_close_button', async () => {
    expect(wrapper.vm.pageButtonStatus).toBe(false)

    wrapper.vm.getUsers()
    expect(wrapper.vm.pageButtonStatus).toBe(true)

    await FlushPromises()

    expect(wrapper.vm.pageButtonStatus).toBe(false)
  })
})

describe('next_button_and_prev_button_click', () => {
  let vuetify
  let wrapper
  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(App, {
      vuetify
    })
  })

  it('click_nextPage_button_should_call_nextPage_methods', () => {
    wrapper.vm.nextPage = jest.fn()
    const nextPageBtn = wrapper.find('[data-testId="nextBtn"]')
    nextPageBtn.trigger('click')
    expect(wrapper.vm.nextPage).toHaveBeenCalled()
  })

  it('click_prevPage_button_should_call_nextPage_methods', () => {
    wrapper.vm.prevPage = jest.fn()
    const prevPageBtn = wrapper.find('[data-testId="prevBtn"]')
    prevPageBtn.trigger('click')
    expect(wrapper.vm.prevPage).toHaveBeenCalled()
  })

  it('click_nextPage_button_should_add_page_number_and_call_getUsers', async () => {
    wrapper.vm.getUsers = jest.fn()
    expect(wrapper.vm.page).toBe(1)

    const nextPageBtn = wrapper.find('[data-testId="nextBtn"]')
    nextPageBtn.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.page).toBe(2)
    expect(wrapper.vm.getUsers).toHaveBeenCalled()
  })

  it('click_prevPage_button_should_add_page_number_and_call_getUsers', async () => {
    wrapper.vm.getUsers = jest.fn()
    wrapper.vm.page = 2
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.page).toBe(2)

    const prevPageBtn = wrapper.find('[data-testId="prevBtn"]')
    prevPageBtn.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.page).toBe(1)
    expect(wrapper.vm.getUsers).toHaveBeenCalled()
  })

  it('click_prevPage_when_page_eqaul_1_btn_should_do_nothing', async () => {
    wrapper.vm.getUsers = jest.fn()

    const prevPageBtn = wrapper.find('[data-testId="prevBtn"]')
    prevPageBtn.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.page).toBe(1)
    expect(wrapper.vm.getUsers).toHaveBeenCalledTimes(0)
  })
})
