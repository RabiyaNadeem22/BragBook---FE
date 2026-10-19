import { api } from './client';

export const goalsApi = {
  list: (params = {}) => {
    const query = new URLSearchParams();
    if (params.status) query.set('status', params.status);
    if (params.priority) query.set('priority', params.priority);
    const qs = query.toString();
    return api.get(`/goals${qs ? `?${qs}` : ''}`);
  },
  get: (id) => api.get(`/goals/${id}`),
  create: (body) => api.post('/goals', body),
  update: (id, body) => api.patch(`/goals/${id}`, body),
  remove: (id) => api.delete(`/goals/${id}`),
};
