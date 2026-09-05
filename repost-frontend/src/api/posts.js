import api from './axios'
import axios from 'axios'

export const postsApi = {
  getAll: (params) => api.get('/posts', { params }),
  getById: (id) => api.get(`/posts/${id}`),
  create: (data) => api.post('/posts', data),
  update: (id, data) => api.put(`/posts/${id}`, data),
  delete: (id) => api.delete(`/posts/${id}`),
  repost: (id) => api.post(`/posts/${id}/repost`),
  like: (id) => api.post(`/posts/${id}/like`),
  unlike: (id) => api.delete(`/posts/${id}/like`),
  toggleRepost: (id) => api.post(`/posts/${id}/repost`),
  getTrending: () => api.get('/posts/trending'),
  upload: (file) => {
    const formData = new FormData()
    formData.append('file', file)

    const uploadApi = axios.create({
      baseURL: '/api',
      headers: { Accept: 'application/json' },
    })
    uploadApi.interceptors.request.use((config) => {
      const token = sessionStorage.getItem('token')
      if (token) config.headers.Authorization = `Bearer ${token}`
      return config
    })

    return uploadApi.post('/upload', formData)
  },
}