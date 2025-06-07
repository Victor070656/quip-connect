
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, X, Clock, Calendar, DollarSign, MessageSquare, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';

interface Notification {
  id: string;
  type: 'booking' | 'payment' | 'message' | 'review' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionRequired?: boolean;
  data?: any;
}

const NotificationCenter = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'booking',
      title: t('notifications.booking.newRequest'),
      message: t('notifications.booking.newRequestMessage'),
      timestamp: '2024-01-15T10:30:00Z',
      read: false,
      actionRequired: true,
      data: { bookingId: 'booking-1', customerId: 'customer-1' }
    },
    {
      id: '2',
      type: 'payment',
      title: t('notifications.payment.received'),
      message: t('notifications.payment.receivedMessage'),
      timestamp: '2024-01-15T09:15:00Z',
      read: false,
      data: { amount: 15000, bookingId: 'booking-2' }
    },
    {
      id: '3',
      type: 'message',
      title: t('notifications.message.new'),
      message: t('notifications.message.newMessage'),
      timestamp: '2024-01-15T08:45:00Z',
      read: true,
      data: { messageId: 'msg-1', senderId: 'provider-1' }
    },
    {
      id: '4',
      type: 'review',
      title: t('notifications.review.new'),
      message: t('notifications.review.newReview'),
      timestamp: '2024-01-14T16:20:00Z',
      read: true,
      data: { reviewId: 'review-1', rating: 5 }
    },
    {
      id: '5',
      type: 'system',
      title: t('notifications.system.verification'),
      message: t('notifications.system.verificationComplete'),
      timestamp: '2024-01-14T14:10:00Z',
      read: false,
      data: { verificationType: 'identity' }
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return Calendar;
      case 'payment':
        return DollarSign;
      case 'message':
        return MessageSquare;
      case 'review':
        return Star;
      case 'system':
        return Bell;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'booking':
        return 'text-blue-600';
      case 'payment':
        return 'text-green-600';
      case 'message':
        return 'text-purple-600';
      case 'review':
        return 'text-yellow-600';
      case 'system':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `${minutes}${t('common.time.minutesAgo')}`;
    } else if (hours < 24) {
      return `${hours}${t('common.time.hoursAgo')}`;
    } else {
      return `${days}${t('common.time.daysAgo')}`;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    toast({
      title: t('notifications.allRead'),
      description: t('notifications.allReadDescription'),
    });
  };

  const handleNotificationAction = (notification: Notification, action: string) => {
    switch (action) {
      case 'accept':
        toast({
          title: t('notifications.actions.bookingAccepted'),
          description: t('notifications.actions.bookingAcceptedDescription'),
        });
        break;
      case 'decline':
        toast({
          title: t('notifications.actions.bookingDeclined'),
          description: t('notifications.actions.bookingDeclinedDescription'),
        });
        break;
      case 'view':
        toast({
          title: t('notifications.actions.redirecting'),
          description: t('notifications.actions.redirectingDescription'),
        });
        break;
    }
    markAsRead(notification.id);
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) { // 20% chance every 10 seconds
        const newNotification: Notification = {
          id: `notif-${Date.now()}`,
          type: 'message',
          title: t('notifications.message.new'),
          message: t('notifications.message.newCustomerMessage'),
          timestamp: new Date().toISOString(),
          read: false
        };
        setNotifications(prev => [newNotification, ...prev]);
        toast({
          title: t('notifications.new'),
          description: newNotification.message,
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [toast, t]);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            {t('notifications.title')}
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <Check className="w-4 h-4 mr-2" />
              {t('notifications.markAllRead')}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>{t('notifications.empty')}</p>
            </div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type);
                const iconColor = getNotificationColor(notification.type);
                
                return (
                  <div
                    key={notification.id}
                    className={`p-4 border-b hover:bg-muted/50 transition-colors ${
                      !notification.read ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full bg-muted ${iconColor}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className={`text-sm font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                              {notification.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {formatTimestamp(notification.timestamp)}
                              </span>
                              {!notification.read && (
                                <Badge variant="secondary" className="text-xs">
                                  {t('notifications.new')}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        {notification.actionRequired && (
                          <div className="flex gap-2 mt-3">
                            <Button
                              size="sm"
                              onClick={() => handleNotificationAction(notification, 'accept')}
                            >
                              {t('notifications.actions.accept')}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleNotificationAction(notification, 'decline')}
                            >
                              {t('notifications.actions.decline')}
                            </Button>
                          </div>
                        )}
                        
                        {!notification.actionRequired && !notification.read && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleNotificationAction(notification, 'view')}
                            className="mt-2"
                          >
                            {t('notifications.actions.viewDetails')}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;
