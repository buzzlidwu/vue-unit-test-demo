import { mount } from '@vue/test-utils'
import App from '@/App'
import Vuetify from 'vuetify'
import { routes } from '@/router'
import VueRouter from 'vue-router'

describe('App.vue', () => {
  const vuetify = new Vuetify()

  const router = new VueRouter({
    mode: 'history',
    routes
  })

  const wrapper = mount(App, {
    vuetify,
    router
  })

  it('click_directory_btn_should_go_to_directory_page', async () => {
    await wrapper.find('[data-testId="directoryBtn"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$route.path).toBe('/directory')
  })
  it('click_home_btn_should_go_to_home_page', async () => {
    await wrapper.find('[data-testId="homeBtn"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$route.path).toBe('/')
  })
})
