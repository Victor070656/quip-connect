
export interface UserBehavior {
  userId: string;
  viewedServices: string[];
  bookedServices: string[];
  searchHistory: string[];
  location: string;
  preferences: {
    priceRange: [number, number];
    categories: string[];
    providers: string[];
  };
}

export interface ServiceData {
  id: string;
  title: string;
  category: string;
  price: number;
  location: string;
  rating: number;
  providerId: string;
  tags: string[];
}

export interface RecommendationScore {
  serviceId: string;
  score: number;
  reasons: string[];
}

export class RecommendationEngine {
  // Calculate collaborative filtering score
  static calculateCollaborativeScore(
    userBehavior: UserBehavior,
    service: ServiceData,
    allUserBehaviors: UserBehavior[]
  ): number {
    const similarUsers = allUserBehaviors.filter(behavior => 
      behavior.userId !== userBehavior.userId &&
      this.calculateUserSimilarity(userBehavior, behavior) > 0.3
    );

    const collaborativeScore = similarUsers.reduce((score, similarUser) => {
      if (similarUser.bookedServices.includes(service.id)) {
        return score + 0.5;
      }
      if (similarUser.viewedServices.includes(service.id)) {
        return score + 0.2;
      }
      return score;
    }, 0);

    return Math.min(collaborativeScore / similarUsers.length || 0, 1);
  }

  // Calculate content-based score
  static calculateContentScore(userBehavior: UserBehavior, service: ServiceData): number {
    let score = 0;

    // Category preference
    if (userBehavior.preferences.categories.includes(service.category)) {
      score += 0.3;
    }

    // Price range preference
    const [minPrice, maxPrice] = userBehavior.preferences.priceRange;
    if (service.price >= minPrice && service.price <= maxPrice) {
      score += 0.2;
    }

    // Location proximity (simplified)
    if (service.location === userBehavior.location) {
      score += 0.2;
    }

    // Provider preference
    if (userBehavior.preferences.providers.includes(service.providerId)) {
      score += 0.2;
    }

    // Rating boost
    score += (service.rating / 5) * 0.1;

    return Math.min(score, 1);
  }

  // Calculate user similarity for collaborative filtering
  static calculateUserSimilarity(user1: UserBehavior, user2: UserBehavior): number {
    const commonCategories = user1.preferences.categories.filter(cat =>
      user2.preferences.categories.includes(cat)
    ).length;

    const commonServices = user1.bookedServices.filter(service =>
      user2.bookedServices.includes(service)
    ).length;

    const locationMatch = user1.location === user2.location ? 0.2 : 0;

    return (commonCategories * 0.3 + commonServices * 0.5 + locationMatch) / 1.0;
  }

  // Generate recommendations for a user
  static generateRecommendations(
    userBehavior: UserBehavior,
    availableServices: ServiceData[],
    allUserBehaviors: UserBehavior[] = [],
    limit: number = 5
  ): RecommendationScore[] {
    const recommendations = availableServices
      .filter(service => !userBehavior.bookedServices.includes(service.id))
      .map(service => {
        const contentScore = this.calculateContentScore(userBehavior, service);
        const collaborativeScore = this.calculateCollaborativeScore(
          userBehavior,
          service,
          allUserBehaviors
        );

        const finalScore = (contentScore * 0.7) + (collaborativeScore * 0.3);
        
        const reasons: string[] = [];
        if (userBehavior.preferences.categories.includes(service.category)) {
          reasons.push(`Matches your interest in ${service.category}`);
        }
        if (service.location === userBehavior.location) {
          reasons.push('Available in your area');
        }
        if (service.rating >= 4.5) {
          reasons.push('Highly rated service');
        }

        return {
          serviceId: service.id,
          score: finalScore,
          reasons: reasons.length > 0 ? reasons : ['Based on your activity']
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return recommendations;
  }

  // Get trending services in user's area
  static getTrendingServices(
    userLocation: string,
    allUserBehaviors: UserBehavior[],
    availableServices: ServiceData[],
    limit: number = 3
  ): ServiceData[] {
    const servicePopularity = new Map<string, number>();

    // Count bookings per service in the user's location
    allUserBehaviors
      .filter(behavior => behavior.location === userLocation)
      .forEach(behavior => {
        behavior.bookedServices.forEach(serviceId => {
          const current = servicePopularity.get(serviceId) || 0;
          servicePopularity.set(serviceId, current + 1);
        });
      });

    // Get most popular services
    const trendingServiceIds = Array.from(servicePopularity.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([serviceId]) => serviceId);

    return availableServices.filter(service => 
      trendingServiceIds.includes(service.id)
    );
  }
}
