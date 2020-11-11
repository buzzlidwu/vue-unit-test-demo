import request from '../plugins/axios'

export const getEmployeeList = pages =>
  request({
    url: `https://reqres.in/api/users/?page=${pages}`,
    methods: 'get'
  })
