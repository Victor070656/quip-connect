
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

interface SimpleBookingCalendarProps {
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
  selectedDate: string;
  selectedTime: string;
}

const SimpleBookingCalendar = ({ 
  onDateSelect, 
  onTimeSelect, 
  selectedDate, 
  selectedTime 
}: SimpleBookingCalendarProps) => {
  const [date, setDate] = React.useState<Date | undefined>(
    selectedDate ? new Date(selectedDate) : undefined
  );

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      onDateSelect(newDate.toISOString().split('T')[0]);
    }
  };

  const handleTimeSelect = (time: string) => {
    onTimeSelect(time);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Select Date</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            disabled={(date) => date < new Date()}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle>Available Times</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className="h-auto p-3 flex flex-col items-center"
                  onClick={() => handleTimeSelect(time)}
                >
                  <Clock className="w-4 h-4 mb-1" />
                  <span className="text-sm font-medium">{time}</span>
                </Button>
              ))}
            </div>
            
            {selectedTime && (
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <Badge variant="secondary">
                  Selected: {selectedDate} at {selectedTime}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SimpleBookingCalendar;
