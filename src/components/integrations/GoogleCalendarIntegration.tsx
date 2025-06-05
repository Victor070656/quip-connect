
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GoogleCalendarIntegrationProps {
  onEventCreated?: (eventData: any) => void;
}

const GoogleCalendarIntegration = ({ onEventCreated }: GoogleCalendarIntegrationProps) => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConnectGoogle = async () => {
    setIsLoading(true);
    
    // Simulate Google OAuth flow
    setTimeout(() => {
      setIsConnected(true);
      setIsLoading(false);
      toast({
        title: "Google Calendar Connected",
        description: "You can now sync your service bookings with Google Calendar",
      });
    }, 2000);
  };

  const handleCreateEvent = async () => {
    if (!eventTitle || !eventDate || !eventTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all event details",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate creating calendar event
    setTimeout(() => {
      const eventData = {
        title: eventTitle,
        date: eventDate,
        time: eventTime,
        id: `event-${Date.now()}`
      };

      onEventCreated?.(eventData);
      
      toast({
        title: "Event Created",
        description: `"${eventTitle}" has been added to your Google Calendar`,
      });
      
      setEventTitle('');
      setEventDate('');
      setEventTime('');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="w-5 h-5" />
          <span>Google Calendar Integration</span>
          {isConnected ? (
            <Badge variant="default" className="ml-auto">
              <CheckCircle className="w-3 h-3 mr-1" />
              Connected
            </Badge>
          ) : (
            <Badge variant="secondary" className="ml-auto">
              <AlertCircle className="w-3 h-3 mr-1" />
              Not Connected
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected ? (
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Connect your Google Calendar to automatically sync service bookings
            </p>
            <Button 
              onClick={handleConnectGoogle} 
              disabled={isLoading}
              className="w-full"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {isLoading ? 'Connecting...' : 'Connect Google Calendar'}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label htmlFor="event-title">Event Title</Label>
              <Input
                id="event-title"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="Service Appointment"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="event-date">Date</Label>
                <Input
                  id="event-date"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="event-time">Time</Label>
                <Input
                  id="event-time"
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                />
              </div>
            </div>
            <Button 
              onClick={handleCreateEvent} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Creating Event...' : 'Add to Calendar'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoogleCalendarIntegration;
