import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Settings, Plus, LogOut, Eye, Star, User, Heart } from 'lucide-react';
import { User as UserType, Task, AppScreen } from '../App';

interface HomeScreenProps {
  user: UserType;
  tasks: Task[];
  onViewTask: (task: Task) => void;
  onAddTask: (task: Task) => void;
  onToggleFavorite: (taskId: string) => void;
  onNavigateTo: (screen: AppScreen) => void;
  onLogout: () => void;
}

export function HomeScreen({ 
  user, 
  tasks, 
  onViewTask, 
  onAddTask, 
  onToggleFavorite,
  onNavigateTo, 
  onLogout 
}: HomeScreenProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    category: 'personal',
    dueDate: ''
  });
  const [apiTasks, setApiTasks] = useState<any[]>([]);
  const [isLoadingApi, setIsLoadingApi] = useState(false);

  // Fetch data from external API (mock JSON placeholder)
  useEffect(() => {
    fetchApiData();
  }, []);

  const fetchApiData = async () => {
    setIsLoadingApi(true);
    try {
      // Mock API call - in a real app this would be an actual API
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
      const data = await response.json();
      setApiTasks(data);
    } catch (error) {
      console.error('Failed to fetch API data:', error);
      // Fallback to mock data
      setApiTasks([
        { id: 1, title: 'Complete project proposal', completed: false },
        { id: 2, title: 'Review team feedback', completed: true },
        { id: 3, title: 'Schedule client meeting', completed: false }
      ]);
    } finally {
      setIsLoadingApi(false);
    }
  };

  const handleAddTask = () => {
    if (!newTask.title) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      completed: false,
      priority: newTask.priority,
      dueDate: newTask.dueDate,
      category: newTask.category,
      favorite: false
    };

    onAddTask(task);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      category: 'personal',
      dueDate: ''
    });
    setIsAddDialogOpen(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const favoriteTasks = tasks.filter(task => task.favorite).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground text-xl font-bold">k</span>
            </div>
            <div>
              <h1 className="text-xl">ktech</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {user.username}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onNavigateTo('profile')}
              title="Profile"
            >
              <User className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onNavigateTo('favorites')}
              title="Favorites"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onNavigateTo('settings')}
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onLogout}
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{totalTasks}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-green-600">{completedTasks}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Favorites</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-yellow-600">{favoriteTasks}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl">
                {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Navigate to your favorite sections</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onNavigateTo('favorites')}
            >
              <Star className="h-4 w-4 mr-1" />
              Favorites ({favoriteTasks})
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onNavigateTo('profile')}
            >
              <User className="h-4 w-4 mr-1" />
              Profile
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onNavigateTo('settings')}
            >
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </Button>
          </CardContent>
        </Card>

        {/* Add Task Button */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl">My Tasks</h2>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogDescription>
                  Create a new task to stay organized.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter task title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newTask.description}
                    onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter task description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select 
                      value={newTask.priority} 
                      onValueChange={(value) => setNewTask(prev => ({ ...prev, priority: value as any }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTask}>Add Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No tasks yet. Add your first task to get started!</p>
              </CardContent>
            </Card>
          ) : (
            tasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className={`${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </h3>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        {task.favorite && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      {task.description && (
                        <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                      )}
                      {task.dueDate && (
                        <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onToggleFavorite(task.id)}
                      >
                        <Star className={`h-4 w-4 ${task.favorite ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewTask(task)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* API Data Section */}
        <Card>
          <CardHeader>
            <CardTitle>External API Data</CardTitle>
            <CardDescription>
              Sample data fetched from JSONPlaceholder API
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingApi ? (
              <p>Loading external data...</p>
            ) : (
              <div className="space-y-2">
                {apiTasks.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 border rounded">
                    <span className={item.completed ? 'line-through text-muted-foreground' : ''}>
                      {item.title}
                    </span>
                    <Badge variant={item.completed ? 'secondary' : 'default'}>
                      {item.completed ? 'Done' : 'Pending'}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}