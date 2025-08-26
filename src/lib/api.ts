// API configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// User API functions
export const userApi = {
  // Get all users
  getAll: () => apiRequest<User[]>('/users'),
  
  // Get user by ID
  getById: (id: number) => apiRequest<User>(`/users/${id}`),
  
  // Create new user
  create: (userData: CreateUserData) => 
    apiRequest<User>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
};

// Post API functions
export const postApi = {
  // Get all posts
  getAll: () => apiRequest<Post[]>('/posts'),
  
  // Get post by ID
  getById: (id: number) => apiRequest<Post>(`/posts/${id}`),
  
  // Create new post
  create: (postData: CreatePostData) => 
    apiRequest<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    }),
};

// Health check
export const healthCheck = () => apiRequest<HealthResponse>('/health');

// Type definitions
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
}

export interface CreateUserData {
  name: string;
  email: string;
}

export interface CreatePostData {
  title: string;
  content: string;
  authorId: number;
}

export interface HealthResponse {
  status: string;
  message: string;
}
