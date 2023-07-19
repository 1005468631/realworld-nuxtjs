import { request } from '@/plugins/request'

export const getFollowUser = username => {
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`,
  })
}

// export const setFollowUser = params => {
//   return request({
//     method: 'POST',
//     url: `/api/profiles/${username}/follow`,
//     params,
//   })
// }

// export const delFollowUser = params => {
//   return request({
//     method: 'DELETE',
//     url: `/api/profiles/${username}/follow`,
//     params,
//   })
// }
