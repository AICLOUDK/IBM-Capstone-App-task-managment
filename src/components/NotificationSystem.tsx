import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Bell, X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Task } from '../App';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  timestamp: Date;
  read: boolean;
}

interface NotificationSystemProps {
  enabled: boolean;
  tasks: Task[];
}

export function NotificationSystem({ enabled, tasks }: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    // Check for overdue tasks
    const checkOverdueTasks = () => {
      const today = new Date();
      const overdueTasks = tasks.filter(task => {
        if (!task.dueDate || task.completed) return false;
        const dueDate = new Date(task.dueDate);
        return dueDate < today;
      });

      overdueTasks.forEach(task => {
        const existingNotification = notifications.find(
          n => n.title.includes(task.title) && n.type === 'warning'
        );
        
        if (!existingNotification) {
          addNotification({
            title: 'Task Overdue',
            message: `"${task.title}" is past its due date`,
            type: 'warning'
          });
        }
      });
    };

    // Check for upcoming due dates (within 24 hours)
    const checkUpcomingTasks = () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const upcomingTasks = tasks.filter(task => {
        if (!task.dueDate || task.completed) return false;
        const dueDate = new Date(task.dueDate);
        const today = new Date();
        return dueDate >= today && dueDate <= tomorrow;
      });

      upcomingTasks.forEach(task => {
        const existingNotification = notifications.find(
          n => n.title.includes(task.title) && n.type === 'info'
        );
        
        if (!existingNotification) {
          addNotification({
            title: 'Task Due Soon',
            message: `"${task.title}" is due tomorrow`,
            type: 'info'
          });
        }
      });
    };

    // Generate welcome notification on first load
    if (notifications.length === 0 && tasks.length > 0) {
      addNotification({
        title: 'Welcome to ktech!',
        message: 'Your tasks are now synced and ready to manage',
        type: 'success'
      });
    }

    checkOverdueTasks();
    checkUpcomingTasks();

    // Set up periodic checks every 5 minutes
    const interval = setInterval(() => {
      checkOverdueTasks();
      checkUpcomingTasks();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [enabled, tasks, notifications]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev].slice(0, 10)); // Keep only last 10 notifications
    
    // Auto-show notifications panel briefly for new notifications
    setShowNotifications(true);
    setTimeout(() => setShowNotifications(false), 3000);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'info': return <Info className="h-4 w-4 text-blue-600" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  if (!enabled) return null;

  return (
    <>
      {/* Notification Bell - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          size="icon"
          variant="outline"
          className="relative bg-background shadow-lg"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-destructive text-destructive-foreground"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed top-16 right-4 z-50 w-80">
          <Card className="shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Notifications</CardTitle>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setShowNotifications(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                {notifications.length === 0 
                  ? 'No notifications' 
                  : `${notifications.length} notification${notifications.length === 1 ? '' : 's'}`
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  <Bell className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-border last:border-b-0 ${
                        !notification.read ? 'bg-muted/50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between space-x-2">
                        <div className="flex items-start space-x-2 flex-1">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm truncate">{notification.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {!notification.read && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs h-6 px-2"
                            >
                              Mark Read
                            </Button>
                          )}
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeNotification(notification.id)}
                            className="h-6 w-6"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}