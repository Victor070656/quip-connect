
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, TrendingUp, MessageCircle } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const ProviderReviews = () => {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/provider/dashboard' },
    { label: 'Reviews' },
  ];

  const overallStats = {
    averageRating: 4.8,
    totalReviews: 124,
    ratingDistribution: [
      { stars: 5, count: 89, percentage: 72 },
      { stars: 4, count: 24, percentage: 19 },
      { stars: 3, count: 8, percentage: 6 },
      { stars: 2, count: 2, percentage: 2 },
      { stars: 1, count: 1, percentage: 1 }
    ]
  };

  const recentReviews = [
    {
      id: '1',
      customer: 'Sarah Johnson',
      service: 'Hair Styling',
      rating: 5,
      comment: 'Absolutely amazing service! Sarah is incredibly talented and professional. My hair looks fantastic!',
      date: '2025-06-05',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
    },
    {
      id: '2',
      customer: 'Mike Adams',
      service: 'Hair Washing',
      rating: 5,
      comment: 'Great experience! Very thorough and relaxing. Will definitely book again.',
      date: '2025-06-04',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike'
    },
    {
      id: '3',
      customer: 'Emily Chen',
      service: 'Hair Styling',
      rating: 4,
      comment: 'Good service overall. The result was nice, though the appointment ran a bit longer than expected.',
      date: '2025-06-03',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily'
    },
    {
      id: '4',
      customer: 'David Wilson',
      service: 'Hair Coloring',
      rating: 5,
      comment: 'Perfect color match! Very skilled and attentive to detail. Highly recommend!',
      date: '2025-06-02',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david'
    },
    {
      id: '5',
      customer: 'Grace Okafor',
      service: 'Hair Styling',
      rating: 4,
      comment: 'Nice work! Professional and friendly. The salon environment was very clean and welcoming.',
      date: '2025-06-01',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=grace'
    }
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <DashboardLayout userType="provider" breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Reviews & Ratings</h1>
          <p className="text-muted-foreground">Customer feedback and ratings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Overall Rating */}
          <Card>
            <CardHeader>
              <CardTitle>Overall Rating</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div>
                <div className="text-4xl font-bold">{overallStats.averageRating}</div>
                <div className="flex justify-center mt-2">
                  {renderStars(Math.floor(overallStats.averageRating))}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Based on {overallStats.totalReviews} reviews
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+0.2 from last month</span>
              </div>
            </CardContent>
          </Card>

          {/* Rating Distribution */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Rating Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {overallStats.ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-12">
                      <span className="text-sm">{item.stars}</span>
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentReviews.map((review) => (
                <div key={review.id} className="border-b border-border last:border-0 pb-6 last:pb-0">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={review.avatar} />
                      <AvatarFallback>{review.customer[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{review.customer}</h4>
                          <Badge variant="outline" className="text-xs">
                            {review.service}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            {renderStars(review.rating)}
                          </div>
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProviderReviews;
