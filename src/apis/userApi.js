import request from '../plugins/axios'

export const getUserLists = pages =>
  request({
    url: `https://reqres.in/api/users/?page=${pages}`,
    methods: 'get'
  })
