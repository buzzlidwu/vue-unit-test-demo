import { mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import UserCard from '@/components/UserCard.vue'
const mockUser = {
  id: 7,
  email: 'michael.lawson@reqres.in',
  first_name: 'Michael',
  last_name: 'Lawson',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/follettkyle/128.jpg'
}
describe('UserCard.vue', () => {
  const vuetify = new Vuetify()
  const wrapper = mount(UserCard, {
    vuetify,
    propsData: {
      user: mockUser
    }
  })

  it('has_username_info_should_computed_fullName', async () => {
    const fullName = 'Michael_Lawson'
    expect(wrapper.vm.fullName).toBe(fullName)
  })

  it('fullname_should_render_in_fullname_col', () => {
    const fullName = `${mockUser.first_name}_${mockUser.last_name}`
    const fullNameView = wrapper.find("[data-testId='fullName']")
    expect(fullNameView.text()).toBe(fullName)
  })

  it('avatar_should_render_in_avatar_col', () => {
    const fullNameView = wrapper.find("[data-testId='avatar']")
    expect(fullNameView.props('src')).toBe(mockUser.avatar)
  })

  it('email_should_render_in_email_col', () => {
    const fullNameView = wrapper.find("[data-testId='email']")
    expect(fullNameView.text()).toBe(mockUser.email)
  })

  it('user_props_should_always_required', () => {
    expect(UserCard.props.user.required).toBe(true)
  })
})
