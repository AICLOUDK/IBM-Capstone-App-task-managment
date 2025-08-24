import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { ArrowLeft, Bell, Moon, Globe, LogOut, User, Shield, Info, HelpCircle } from 'lucide-react';
import { AppScreen } from '../App';

interface Settings {
  notifications: boolean;
  darkMode: boolean;
  language: string;
}

interface SettingsScreenProps {
  settings: Settings;
  onUpdateSettings: (settings: Settings) => void;
  onNavigateBack: () => void;
  onNavigateTo: (screen: AppScreen) => void;
  onLogout: () => void;
}

export function SettingsScreen({ settings, onUpdateSettings, onNavigateBack, onNavigateTo, onLogout }: SettingsScreenProps) {
  const handleToggle = (key: keyof Settings) => {
    onUpdateSettings({
      ...settings,
      [key]: !settings[key]
    });
  };

  const handleLanguageChange = (language: string) => {
    onUpdateSettings({
      ...settings,
      language
    });
  };

  const settingsMenuItems = [
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Manage your notification preferences',
      action: 'toggle',
      key: 'notifications'
    },
    {
      icon: Moon,
      title: 'Dark Mode',
      description: 'Switch between light and dark themes',
      action: 'toggle',
      key: 'darkMode'
    },
    {
      icon: Globe,
      title: 'Language',
      description: 'Select your preferred language',
      action: 'select',
      key: 'language'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={onNavigateBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl">Settings</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Main Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>
              Customize your TaskMaster experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {settingsMenuItems.map((item, index) => (
              <div key={item.key}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  
                  {item.action === 'toggle' && (
                    <Switch
                      checked={settings[item.key as keyof Settings] as boolean}
                      onCheckedChange={() => handleToggle(item.key as keyof Settings)}
                    />
                  )}
                  
                  {item.action === 'select' && item.key === 'language' && (
                    <Select value={settings.language} onValueChange={handleLanguageChange}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
                {index < settingsMenuItems.length - 1 && <Separator className="mt-6" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Manage your account settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm">Profile</h3>
                  <p className="text-xs text-muted-foreground">Edit your profile information</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigateTo('profile')}
              >
                Edit
              </Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm">Privacy & Security</h3>
                  <p className="text-xs text-muted-foreground">Manage your privacy settings</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Support & Information */}
        <Card>
          <CardHeader>
            <CardTitle>Support & Information</CardTitle>
            <CardDescription>
              Get help and learn more about TaskMaster
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <HelpCircle className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm">Help & Support</h3>
                  <p className="text-xs text-muted-foreground">Get help or contact support</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigateTo('help')}
              >
                Get Help
              </Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Info className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm">About TaskMaster</h3>
                  <p className="text-xs text-muted-foreground">App version and information</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigateTo('about')}
              >
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card>
          <CardContent className="pt-6">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}