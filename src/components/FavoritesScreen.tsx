import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Star, Eye, Heart } from 'lucide-react';
import { User, Task } from '../App';

interface FavoritesScreenProps {
  user: User;
  tasks: Task[];
  onViewTask: (task: Task) => void;
  onToggleFavorite: (taskId: string) => void;
  onNavigateBack: () => void;
}

export function FavoritesScreen({ user, tasks, onViewTask, onToggleFavorite, onNavigateBack }: FavoritesScreenProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const completedFavorites = tasks.filter(task => task.completed).length;
  const pendingFavorites = tasks.filter(task => !task.completed).length;
  const highPriorityFavorites = tasks.filter(task => task.priority === 'high').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={onNavigateBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl">Favorite Tasks</h1>
              <p className="text-sm text-muted-foreground">Your starred and important tasks</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-500 fill-current" />
            <span className="text-sm">{tasks.length}</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <Heart className="h-4 w-4 mr-2 text-red-500" />
                Total Favorites
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{tasks.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <Star className="h-4 w-4 mr-2 text-green-600" />
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-green-600">{completedFavorites}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <Badge className="h-4 w-4 mr-2 bg-destructive" />
                High Priority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-destructive">{highPriorityFavorites}</div>
            </CardContent>
          </Card>
        </div>

        {/* Favorites List */}
        <Card>
          <CardHeader>
            <CardTitle>My Favorite Tasks</CardTitle>
            <CardDescription>
              Tasks you've marked as favorites for quick access
            </CardDescription>
          </CardHeader>
          <CardContent>
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <Star className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg mb-2">No favorite tasks yet</h3>
                <p className="text-muted-foreground mb-4">
                  Star tasks from your task list to see them here
                </p>
                <Button variant="outline" onClick={onNavigateBack}>
                  Go Back to Tasks
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className={`${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                          </h3>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        </div>
                        
                        {task.description && (
                          <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                        )}
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Category: {task.category}</span>
                          {task.dueDate && (
                            <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                          )}
                          <Badge variant={task.completed ? 'default' : 'secondary'}>
                            {task.completed ? 'Completed' : 'Pending'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onToggleFavorite(task.id)}
                        >
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
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
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        {tasks.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  tasks.filter(task => !task.completed).forEach(task => onViewTask(task));
                }}
              >
                Focus on Pending ({pendingFavorites})
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  tasks.filter(task => task.priority === 'high').forEach(task => onViewTask(task));
                }}
              >
                High Priority First ({highPriorityFavorites})
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const today = new Date().toDateString();
                  const dueTodayTasks = tasks.filter(task => 
                    task.dueDate && new Date(task.dueDate).toDateString() === today
                  );
                  if (dueTodayTasks.length > 0) {
                    onViewTask(dueTodayTasks[0]);
                  }
                }}
              >
                Due Today
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}