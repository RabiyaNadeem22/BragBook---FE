import { api } from './client';

export const achievementsApi = {
  list: (params = {}) => {
    const query = new URLSearchParams();
    if (params.category) query.set('category', params.category);
    if (params.projectId) query.set('projectId', params.projectId);
    if (params.search) query.set('search', params.search);
    const qs = query.toString();
    return api.get(`/achievements${qs ? `?${qs}` : ''}`);
  },
  get: (id) => api.get(`/achievements/${id}`),
  create: (body) => api.post('/achievements', body),
  update: (id, body) => api.patch(`/achievements/${id}`, body),
  remove: (id) => api.delete(`/achievements/${id}`),
};
