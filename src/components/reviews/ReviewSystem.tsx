
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star, ThumbsUp, Flag } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface Review {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  bookingId: string;
  serviceType: string;
}

interface ReviewSystemProps {
  serviceId?: string;
  providerId?: string;
  bookingId?: string;
  canReview?: boolean;
}

const ReviewSystem = ({ serviceId, providerId, bookingId, canReview = false }: ReviewSystemProps) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Mock reviews data
  const reviews: Review[] = [
    {
      id: '1',
      customerId: 'customer1',
      customerName: 'Emma Johnson',
      customerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
      rating: 5,
      comment: 'Amazing service! Sarah is very professional and my hair looks incredible. The salon is clean and the atmosphere is relaxing. Highly recommend!',
      date: '2024-05-28',
      helpful: 12,
      bookingId: 'booking1',
      serviceType: 'Hair Styling'
    },
    {
      id: '2',
      customerId: 'customer2',
      customerName: 'Grace Adebayo',
      customerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=grace',
      rating: 5,
      comment: 'Best hair stylist in Lagos! Always satisfied with the results. Great value for money.',
      date: '2024-05-25',
      helpful: 8,
      bookingId: 'booking2',
      serviceType: 'Hair Coloring'
    },
    {
      id: '3',
      customerId: 'customer3',
      customerName: 'Kemi Olatunde',
      customerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kemi',
      rating: 4,
      comment: 'Great experience, very clean salon and excellent customer service. The only issue was that it took a bit longer than expected.',
      date: '2024-05-22',
      helpful: 5,
      bookingId: 'booking3',
      serviceType: 'Hair Treatment'
    }
  ];

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    rating: star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: (reviews.filter(r => r.rating === star).length / reviews.length) * 100
  }));

  const handleSubmitReview = () => {
    if (rating === 0 || !comment.trim()) return;

    const newReview: Review = {
      id: Date.now().toString(),
      customerId: user?.id || 'current-user',
      customerName: user?.name || 'Anonymous',
      customerAvatar: user?.avatar,
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      bookingId: bookingId || 'new-booking',
      serviceType: 'Service'
    };

    console.log('Submitted review:', newReview);
    setRating(0);
    setComment('');
    setShowReviewForm(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Rating Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Reviews & Ratings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(averageRating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">{reviews.length} reviews</p>
            </div>

            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center space-x-2">
                  <span className="text-sm w-8">{rating}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {canReview && !showReviewForm && (
            <div className="mt-6 pt-6 border-t">
              <Button onClick={() => setShowReviewForm(true)}>
                Write a Review
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review Form */}
      {showReviewForm && (
        <Card>
          <CardHeader>
            <CardTitle>Write Your Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= (hoveredRating || rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Your Review</label>
                <Textarea
                  placeholder="Share your experience with this service..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex space-x-2">
                <Button onClick={handleSubmitReview} disabled={rating === 0 || !comment.trim()}>
                  Submit Review
                </Button>
                <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={review.customerAvatar} />
                  <AvatarFallback>{review.customerName[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{review.customerName}</h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {review.serviceType}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(review.date)}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{review.comment}</p>
                  
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                    <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700">
                      <Flag className="w-4 h-4" />
                      <span>Report</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewSystem;
