import { request } from '@/plugins/request'

export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params,
  })
}

export const getFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params,
  })
}

export const addFavorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`,
  })
}

export const delFavorite = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`,
  })
}

export const getArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`,
  })
}

export const createArticles = data => {
  return request({
    method: 'POST',
    url: '/api/articles',
    data,
  })
}

export const updateArticles = data => {
  return request({
    method: 'PUT',
    url: `/api/articles/${data.slug}`,
    data: data.data,
  })
}

export const delArticle = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}`,
  })
}

export const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`,
  })
}
export const addComments = data => {
  return request({
    method: 'POST',
    url: `/api/articles/${data.slug}/comments`,
    data: data.data,
  })
}
export const delComments = data => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${data.slug}/comments/${data.id}`,
  })
}
