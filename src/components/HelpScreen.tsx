import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ArrowLeft, Search, HelpCircle, Book, MessageCircle, Mail, ExternalLink } from 'lucide-react';
import { AppScreen } from '../App';

interface HelpScreenProps {
  onNavigateBack: () => void;
  onNavigateTo: (screen: AppScreen) => void;
}

export function HelpScreen({ onNavigateBack, onNavigateTo }: HelpScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const faqItems = [
    {
      category: 'Getting Started',
      questions: [
        {
          question: 'How do I create my first task?',
          answer: 'Go to the home screen and click the "Add Task" button. Fill in the task title, description, priority level, and due date. Click "Add Task" to save it.'
        },
        {
          question: 'How do I mark a task as completed?',
          answer: 'You can mark a task as completed by clicking on it to open the detail view, then toggle the "Mark as completed" switch. You can also check it off from the task list.'
        },
        {
          question: 'What do the priority levels mean?',
          answer: 'High priority (red) = urgent tasks that need immediate attention. Medium priority (yellow) = important tasks to complete soon. Low priority (green) = tasks you can do when you have time.'
        }
      ]
    },
    {
      category: 'Features',
      questions: [
        {
          question: 'How do favorites work?',
          answer: 'Click the star icon next to any task to mark it as a favorite. Favorite tasks appear in the dedicated Favorites section for quick access to your most important tasks.'
        },
        {
          question: 'Can I edit tasks after creating them?',
          answer: 'Yes! Click on any task to open the detail view where you can edit the title, description, priority, due date, and completion status. Don\'t forget to click "Save" when you\'re done.'
        },
        {
          question: 'How do notifications work?',
          answer: 'ktech sends notifications for overdue tasks and tasks due soon. You can enable/disable notifications in Settings and view them by clicking the bell icon.'
        }
      ]
    },
    {
      category: 'Data & Privacy',
      questions: [
        {
          question: 'Where is my data stored?',
          answer: 'All your tasks and settings are stored locally in your browser\'s storage. This means your data never leaves your device and remains completely private.'
        },
        {
          question: 'Will I lose my tasks if I clear my browser data?',
          answer: 'Yes, clearing your browser data will remove your tasks since they\'re stored locally. We recommend regularly backing up important tasks or taking screenshots.'
        },
        {
          question: 'Can I sync my tasks across devices?',
          answer: 'Currently, ktech stores data locally. For cross-device sync, you would need to manually export/import your data or use a cloud storage solution.'
        }
      ]
    },
    {
      category: 'Troubleshooting',
      questions: [
        {
          question: 'The app is not loading properly',
          answer: 'Try refreshing the page or clearing your browser cache. Make sure you\'re using a modern browser with JavaScript enabled.'
        },
        {
          question: 'I can\'t see my tasks',
          answer: 'Check if you\'re logged in to the correct account. Your tasks are tied to your user account and stored locally in your browser.'
        },
        {
          question: 'Notifications aren\'t working',
          answer: 'Make sure notifications are enabled in Settings and that your browser allows notifications from this website. Check your browser\'s notification settings.'
        }
      ]
    }
  ];

  const quickHelp = [
    {
      title: 'Getting Started Guide',
      description: 'Learn the basics of ktech',
      icon: Book,
      action: 'Read Guide'
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step tutorials',
      icon: ExternalLink,
      action: 'Watch Videos'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other users',
      icon: MessageCircle,
      action: 'Visit Forum'
    },
    {
      title: 'Contact Support',
      description: 'Get help from our team',
      icon: Mail,
      action: 'Send Email'
    }
  ];

  const filteredFAQs = faqItems.map(category => ({
    ...category,
    questions: category.questions.filter(
      item =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
              <h1 className="text-xl">Help & Support</h1>
              <p className="text-sm text-muted-foreground">Find answers and get assistance</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Help */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Help</CardTitle>
            <CardDescription>
              Popular resources to get you started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickHelp.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {item.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="h-5 w-5 mr-2" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>
              Find answers to common questions about ktech
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredFAQs.length === 0 && searchQuery ? (
              <div className="text-center py-8">
                <HelpCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">
                  Try searching with different keywords or browse the categories below.
                </p>
                <Button variant="outline" onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {(searchQuery ? filteredFAQs : faqItems).map((category, categoryIndex) => (
                  <div key={categoryIndex} className="mb-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="secondary">{category.category}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {category.questions.length} question{category.questions.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    {category.questions.map((item, questionIndex) => (
                      <AccordionItem 
                        key={`${categoryIndex}-${questionIndex}`} 
                        value={`${categoryIndex}-${questionIndex}`}
                        className="mb-2"
                      >
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-sm text-muted-foreground">{item.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </div>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle>Still Need Help?</CardTitle>
            <CardDescription>
              Can't find what you're looking for? We're here to help!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              If you can't find the answer to your question in our FAQ, don't hesitate to reach out to our support team.
            </p>
            
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Email Support
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Live Chat
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigateTo('about')}
              >
                <Book className="h-4 w-4 mr-2" />
                About ktech
              </Button>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="text-sm mb-2">Quick Tips:</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Include specific details about your issue when contacting support</li>
                <li>• Check your browser's console for any error messages</li>
                <li>• Try using a different browser or incognito mode if you're experiencing issues</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}