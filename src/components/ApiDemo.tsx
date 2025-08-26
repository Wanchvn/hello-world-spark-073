import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUsers, usePosts, useCreateUser, useCreatePost, useHealthCheck } from '@/hooks/useApi';
import { toast } from 'sonner';

export default function ApiDemo() {
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [newPost, setNewPost] = useState({ title: '', content: '', authorId: 1 });

  // API hooks
  const { data: users, isLoading: usersLoading, error: usersError } = useUsers();
  const { data: posts, isLoading: postsLoading, error: postsError } = usePosts();
  const { data: health, isLoading: healthLoading } = useHealthCheck();
  
  const createUserMutation = useCreateUser();
  const createPostMutation = useCreatePost();

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await createUserMutation.mutateAsync(newUser);
      setNewUser({ name: '', email: '' });
      toast.success('User created successfully!');
    } catch (error) {
      toast.error('Failed to create user');
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await createPostMutation.mutateAsync(newPost);
      setNewPost({ title: '', content: '', authorId: 1 });
      toast.success('Post created successfully!');
    } catch (error) {
      toast.error('Failed to create post');
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Frontend-Backend Connection Demo</h1>
        <p className="text-muted-foreground">
          This demonstrates how your React frontend connects to the Express.js backend
        </p>
      </div>

      {/* Health Check */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Backend Status
            {healthLoading ? (
              <Badge variant="secondary">Checking...</Badge>
            ) : health?.status === 'OK' ? (
              <Badge variant="default" className="bg-green-500">Connected</Badge>
            ) : (
              <Badge variant="destructive">Disconnected</Badge>
            )}
          </CardTitle>
          <CardDescription>
            Backend server health status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {health && (
            <p className="text-sm text-muted-foreground">
              {health.message}
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users Section */}
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage users from the backend</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Create User Form */}
            <form onSubmit={handleCreateUser} className="space-y-3">
              <Input
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
              <Input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
              <Button 
                type="submit" 
                disabled={createUserMutation.isPending}
                className="w-full"
              >
                {createUserMutation.isPending ? 'Creating...' : 'Create User'}
              </Button>
            </form>

            {/* Users List */}
            <div className="space-y-2">
              <h4 className="font-medium">Current Users:</h4>
              {usersLoading ? (
                <p className="text-sm text-muted-foreground">Loading users...</p>
              ) : usersError ? (
                <p className="text-sm text-red-500">Error loading users</p>
              ) : (
                <div className="space-y-2">
                  {users?.map((user) => (
                    <div key={user.id} className="p-3 bg-muted rounded-lg">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Posts Section */}
        <Card>
          <CardHeader>
            <CardTitle>Posts</CardTitle>
            <CardDescription>Manage posts from the backend</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Create Post Form */}
            <form onSubmit={handleCreatePost} className="space-y-3">
              <Input
                placeholder="Title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              />
              <Textarea
                placeholder="Content"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Author ID"
                value={newPost.authorId}
                onChange={(e) => setNewPost({ ...newPost, authorId: parseInt(e.target.value) })}
              />
              <Button 
                type="submit" 
                disabled={createPostMutation.isPending}
                className="w-full"
              >
                {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
              </Button>
            </form>

            {/* Posts List */}
            <div className="space-y-2">
              <h4 className="font-medium">Current Posts:</h4>
              {postsLoading ? (
                <p className="text-sm text-muted-foreground">Loading posts...</p>
              ) : postsError ? (
                <p className="text-sm text-red-500">Error loading posts</p>
              ) : (
                <div className="space-y-2">
                  {posts?.map((post) => (
                    <div key={post.id} className="p-3 bg-muted rounded-lg">
                      <p className="font-medium">{post.title}</p>
                      <p className="text-sm text-muted-foreground">{post.content}</p>
                      <p className="text-xs text-muted-foreground">Author ID: {post.authorId}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Info */}
      <Card>
        <CardHeader>
          <CardTitle>API Information</CardTitle>
          <CardDescription>Backend server details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><strong>Base URL:</strong> http://localhost:5000/api</p>
            <p><strong>Available Endpoints:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>GET /api/users - Get all users</li>
              <li>GET /api/users/:id - Get user by ID</li>
              <li>POST /api/users - Create new user</li>
              <li>GET /api/posts - Get all posts</li>
              <li>GET /api/posts/:id - Get post by ID</li>
              <li>POST /api/posts - Create new post</li>
              <li>GET /api/health - Health check</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
