
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Share2, MessageCircle, Star, MapPin, Calendar, Tag, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import API from '@/utils/axios';

interface Item {
  _id: string;
  title: string;
  description: string;
  condition: string;
  size: string;
  category: string;
  tags: string[];
  images: string[];
  userId: {
    _id: string;
    name: string;
    avatar?: string;
  };
  status: string;
  createdAt: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [ownerItems, setOwnerItems] = useState<Item[]>([]);

  useEffect(() => {
    if (id) {
      fetchItem();
    }
  }, [id]);

  const fetchItem = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/items/${id}`);
      setItem(response.data);
      
      // Fetch other items by the same owner
      if (response.data.userId._id) {
        const ownerResponse = await API.get(`/items/user/${response.data.userId._id}?exclude=${id}`);
        setOwnerItems(ownerResponse.data.slice(0, 3));
      }
    } catch (error) {
      console.error('Failed to fetch item:', error);
      toast({
        title: "Error",
        description: "Failed to load item details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRequestSwap = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      // This would typically open a swap request modal or navigate to swap page
      toast({
        title: "Swap Request",
        description: "Swap request functionality will be implemented in the swap system.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to request swap.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Item not found</h1>
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
              <img
                src={item.images[selectedImage] || '/placeholder.svg'}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            {item.images.length > 1 && (
              <div className="flex space-x-2">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-emerald-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{item.title}</h1>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className={isLiked ? 'text-red-500' : 'text-gray-500'}
                  >
                    <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center">
                  <Tag className="w-4 h-4 mr-1" />
                  {item.category}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
              <div>
                <p className="text-2xl font-bold text-emerald-600">Available for Swap</p>
                <p className="text-sm text-gray-600">Condition: {item.condition}</p>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="mb-2">
                  Size {item.size}
                </Badge>
              </div>
            </div>

            {user && user._id !== item.userId._id && (
              <div className="space-y-4">
                <Button 
                  onClick={handleRequestSwap}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                >
                  Request Swap
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message Owner
                </Button>
              </div>
            )}

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Category:</span>
                <p className="text-gray-600">{item.category}</p>
              </div>
              <div>
                <span className="font-medium">Condition:</span>
                <p className="text-gray-600">{item.condition}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Owner Info */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>About the Owner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={item.userId.avatar} />
                <AvatarFallback>{item.userId.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-semibold text-lg">{item.userId.name}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    5.0 (New Member)
                  </span>
                  <span>Member since {new Date().getFullYear()}</span>
                </div>
              </div>
              <Button variant="outline">View Profile</Button>
            </div>
          </CardContent>
        </Card>

        {/* More from Owner */}
        {ownerItems.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">More from {item.userId.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ownerItems.map((ownerItem) => (
                <Card 
                  key={ownerItem._id} 
                  className="group cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(`/product/${ownerItem._id}`)}
                >
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={ownerItem.images[0] || '/placeholder.svg'}
                      alt={ownerItem.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{ownerItem.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-600 font-bold">Available</span>
                      <Badge variant="outline" className="text-xs">
                        {ownerItem.condition}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
