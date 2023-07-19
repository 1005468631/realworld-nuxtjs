import { request } from '@/plugins/request'

export const login = data => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data,
  })
}

export const register = data => {
  return request({
    method: 'POST',
    url: '/api/users',
    data,
  })
}

export const getUser = () => {
  return request({
    method: 'GET',
    url: '/api/user',
  })
}

export const UpdateUser = data => {
  return request({
    method: 'PUT',
    url: '/api/user',
    data,
  })
}
