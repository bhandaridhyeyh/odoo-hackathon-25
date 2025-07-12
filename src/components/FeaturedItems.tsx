
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, User } from 'lucide-react';

const featuredItems = [
  {
    id: 1,
    title: 'Vintage Denim Jacket',
    brand: 'Levi\'s',
    size: 'M',
    condition: 'Excellent',
    points: 45,
    image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=400&h=500&fit=crop&auto=format',
    user: {
      name: 'Sarah M.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&auto=format',
      rating: 4.9
    },
    tags: ['Vintage', 'Sustainable']
  },
  {
    id: 2,
    title: 'Floral Summer Dress',
    brand: 'Zara',
    size: 'S',
    condition: 'Like New',
    points: 38,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop&auto=format',
    user: {
      name: 'Emma K.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&auto=format',
      rating: 4.8
    },
    tags: ['Summer', 'Floral']
  },
  {
    id: 3,
    title: 'Designer Handbag',
    brand: 'Michael Kors',
    size: 'One Size',
    condition: 'Good',
    points: 120,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop&auto=format',
    user: {
      name: 'Lisa R.',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=40&h=40&fit=crop&auto=format',
      rating: 5.0
    },
    tags: ['Designer', 'Premium']
  },
  {
    id: 4,
    title: 'Casual Sneakers',
    brand: 'Adidas',
    size: '8.5',
    condition: 'Very Good',
    points: 52,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop&auto=format',
    user: {
      name: 'Alex T.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&auto=format',
      rating: 4.7
    },
    tags: ['Casual', 'Sport']
  }
];

const FeaturedItems = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Items
            </h2>
            <p className="text-gray-600">
              Handpicked treasures from our community
            </p>
          </div>
          <Button variant="outline" className="hidden md:block">
            View All Items
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item) => (
            <Card key={item.id} className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white/90 p-2"
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-white/80 backdrop-blur-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center bg-emerald-100 px-2 py-1 rounded-full">
                    <span className="text-emerald-700 font-semibold text-sm">{item.points}p</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">
                  {item.brand} • Size {item.size} • {item.condition}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={item.user.avatar}
                      alt={item.user.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm text-gray-600">{item.user.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{item.user.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Button variant="outline">View All Items</Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;
