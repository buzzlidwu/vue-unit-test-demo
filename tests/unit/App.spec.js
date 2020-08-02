import { mount } from '@vue/test-utils'
import App from '../../src/App.vue'
import Vuetify from 'vuetify'
import { getUserLists } from '../../src/apis/userApi'
import FlushPromises from 'flush-promises'
jest.mock('../../src/apis/userApi')

describe('App.vue', () => {
  const vuetify = new Vuetify()
  let wrapper
  beforeEach(() => {
    jest.clearAllMocks()
    wrapper = mount(App, {
      vuetify,
      data: () => ({
        page: 0
      })
    })
  })

  it('given empty userlists should show empty msg', async () => {
    wrapper.vm.userLists = []
    const emptyMsg = wrapper.find("[data-testId='emptyListMsg']")
    expect(emptyMsg.element.textContent.trim()).toBe('USER LIST IS EMPTY')
  })

  it('mock getUserListApi resolved', async () => {
    getUserLists.mockResolvedValue({
      data: {
        data: [
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
      }
    })

    wrapper.vm.getUsers()
    expect(wrapper.vm.userLists.length).toBe(0)
    expect(wrapper.vm.pageButtonStatus).toBe(true)

    await FlushPromises()

    expect(wrapper.vm.errorResp).toBe(false)
    expect(wrapper.vm.pageButtonStatus).toBe(false)
    expect(wrapper.vm.userLists.length).toBe(3)
    const errorMsg = wrapper.find("[test-dataId='errorMsg']")
    expect(errorMsg.innerHTML).toBe(undefined)

    const userCards = wrapper.findAll('[data-testId="user-info"]')
    expect(userCards.length).toBe(3)
  })

  it('mock getUserListApi Rejected', async () => {
    getUserLists.mockRejectedValue()

    wrapper.vm.getUsers()
    expect(wrapper.vm.pageButtonStatus).toBe(true)

    await FlushPromises()

    expect(wrapper.vm.errorResp).toBe(true)
    expect(wrapper.vm.pageButtonStatus).toBe(false)
    expect(wrapper.find("[data-testId='emptyListMsg']").element.textContent.trim()).toBe('USER LIST IS EMPTY')
    expect(wrapper.find("[test-dataId='errorMsg']").element.textContent.trim()).toBe('API CALL ERROR PLASE TRY AGAIN')
  })

  it('click nextPageButton should call nextPage methods and getUsers', async () => {
    wrapper.vm.getUsers = jest.fn()
    expect(wrapper.vm.page).toBe(0)

    const nextPageBtn = wrapper.find('[data-testId="nextBtn"]')
    nextPageBtn.trigger('click')

    expect(wrapper.vm.page).toBe(1)

    await wrapper.vm.$nextTick()
    const pageSize = wrapper.find('[data-testId="pageSize"]').element.textContent

    expect(wrapper.vm.getUsers).toHaveBeenCalled()
    expect(pageSize).toEqual('1')
  })

  it('click prevPageButton should call prevPage methods and getUsers', async () => {
    wrapper.vm.getUsers = jest.fn()
    expect(wrapper.vm.page).toBe(0)

    const prevPageBtn = wrapper.find('[data-testId="prevBtn"]')
    prevPageBtn.trigger('click')

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.page).toBe(0)

    const pageSize = wrapper.find('[data-testId="pageSize"]').element.textContent
    expect(pageSize).toEqual('0')

    wrapper.vm.page = 2
    await prevPageBtn.trigger('click')

    expect(wrapper.vm.getUsers).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.page).toBe(1)
  })
})
