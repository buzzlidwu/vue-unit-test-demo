import { mount, shallowMount } from '@vue/test-utils'
import Directory from '@/views/Directory.vue'
import Vuetify from 'vuetify'
import UserCard from '@/components/UserCard.vue'
import { getEmployeeList } from '@/apis/userApi'
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

// describe('Directory.vue', () => {
//   let wrapper
//   beforeEach(() => {
//     wrapper = shallowMount(Directory, {
//       // components: { UserCard }
//     })
//   })
//
//   it('user list is empty should show empty message', async () => {
//     wrapper.vm.employeeList = []
//     await wrapper.vm.$nextTick()
//     console.log(wrapper.html())
//     const emptyMsg = wrapper.find('[data-testId=emptyListMsg]')
//     const userCard = wrapper.find('[data-testId="user-info"]')
//     expect(emptyMsg.element.textContent.trim()).toBe('USER LIST IS EMPTY')
//     expect(userCard.exists()).toBe(false)
//   })
//   it('test att', async () => {
//     wrapper.vm.buttonDisable = true
//     await wrapper.vm.$nextTick()
//     const emptyMsg = wrapper.find('[data-testId=prevBtn]')
//     expect(emptyMsg.attributes('disabled')).toBe('true')
//   })
//
//   it('user list is not empty should render user info', async () => {
//     wrapper.vm.employeeList = mockGetUserResolved
//     console.log(wrapper.html())
//     await wrapper.vm.$nextTick()
//
//     const userListCols = wrapper.findAll('[data-testId=user-info]')
//     expect(userListCols.length).toBe(3)
//   })
//
//   it('call get employee api success should insert employee to employeeList', async () => {
//     getEmployeeList.mockResolvedValue({
//       data: { data: mockGetUserResolved }
//     })
//     wrapper.vm.getUsers()
//
//     expect(wrapper.vm.buttonDisable).toBe(true)
//     expect(wrapper.vm.errorResp).toBe(false)
//     await FlushPromises()
//     expect(wrapper.vm.buttonDisable).toBe(false)
//     expect(wrapper.vm.errorResp).toBe(false)
//
//     expect(wrapper.vm.employeeList.length).toBe(3)
//     expect(wrapper.vm.employeeList).toBe(mockGetUserResolved)
//     expect(wrapper.find('[test-dataId=errorMsg]').element).toBe(undefined)
//   })
//
//   it('gall get employee api failed should clear employeeList', async () => {
//     getEmployeeList.mockRejectedValue(undefined)
//
//     wrapper.vm.getUsers()
//
//     expect(wrapper.vm.buttonDisable).toBe(true)
//     expect(wrapper.vm.errorResp).toBe(false)
//     await FlushPromises()
//
//     expect(wrapper.vm.buttonDisable).toBe(false)
//     expect(wrapper.vm.errorResp).toBe(true)
//
//     expect(wrapper.vm.employeeList.length).toBe(0)
//     expect(wrapper.find("[test-dataId='errorMsg']").element.textContent.trim()).toBe('API CALL ERROR PLEASE TRY AGAIN')
//   })
// })

describe('test vuetify', () => {
  let wrapper
  beforeEach(() => {
    jest.clearAllMocks()
    wrapper = mount(Directory, {
      vuetify: new Vuetify()
    })
    wrapper.vm.getUsers = jest.fn()
  })

  test.each([
    [1, 2],
    [3, 4],
    [5, 6]
  ])('click nextPage button should add page number', async (defaultPage, expected) => {
    wrapper.vm.pageNumber = defaultPage

    await wrapper.find('[data-testId="nextBtn"]').trigger('click')

    expect(wrapper.vm.getUsers).toHaveBeenCalled()
    expect(wrapper.vm.pageNumber).toBe(expected)
  })

  test.each([
    [1, 1, 0],
    [3, 2, 1],
    [4, 3, 1]
  ])('click prevPage button should reduce page number', async (defaultPage, expected, expectedCallApiTimes) => {
    wrapper.vm.pageNumber = defaultPage
    await wrapper.find('[data-testId=prevBtn]').trigger('click')
    expect(wrapper.vm.pageNumber).toBe(expected)
    expect(wrapper.vm.getUsers).toHaveBeenCalledTimes(expectedCallApiTimes)
  })
})
