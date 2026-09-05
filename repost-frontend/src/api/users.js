import api from './axios'

export const usersApi = {
  getById: (id) => api.get(`/users/${id}`),
  updateProfile: (data) => api.put('/users/profile', data),
  uploadAvatar: (file) => {
    const formData = new FormData()
    formData.append('avatar', file)
    return api.post('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  search: (query) => api.get('/users/search', { params: { q: query } }),
  getSuggested: () => api.get('/users/suggested'),
  getStats: (userId) => api.get(`/users/${userId}/stats`),
  follow: (userId) => api.post(`/users/${userId}/follow`),
  getFollowers: (userId) => api.get(`/users/${userId}/followers`),
  getFollowing: (userId) => api.get(`/users/${userId}/following`),
}
