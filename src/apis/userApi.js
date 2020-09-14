import request from '../plugins/axios'

export const getUserList = pages =>
  request({
    url: `https://reqres.in/api/users/?page=${pages}`,
    methods: 'get'
  })
