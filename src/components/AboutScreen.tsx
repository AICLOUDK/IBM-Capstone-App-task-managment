import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ArrowLeft, CheckCircle, Star, Bell, Shield, Smartphone, Globe, Users } from 'lucide-react';
import { AppScreen } from '../App';

interface AboutScreenProps {
  onNavigateBack: () => void;
  onNavigateTo: (screen: AppScreen) => void;
}

export function AboutScreen({ onNavigateBack, onNavigateTo }: AboutScreenProps) {
  const features = [
    {
      icon: CheckCircle,
      title: 'Task Management',
      description: 'Create, organize, and track your tasks with priorities and due dates'
    },
    {
      icon: Star,
      title: 'Favorites System',
      description: 'Mark important tasks as favorites for quick access'
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Get reminded about deadlines and overdue tasks'
    },
    {
      icon: Shield,
      title: 'Local Storage',
      description: 'Your data is stored securely on your device'
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Responsive design that works on all devices'
    },
    {
      icon: Globe,
      title: 'Multi-language',
      description: 'Support for multiple languages and themes'
    }
  ];

  const teamMembers = [
    {
      name: 'ktech Team',
      role: 'Development Team',
      description: 'Dedicated to helping you stay productive'
    }
  ];

  const stats = [
    { label: 'Version', value: '1.0.0' },
    { label: 'Last Updated', value: 'Dec 2024' },
    { label: 'Platform', value: 'Web App' },
    { label: 'License', value: 'MIT' }
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
            <div>
              <h1 className="text-xl">About ktech</h1>
              <p className="text-sm text-muted-foreground">Learn more about your productivity companion</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* App Info */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary rounded-xl flex items-center justify-center mx-auto">
                <span className="text-primary-foreground text-3xl font-bold">k</span>
              </div>
              <div>
                <h2 className="text-2xl mb-2">ktech</h2>
                <p className="text-muted-foreground mb-4">
                  Your personal task management companion designed to help you stay organized and productive.
                </p>
                <Badge variant="secondary" className="text-sm">
                  Version 1.0.0
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
            <CardDescription>
              Discover what makes ktech special
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm mb-1">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* App Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>App Information</CardTitle>
            <CardDescription>
              Technical details and version information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="text-2xl">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Team
            </CardTitle>
            <CardDescription>
              Meet the people behind ktech
            </CardDescription>
          </CardHeader>
          <CardContent>
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm">{member.name}</h4>
                  <p className="text-xs text-muted-foreground mb-1">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Mission */}
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              ktech was created with a simple goal: to help people stay organized and productive without 
              overwhelming them with complex features. We believe that the best productivity tools are those 
              that get out of your way and let you focus on what matters most.
            </p>
            
            <Separator />
            
            <div className="space-y-2">
              <h4 className="text-sm">Privacy First</h4>
              <p className="text-xs text-muted-foreground">
                Your tasks and data are stored locally on your device. We don't collect or share your personal information.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm">Always Improving</h4>
              <p className="text-xs text-muted-foreground">
                We're constantly working to improve ktech based on user feedback and emerging productivity best practices.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Get Help</CardTitle>
            <CardDescription>
              Need assistance or have questions?
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onNavigateTo('help')}
            >
              View Help & Support
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onNavigateTo('settings')}
            >
              App Settings
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('mailto:support@ktech.com', '_blank')}
            >
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}