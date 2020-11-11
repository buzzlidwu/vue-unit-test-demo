export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/directory',
    name: 'directory',
    component: () => import('@/views/Directory.vue')
  },
  {
    path: '/directoryStore',
    name: 'directoryStore',
    component: () => import('@/views/DirectoryStore.vue')
  }
]
