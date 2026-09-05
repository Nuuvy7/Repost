import api from './axios'

export const commentsApi = {
  getByPost: (postId, params) => api.get(`/posts/${postId}/comments`, { params }),
  create: (postId, data) => api.post(`/posts/${postId}/comments`, data),
  delete: (postId, id) => api.delete(`/posts/${postId}/comments/${id}`),
}
