import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi, postApi, healthCheck, type User, type Post, type CreateUserData, type CreatePostData } from '@/lib/api';

// User hooks
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: userApi.getAll,
  });
};

export const useUser = (id: number) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => userApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: userApi.create,
    onSuccess: (newUser) => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
      
      // Add the new user to the cache
      queryClient.setQueryData(['users'], (oldUsers: User[] | undefined) => {
        return oldUsers ? [...oldUsers, newUser] : [newUser];
      });
    },
  });
};

// Post hooks
export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: postApi.getAll,
  });
};

export const usePost = (id: number) => {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => postApi.getById(id),
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: postApi.create,
    onSuccess: (newPost) => {
      // Invalidate and refetch posts list
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      
      // Add the new post to the cache
      queryClient.setQueryData(['posts'], (oldPosts: Post[] | undefined) => {
        return oldPosts ? [...oldPosts, newPost] : [newPost];
      });
    },
  });
};

// Health check hook
export const useHealthCheck = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: healthCheck,
    refetchInterval: 30000, // Check every 30 seconds
  });
};
