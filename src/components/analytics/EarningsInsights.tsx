
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Badge } from '@/components/ui/badge';

const EarningsInsights = () => {
  const dailyEarnings = [
    { day: 'Mon', earnings: 8500, target: 10000 },
    { day: 'Tue', earnings: 12000, target: 10000 },
    { day: 'Wed', earnings: 9500, target: 10000 },
    { day: 'Thu', earnings: 15000, target: 10000 },
    { day: 'Fri', earnings: 18000, target: 10000 },
    { day: 'Sat', earnings: 22000, target: 10000 },
    { day: 'Sun', earnings: 14000, target: 10000 },
  ];

  const projectedEarnings = [
    { month: 'Jul', actual: 48000, projected: 55000 },
    { month: 'Aug', actual: null, projected: 58000 },
    { month: 'Sep', actual: null, projected: 62000 },
    { month: 'Oct', actual: null, projected: 65000 },
  ];

  const chartConfig = {
    earnings: {
      label: 'Earnings',
      color: '#2563eb',
    },
    projected: {
      label: 'Projected',
      color: '#16a34a',
    },
  };

  const totalWeeklyEarnings = dailyEarnings.reduce((sum, day) => sum + day.earnings, 0);
  const weeklyTarget = dailyEarnings.reduce((sum, day) => sum + day.target, 0);
  const achievementRate = ((totalWeeklyEarnings / weeklyTarget) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">This Week</p>
              <p className="text-2xl font-bold">₦{totalWeeklyEarnings.toLocaleString()}</p>
              <Badge variant={totalWeeklyEarnings >= weeklyTarget ? "default" : "secondary"}>
                {achievementRate}% of target
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Avg. per Service</p>
              <p className="text-2xl font-bold">₦12,500</p>
              <Badge variant="outline">+5.2% vs last week</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Peak Day</p>
              <p className="text-2xl font-bold">Saturday</p>
              <Badge variant="outline">₦22,000 earned</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily Earnings vs Target</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyEarnings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke="#2563eb" 
                  strokeWidth={3}
                  dot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#dc2626" 
                  strokeDasharray="5 5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Earnings Projection</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectedEarnings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="projected" 
                  stroke="#16a34a" 
                  fill="#16a34a" 
                  fillOpacity={0.2}
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#2563eb" 
                  strokeWidth={3}
                  dot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningsInsights;
