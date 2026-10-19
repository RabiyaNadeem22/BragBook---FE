import { api } from './client';

export const projectsApi = {
  list: (params) => {
    const query = params?.status ? `?status=${encodeURIComponent(params.status)}` : '';
    return api.get(`/projects${query}`);
  },
  get: (id) => api.get(`/projects/${id}`),
  create: (body) => api.post('/projects', body),
  update: (id, body) => api.patch(`/projects/${id}`, body),
  remove: (id) => api.delete(`/projects/${id}`),
};
