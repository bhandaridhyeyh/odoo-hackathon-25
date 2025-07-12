
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Heart, Star, Grid, List } from 'lucide-react';

const Browse = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const items = [
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
      tags: ['Vintage', 'Sustainable'],
      category: 'jackets'
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
      tags: ['Summer', 'Floral'],
      category: 'dresses'
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
      tags: ['Designer', 'Premium'],
      category: 'bags'
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
      tags: ['Casual', 'Sport'],
      category: 'shoes'
    },
    {
      id: 5,
      title: 'Silk Blouse',
      brand: 'H&M',
      size: 'L',
      condition: 'Excellent',
      points: 32,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop&auto=format',
      user: {
        name: 'Maria S.',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&auto=format',
        rating: 4.6
      },
      tags: ['Professional', 'Silk'],
      category: 'tops'
    },
    {
      id: 6,
      title: 'Winter Coat',
      brand: 'Uniqlo',
      size: 'M',
      condition: 'Very Good',
      points: 75,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop&auto=format',
      user: {
        name: 'John D.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&auto=format',
        rating: 4.8
      },
      tags: ['Winter', 'Warm'],
      category: 'outerwear'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for items, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-3 flex-wrap">
              <Select>
                <SelectTrigger className="w-32 h-12">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  <SelectItem value="tops">Tops</SelectItem>
                  <SelectItem value="bottoms">Bottoms</SelectItem>
                  <SelectItem value="dresses">Dresses</SelectItem>
                  <SelectItem value="shoes">Shoes</SelectItem>
                  <SelectItem value="bags">Bags</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-28 h-12">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xs">XS</SelectItem>
                  <SelectItem value="s">S</SelectItem>
                  <SelectItem value="m">M</SelectItem>
                  <SelectItem value="l">L</SelectItem>
                  <SelectItem value="xl">XL</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-36 h-12">
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="like-new">Like New</SelectItem>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="very-good">Very Good</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-32 h-12">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="points-low">Points: Low to High</SelectItem>
                  <SelectItem value="points-high">Points: High to Low</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" className="h-12 px-4">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>

            {/* View Toggle */}
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Browse Items
            <span className="text-gray-500 font-normal ml-2">({items.length} items)</span>
          </h1>
        </div>

        {/* Items Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
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
                    {item.tags.slice(0, 2).map((tag) => (
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
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 bg-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white/90 p-1"
                      >
                        <Heart className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors mb-1">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 mb-2">
                            {item.brand} • Size {item.size} • {item.condition}
                          </p>
                        </div>
                        <div className="flex items-center bg-emerald-100 px-3 py-1 rounded-full">
                          <span className="text-emerald-700 font-semibold">{item.points}p</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <img
                            src={item.user.avatar}
                            alt={item.user.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-gray-600">{item.user.name}</span>
                          <div className="flex items-center ml-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-gray-600 ml-1">{item.user.rating}</span>
                          </div>
                        </div>
                        <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Items
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Browse;
