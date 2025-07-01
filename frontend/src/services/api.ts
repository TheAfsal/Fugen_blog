import { User } from '@/types/User';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (email: string, password: string) => {
  const response = await api.post('/users/register', { email, password });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/users/login', { email, password });
  return response.data;
};

export const verifyToken = async () => {
  const response = await api.get<{ user: User }>('/users/verify');
  return response.data;
};

export const logoutUser = async () => {
  await api.post('/users/logout');
};

export const createPost = async (post: { title: string; content: string }) => {
  const response = await api.post('/posts', post);
  return response.data;
};

export const getPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

export const updatePost = async (id: string, post: { title: string; content: string }) => {
  const response = await api.put(`/posts/${id}`, post);
  return response.data;
};

export const deletePost = async (id: string) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};