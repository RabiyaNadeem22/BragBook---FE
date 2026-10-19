import { api } from './client';

export const skillsApi = {
  list: (params) => {
    const query = params?.category ? `?category=${encodeURIComponent(params.category)}` : '';
    return api.get(`/skills${query}`);
  },
  get: (id) => api.get(`/skills/${id}`),
  create: (body) => api.post('/skills', body),
  update: (id, body) => api.patch(`/skills/${id}`, body),
  remove: (id) => api.delete(`/skills/${id}`),
};
