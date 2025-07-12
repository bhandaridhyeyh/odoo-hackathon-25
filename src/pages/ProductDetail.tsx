
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Share2, MessageCircle, Star, MapPin, Calendar, Tag } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Mock data - replace with API call
  const product = {
    id: id,
    title: "Vintage Denim Jacket",
    description: "Beautiful vintage denim jacket in excellent condition. Perfect for layering and adding a retro touch to any outfit. Features classic button closure, chest pockets, and timeless styling.",
    condition: "Excellent",
    size: "M",
    brand: "Levi's",
    category: "Jackets",
    points: 45,
    images: [
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500"
    ],
    owner: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9692ca9?w=100",
      rating: 4.8,
      totalSwaps: 23,
      location: "New York, NY",
      joinDate: "2023"
    },
    tags: ["vintage", "denim", "casual", "sustainable"],
    posted: "2 days ago"
  };

  const recommendedItems = [
    {
      id: 1,
      title: "Black Turtleneck",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300",
      points: 25,
      condition: "Good"
    },
    {
      id: 2,
      title: "High-waist Jeans",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300",
      points: 35,
      condition: "Excellent"
    },
    {
      id: 3,
      title: "White Sneakers",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300",
      points: 40,
      condition: "Good"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
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
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
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
                  {product.brand}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {product.posted}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
              <div>
                <p className="text-2xl font-bold text-emerald-600">{product.points} Points</p>
                <p className="text-sm text-gray-600">Swap value</p>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="mb-2">
                  Size {product.size}
                </Badge>
                <p className="text-sm font-medium text-emerald-600">{product.condition}</p>
              </div>
            </div>

            <div className="space-y-4">
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white">
                Request Swap
              </Button>
              <Button variant="outline" className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message Owner
              </Button>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Category:</span>
                <p className="text-gray-600">{product.category}</p>
              </div>
              <div>
                <span className="font-medium">Condition:</span>
                <p className="text-gray-600">{product.condition}</p>
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
                <AvatarImage src={product.owner.avatar} />
                <AvatarFallback>{product.owner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-semibold text-lg">{product.owner.name}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    {product.owner.rating} ({product.owner.totalSwaps} swaps)
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {product.owner.location}
                  </span>
                  <span>Member since {product.owner.joinDate}</span>
                </div>
              </div>
              <Button variant="outline">View Profile</Button>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Items */}
        <div>
          <h2 className="text-2xl font-bold mb-6">More from {product.owner.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedItems.map((item) => (
              <Card key={item.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-600 font-bold">{item.points} pts</span>
                    <Badge variant="outline" className="text-xs">
                      {item.condition}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
