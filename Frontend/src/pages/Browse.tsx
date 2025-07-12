import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Loader2, Heart } from 'lucide-react';
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
  };
  createdAt: string;
  status?: string; // Added optional status property
}

const Browse = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  const categories = [
    'all',
    'Jackets',
    'Dresses', 
    'Tops',
    'Bottoms',
    'Accessories',
    'Shoes',
    'Outerwear'
  ];

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, searchTerm, selectedCategory]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await API.get('/items');
      // Filter only available/approved items
      const availableItems = response.data.filter((item: Item) => 
        !item.status || item.status === 'available'
      );
      setItems(availableItems);
      console.log('Fetched items:', availableItems);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = [...items];

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    setFilteredItems(filtered);
  };

  const handleItemClick = (itemId: string) => {
    navigate(`/product/${itemId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Items</h1>
          <p className="text-gray-600">Discover amazing pre-loved fashion items</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" className="md:w-auto">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            {loading ? 'Loading...' : `${filteredItems.length} items found`}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card 
                key={item._id} 
                className="group cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => handleItemClick(item._id)}
              >
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={item.images[0] || '/placeholder.svg'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="rounded-full w-9 h-9 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-white/90">
                      {item.condition}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">
                        Size {item.size}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-sm text-gray-500">by {item.userId.name}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-4">
              <Search className="w-16 h-16 text-gray-300 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No items found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Browse;
