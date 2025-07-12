
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Loader2 } from 'lucide-react';
import API from '@/utils/axios';

interface Item {
  _id: string;
  title: string;
  description: string;
  condition: string;
  size: string;
  category: string;
  images: string[];
  userId: {
    _id: string;
    name: string;
  };
  createdAt: string;
  status?: string;
}

const FeaturedItems = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestItems();
  }, []);

  const fetchLatestItems = async () => {
    try {
      const response = await API.get('/items');
      // Filter approved items and get the latest 6
      const approvedItems = response.data
        .filter((item: Item) => !item.status || item.status === 'available')
        .sort((a: Item, b: Item) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3);
      
      setItems(approvedItems);
      console.log('Latest items fetched:', approvedItems);
    } catch (error) {
      console.error('Failed to fetch latest items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (itemId: string) => {
    navigate(`/product/${itemId}`);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Items</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the newest pre-loved fashion items from our community
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <Card 
                key={item._id} 
                className="group cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => handleItemClick(item._id)}
              >
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={item.images[0] || '/placeholder.svg'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="rounded-full w-10 h-10 p-0 bg-white/90 hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-emerald-500 text-white">
                      {item.condition}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-3 group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Badge variant="outline">Size {item.size}</Badge>
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500">by {item.userId.name}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No items available</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Button 
            onClick={() => navigate('/browse')}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3"
          >
            Browse All Items
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;
