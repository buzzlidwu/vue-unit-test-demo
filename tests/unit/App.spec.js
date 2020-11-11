import { createLocalVue, mount } from '@vue/test-utils'
import App from '@/App.vue'
import Vuetify from 'vuetify'
import { routes } from '@/router/baseRoute'
import VueRouter from 'vue-router'
import Directory from '@/views/Directory.vue'
const localVue = createLocalVue()
localVue.use(VueRouter)

// describe('App.vue', () => {
//   let wrapper
//   const router = new VueRouter({
//     mode: 'history',
//     routes
//   })
//   beforeEach(() => {
//     wrapper = mount(App, {
//       vuetify: new Vuetify(),
//       router,
//       localVue
//     })
//   })
//
//   afterEach(() => {
//     wrapper.vm.$router.push('/')
//   })
//
//   it('click directory btn should go to directory page', async () => {
//     console.log(wrapper.vm.$route.path)
//     await wrapper.find('[data-testId="directoryBtn"]').trigger('click')
//     await wrapper.vm.$nextTick()
//     expect(wrapper.findComponent(Directory).exists()).toBe(true)
//     console.log(wrapper.vm.$route.path)
//     expect(wrapper.vm.$route.path).toBe('/directory')
//   })
//   it('click_home_btn_should_go_to_home_page', async () => {
//     await wrapper.find('[data-testId="homeBtn"]').trigger('click')
//     await wrapper.vm.$nextTick()
//     expect(wrapper.vm.$route.path).toBe('/')
//   })
// })
describe('test mock vue router', () => {
  const wrapper = mount(App, {
    vuetify: new Vuetify(),
    mocks: {
      $router: {
        push: jest.fn(({ name }) => {
          wrapper.vm.$route.name = name
        })
      },
      $route: { name: '' }
    }
  })
  it('click directory btn should go to directory page', async () => {
    await wrapper.find('[data-testId="directoryBtn"]').trigger('click')

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'directory' })
    let callParameter = wrapper.vm.$router.push.mock.calls[0][0]
    expect(routes.filter(x => x.name === callParameter.name)).toHaveLength(1)
  })
})
