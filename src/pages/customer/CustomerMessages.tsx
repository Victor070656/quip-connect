
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, Search } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const CustomerMessages = () => {
  const [selectedChat, setSelectedChat] = useState('1');
  const [newMessage, setNewMessage] = useState('');

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/customer/dashboard' },
    { label: 'Messages' },
  ];

  const conversations = [
    {
      id: '1',
      provider: 'Beauty by Sarah',
      lastMessage: 'Great! I confirm your appointment for tomorrow at 2 PM.',
      timestamp: '10:30 AM',
      unread: 0,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
    },
    {
      id: '2',
      provider: 'Clean Masters',
      lastMessage: 'We will arrive at 9 AM sharp. Please ensure someone is available.',
      timestamp: 'Yesterday',
      unread: 2,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=clean'
    },
    {
      id: '3',
      provider: 'Tech Solutions',
      lastMessage: 'Your laptop is ready for pickup.',
      timestamp: '2 days ago',
      unread: 0,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech'
    }
  ];

  const messages = [
    {
      id: '1',
      sender: 'provider',
      message: 'Hi! Thank you for booking our hair styling service.',
      timestamp: '9:30 AM'
    },
    {
      id: '2',
      sender: 'customer',
      message: 'Hello! I wanted to confirm the appointment time.',
      timestamp: '10:15 AM'
    },
    {
      id: '3',
      sender: 'provider',
      message: 'Great! I confirm your appointment for tomorrow at 2 PM.',
      timestamp: '10:30 AM'
    }
  ];

  const sendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <DashboardLayout userType="customer" breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Chat with your service providers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card>
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search conversations..." className="pl-10" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 cursor-pointer hover:bg-muted transition-colors ${
                      selectedChat === conversation.id ? 'bg-muted' : ''
                    }`}
                    onClick={() => setSelectedChat(conversation.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback>{conversation.provider[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{conversation.provider}</p>
                          <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Beauty by Sarah</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-[480px]">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'customer'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button onClick={sendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerMessages;
