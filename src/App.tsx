import React, { useState, useEffect } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { SignupScreen } from './components/SignupScreen';
import { HomeScreen } from './components/HomeScreen';
import { DetailScreen } from './components/DetailScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { FavoritesScreen } from './components/FavoritesScreen';
import { AboutScreen } from './components/AboutScreen';
import { HelpScreen } from './components/HelpScreen';
import { NotificationSystem } from './components/NotificationSystem';

export type User = {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  joinDate?: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  category: string;
  favorite?: boolean;
};

export type AppScreen = 'login' | 'signup' | 'home' | 'detail' | 'settings' | 'profile' | 'favorites' | 'about' | 'help';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('login');
  const [user, setUser] = useState<User | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'en'
  });

  // Check for existing user session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedTasks = localStorage.getItem('userTasks');
    const savedSettings = localStorage.getItem('userSettings');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentScreen('home');
    }
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('userTasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Save settings to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
  }, [settings]);

  const handleLogin = (userData: User) => {
    const userWithDefaults = {
      ...userData,
      joinDate: userData.joinDate || new Date().toISOString(),
      bio: userData.bio || 'Task management enthusiast'
    };
    setUser(userWithDefaults);
    localStorage.setItem('currentUser', JSON.stringify(userWithDefaults));
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    setCurrentScreen('login');
  };

  const handleViewTask = (task: Task) => {
    setSelectedTask(task);
    setCurrentScreen('detail');
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setSelectedTask(updatedTask);
  };

  const handleAddTask = (newTask: Task) => {
    setTasks(prev => [...prev, newTask]);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    if (selectedTask?.id === taskId) {
      setCurrentScreen('home');
    }
  };

  const handleToggleFavorite = (taskId: string) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, favorite: !task.favorite } : task
    ));
  };

  const handleUpdateProfile = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen 
            onLogin={handleLogin}
            onNavigateToSignup={() => setCurrentScreen('signup')}
          />
        );
      case 'signup':
        return (
          <SignupScreen 
            onSignup={handleLogin}
            onNavigateToLogin={() => setCurrentScreen('login')}
          />
        );
      case 'home':
        return (
          <HomeScreen 
            user={user!}
            tasks={tasks}
            onViewTask={handleViewTask}
            onAddTask={handleAddTask}
            onToggleFavorite={handleToggleFavorite}
            onNavigateTo={setCurrentScreen}
            onLogout={handleLogout}
          />
        );
      case 'detail':
        return (
          <DetailScreen 
            task={selectedTask!}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onToggleFavorite={handleToggleFavorite}
            onNavigateBack={() => setCurrentScreen('home')}
          />
        );
      case 'settings':
        return (
          <SettingsScreen 
            settings={settings}
            onUpdateSettings={setSettings}
            onNavigateBack={() => setCurrentScreen('home')}
            onNavigateTo={setCurrentScreen}
            onLogout={handleLogout}
          />
        );
      case 'profile':
        return (
          <ProfileScreen 
            user={user!}
            tasks={tasks}
            onUpdateProfile={handleUpdateProfile}
            onNavigateBack={() => setCurrentScreen('home')}
            onNavigateTo={setCurrentScreen}
          />
        );
      case 'favorites':
        return (
          <FavoritesScreen 
            user={user!}
            tasks={tasks.filter(task => task.favorite)}
            onViewTask={handleViewTask}
            onToggleFavorite={handleToggleFavorite}
            onNavigateBack={() => setCurrentScreen('home')}
          />
        );
      case 'about':
        return (
          <AboutScreen 
            onNavigateBack={() => setCurrentScreen('settings')}
            onNavigateTo={setCurrentScreen}
          />
        );
      case 'help':
        return (
          <HelpScreen 
            onNavigateBack={() => setCurrentScreen('settings')}
            onNavigateTo={setCurrentScreen}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${settings.darkMode ? 'dark' : ''}`}>
      <div className="bg-background text-foreground min-h-screen">
        {renderScreen()}
        <NotificationSystem 
          enabled={settings.notifications}
          tasks={tasks}
        />
      </div>
    </div>
  );
}