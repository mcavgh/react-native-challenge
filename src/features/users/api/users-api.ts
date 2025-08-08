import { apiClient } from '../../../shared/api/api-client';
import { User } from '../../../shared/entities/user';

export const usersApi = {
  getUsers: (): Promise<User[]> => apiClient.get('/users'),
  getUser: (id: number): Promise<User> => apiClient.get(`/users/${id}`),
};