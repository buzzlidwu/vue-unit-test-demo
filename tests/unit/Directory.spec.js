import { mount, shallowMount } from '@vue/test-utils'
import Directory from '@/views/Directory'
import Vuetify from 'vuetify'
import { getUserList } from '@/apis/userApi'
import FlushPromises from 'flush-promises'
jest.mock('@/apis/userApi')

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

describe('Directory.vue', () => {
  const vuetify = new Vuetify()
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Directory, {
      vuetify
    })
  })

  it('userlists_is_empty_should_show_empty_msg', async () => {
    wrapper.vm.userList = []

    await wrapper.vm.$nextTick()

    const emptyMsg = wrapper.find("[data-testId='emptyListMsg']")
    expect(emptyMsg.element.textContent.trim()).toBe('USER LIST IS EMPTY')
  })

  it('userLists_has_user_should_render_user_list_cols', async () => {
    wrapper.vm.userList = mockGetUserResolved

    await wrapper.vm.$nextTick()

    const userListCols = wrapper.findAll('[data-testId="user-info"]')
    expect(userListCols.length).toBe(3)
  })

  it('getUserApi_resolved_should_insert_data_to_userList', async () => {
    getUserList.mockResolvedValue({
      data: { data: mockGetUserResolved }
    })

    wrapper.vm.getUsers()

    expect(wrapper.vm.userList.length).toBe(0)
    expect(wrapper.vm.userList).toEqual([])

    await FlushPromises()

    expect(wrapper.vm.userList.length).toBe(3)
    expect(wrapper.vm.userList).toBe(mockGetUserResolved)
  })

  it('getUserApi_rejected_should_clear_userlist', async () => {
    wrapper.vm.userList = mockGetUserResolved
    expect(wrapper.vm.userList).toEqual(mockGetUserResolved)

    getUserList.mockRejectedValue(undefined)

    wrapper.vm.getUsers()

    await FlushPromises()

    expect(wrapper.vm.userList).toEqual([])
  })

  it('getUserApi_rejected_should_show_errorMsg', async () => {
    getUserList.mockRejectedValue(undefined)
    wrapper.vm.errorResp = false

    wrapper.vm.getUsers()

    await FlushPromises()

    expect(wrapper.vm.errorResp).toBe(true)
    expect(wrapper.find("[test-dataId='errorMsg']").element.textContent.trim()).toBe('API CALL ERROR PLEASE TRY AGAIN')
  })

  it('getUserApi_resolved_should_turnoff_errorResp_status', async () => {
    getUserList.mockResolvedValue({ data: { data: [] } })
    expect(wrapper.vm.errorResp).toBe(true)

    await wrapper.vm.getUsers()

    expect(wrapper.vm.errorResp).toBe(false)
    expect(wrapper.find("[test-dataId='errorMsg']").element).toBe(undefined)
  })

  it('call_getUsers_should_close_button', async () => {
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
    wrapper = mount(Directory, {
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

  it('should_add_page_number', async () => {
    wrapper.vm.getUsers = jest.fn()
    expect(wrapper.vm.page).toBe(1)

    wrapper.vm.nextPage()

    expect(wrapper.vm.page).toBe(2)
  })

  it('should_reduce_page_number', async () => {
    wrapper.vm.getUsers = jest.fn()
    wrapper.vm.page = 2

    expect(wrapper.vm.page).toBe(2)

    wrapper.vm.prevPage()

    expect(wrapper.vm.page).toBe(1)
  })

  it('page_number_cannot_less_than_1', async () => {
    wrapper.vm.getUsers = jest.fn()
    expect(wrapper.vm.page).toBe(1)

    wrapper.vm.prevPage()

    expect(wrapper.vm.page).toBe(1)
  })
})
