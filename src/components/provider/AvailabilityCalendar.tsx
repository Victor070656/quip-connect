
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, Plus, Trash2 } from 'lucide-react';

interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

interface DaySchedule {
  day: string;
  enabled: boolean;
  slots: TimeSlot[];
}

const AvailabilityCalendar = () => {
  const [schedule, setSchedule] = useState<DaySchedule[]>([
    {
      day: 'Monday',
      enabled: true,
      slots: [
        { start: '09:00', end: '12:00', available: true },
        { start: '14:00', end: '17:00', available: true }
      ]
    },
    {
      day: 'Tuesday',
      enabled: true,
      slots: [
        { start: '09:00', end: '17:00', available: true }
      ]
    },
    {
      day: 'Wednesday',
      enabled: true,
      slots: [
        { start: '10:00', end: '16:00', available: true }
      ]
    },
    {
      day: 'Thursday',
      enabled: true,
      slots: [
        { start: '09:00', end: '17:00', available: true }
      ]
    },
    {
      day: 'Friday',
      enabled: true,
      slots: [
        { start: '09:00', end: '15:00', available: true }
      ]
    },
    {
      day: 'Saturday',
      enabled: false,
      slots: []
    },
    {
      day: 'Sunday',
      enabled: false,
      slots: []
    }
  ]);

  const toggleDayEnabled = (dayIndex: number) => {
    setSchedule(prev => prev.map((day, index) =>
      index === dayIndex ? { ...day, enabled: !day.enabled } : day
    ));
  };

  const addTimeSlot = (dayIndex: number) => {
    setSchedule(prev => prev.map((day, index) =>
      index === dayIndex
        ? {
            ...day,
            slots: [...day.slots, { start: '09:00', end: '17:00', available: true }]
          }
        : day
    ));
  };

  const removeTimeSlot = (dayIndex: number, slotIndex: number) => {
    setSchedule(prev => prev.map((day, index) =>
      index === dayIndex
        ? {
            ...day,
            slots: day.slots.filter((_, sIndex) => sIndex !== slotIndex)
          }
        : day
    ));
  };

  const updateTimeSlot = (dayIndex: number, slotIndex: number, field: 'start' | 'end', value: string) => {
    setSchedule(prev => prev.map((day, index) =>
      index === dayIndex
        ? {
            ...day,
            slots: day.slots.map((slot, sIndex) =>
              sIndex === slotIndex ? { ...slot, [field]: value } : slot
            )
          }
        : day
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Availability Schedule
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {schedule.map((day, dayIndex) => (
          <div key={day.day} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Switch
                  checked={day.enabled}
                  onCheckedChange={() => toggleDayEnabled(dayIndex)}
                />
                <Label className="font-medium">{day.day}</Label>
              </div>
              {day.enabled && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addTimeSlot(dayIndex)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Slot
                </Button>
              )}
            </div>

            {day.enabled && (
              <div className="space-y-3">
                {day.slots.map((slot, slotIndex) => (
                  <div key={slotIndex} className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <input
                      type="time"
                      value={slot.start}
                      onChange={(e) => updateTimeSlot(dayIndex, slotIndex, 'start', e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="time"
                      value={slot.end}
                      onChange={(e) => updateTimeSlot(dayIndex, slotIndex, 'end', e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeTimeSlot(dayIndex, slotIndex)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                {day.slots.length === 0 && day.enabled && (
                  <p className="text-sm text-gray-500 italic">No time slots added</p>
                )}
              </div>
            )}
          </div>
        ))}

        <div className="flex space-x-2 pt-4 border-t">
          <Button>Save Schedule</Button>
          <Button variant="outline">Preview</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilityCalendar;
