import { mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import UserCard from '@/components/UserCard.vue'

describe('UserCard.vue', () => {
  const vuetify = new Vuetify()
  let wrapper
  beforeEach(() => {
    jest.clearAllMocks()
    wrapper = mount(UserCard, {
      vuetify,
      propsData: {
        user: {
          id: 7,
          email: 'michael.lawson@reqres.in',
          first_name: 'Michael',
          last_name: 'Lawson',
          avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/follettkyle/128.jpg'
        }
      }
    })
  })

  it('user name should show fullName', async () => {
    const fullName = 'Michael_Lawson'
    expect(wrapper.vm.fullName).toBe(fullName)
  })
})
