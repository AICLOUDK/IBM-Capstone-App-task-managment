import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ArrowLeft, Edit, Save, Calendar, CheckCircle, Clock, Star } from 'lucide-react';
import { User, Task, AppScreen } from '../App';

interface ProfileScreenProps {
  user: User;
  tasks: Task[];
  onUpdateProfile: (user: User) => void;
  onNavigateBack: () => void;
  onNavigateTo: (screen: AppScreen) => void;
}

export function ProfileScreen({ user, tasks, onUpdateProfile, onNavigateBack, onNavigateTo }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(user);

  const handleSave = () => {
    onUpdateProfile(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const favoriteTasks = tasks.filter(task => task.favorite).length;
  const overdueTasks = tasks.filter(task => {
    if (!task.dueDate || task.completed) return false;
    return new Date(task.dueDate) < new Date();
  }).length;

  const getCompletionRate = () => {
    if (totalTasks === 0) return 0;
    return Math.round((completedTasks / totalTasks) * 100);
  };

  const getMemberSince = () => {
    if (!user.joinDate) return 'Recently';
    const joinDate = new Date(user.joinDate);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[joinDate.getMonth()]} ${joinDate.getFullYear()}`;
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
            <h1 className="text-xl">Profile</h1>
          </div>
          <Button
            variant={isEditing ? "default" : "outline"}
            size="sm"
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-1" />
                Save
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </>
            )}
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Profile Info */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="text-xl">
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-4">
                {isEditing ? (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={editedUser.username}
                        onChange={(e) => setEditedUser(prev => ({ ...prev, username: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editedUser.email}
                        onChange={(e) => setEditedUser(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself..."
                        value={editedUser.bio || ''}
                        onChange={(e) => setEditedUser(prev => ({ ...prev, bio: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={handleSave}>Save Changes</Button>
                      <Button size="sm" variant="outline" onClick={handleCancel}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl mb-1">{user.username}</h2>
                    <p className="text-muted-foreground mb-3">{user.email}</p>
                    {user.bio && (
                      <p className="text-sm mb-3">{user.bio}</p>
                    )}
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      Member since {getMemberSince()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>Your task management statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl">{totalTasks}</div>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl text-green-600">{completedTasks}</div>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mx-auto">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="text-2xl text-yellow-600">{favoriteTasks}</div>
                <p className="text-sm text-muted-foreground">Favorites</p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl text-blue-600">{getCompletionRate()}%</div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your tasks and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => onNavigateTo('favorites')}
            >
              <Star className="h-4 w-4 mr-2" />
              View Favorite Tasks ({favoriteTasks})
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => onNavigateTo('home')}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Go to Tasks
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => onNavigateTo('settings')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              App Settings
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        {totalTasks > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Tasks</CardTitle>
              <CardDescription>Your latest task activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.slice(0, 3).map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {task.category} • {task.priority} priority
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {task.favorite && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                      <Badge variant={task.completed ? 'default' : 'secondary'}>
                        {task.completed ? 'Done' : 'Pending'}
                      </Badge>
                    </div>
                  </div>
                ))}
                
                {totalTasks > 3 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => onNavigateTo('home')}
                  >
                    View All Tasks ({totalTasks})
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}