import axios from './axios'

export const notificationsApi = {
  getAll: (params = {}) => axios.get('/notifications', { params }),
  getUnreadCount: () => axios.get('/notifications/unread-count'),
  markAsRead: (id) => axios.post(`/notifications/${id}/read`),
  markAllAsRead: () => axios.post('/notifications/read-all'),
}
