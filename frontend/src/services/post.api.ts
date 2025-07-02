import { Post } from "@/types/Post";
import api from "./axiosInstance";

export const createPost = async (post: { title: string; content: string }) => {
  const response = await api.post("/posts", post);
  return response.data;
};

export const getPosts = async (
  page: number = 1,
  limit: number = 10,
  search: string = ""
) => {
  const response = await api.get<{
    posts: Post[];
    total: number;
    page: number;
    limit: number;
  }>(`/posts?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
  return response.data;
};

export const getPostsByAuthor = async (
  page: number = 1,
  limit: number = 10
) => {
  const response = await api.get<{
    posts: Post[];
    total: number;
    page: number;
    limit: number;
  }>(`/posts/author?page=${page}&limit=${limit}`);
  return response.data;
};

export const updatePost = async (
  id: string,
  post: { title: string; content: string }
) => {
  const response = await api.put(`/posts/${id}`, post);
  return response.data;
};

export const deletePost = async (id: string) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};
