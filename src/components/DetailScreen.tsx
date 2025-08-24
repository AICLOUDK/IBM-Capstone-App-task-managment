import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { ArrowLeft, Save, Trash2, Star } from 'lucide-react';
import { Task } from '../App';

interface DetailScreenProps {
  task: Task;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onToggleFavorite: (taskId: string) => void;
  onNavigateBack: () => void;
}

export function DetailScreen({ task, onUpdateTask, onDeleteTask, onToggleFavorite, onNavigateBack }: DetailScreenProps) {
  const [editedTask, setEditedTask] = useState<Task>(task);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (field: keyof Task, value: any) => {
    setEditedTask(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onUpdateTask(editedTask);
    setHasChanges(false);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      onDeleteTask(task.id);
    }
  };

  const handleToggleFavorite = () => {
    onToggleFavorite(task.id);
    // Update local state to reflect the change immediately
    setEditedTask(prev => ({ ...prev, favorite: !prev.favorite }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={onNavigateBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl">Task Details</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleToggleFavorite}
              title={editedTask.favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star className={`h-5 w-5 ${editedTask.favorite ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`} />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleDelete}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
            <Button 
              size="sm"
              onClick={handleSave}
              disabled={!hasChanges}
            >
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Edit Task</CardTitle>
              <div className="flex items-center space-x-2">
                <Badge className={getPriorityColor(editedTask.priority)}>
                  {editedTask.priority}
                </Badge>
                <Badge variant={editedTask.completed ? 'default' : 'secondary'}>
                  {editedTask.completed ? 'Completed' : 'Pending'}
                </Badge>
                {editedTask.favorite && (
                  <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Favorite
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Task Completion Toggle */}
            <div className="flex items-center justify-between">
              <Label htmlFor="completed">Mark as completed</Label>
              <Switch
                id="completed"
                checked={editedTask.completed}
                onCheckedChange={(checked) => handleChange('completed', checked)}
              />
            </div>

            {/* Favorite Toggle */}
            <div className="flex items-center justify-between">
              <Label htmlFor="favorite">Add to favorites</Label>
              <Switch
                id="favorite"
                checked={editedTask.favorite}
                onCheckedChange={(checked) => handleChange('favorite', checked)}
              />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editedTask.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter task title"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editedTask.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Enter task description"
                rows={4}
              />
            </div>

            {/* Priority and Due Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select 
                  value={editedTask.priority} 
                  onValueChange={(value) => handleChange('priority', value)}
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
                  value={editedTask.dueDate}
                  onChange={(e) => handleChange('dueDate', e.target.value)}
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={editedTask.category}
                onChange={(e) => handleChange('category', e.target.value)}
                placeholder="Enter task category"
              />
            </div>

            {/* Task Metadata */}
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="mb-2">Task Information</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong>Task ID:</strong> {task.id}</p>
                <p><strong>Created:</strong> {new Date(parseInt(task.id)).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {editedTask.completed ? 'Completed' : 'In Progress'}</p>
                <p><strong>Favorite:</strong> {editedTask.favorite ? 'Yes' : 'No'}</p>
              </div>
            </div>

            {hasChanges && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  You have unsaved changes. Don't forget to save your modifications!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}