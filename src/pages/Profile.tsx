
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Star, 
  MapPin, 
  Calendar, 
  Edit3, 
  Plus, 
  Heart, 
  Package, 
  ArrowUpDown, 
  Settings,
  Upload,
  Mail,
  Phone
} from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('listings');

  // Mock user data
  const user = {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b9692ca9?w=150",
    bio: "Passionate about sustainable fashion and helping others find their perfect style. Love vintage pieces and unique finds!",
    location: "New York, NY",
    joinDate: "January 2023",
    rating: 4.8,
    totalSwaps: 23,
    points: 250,
    totalListings: 15,
    activeListings: 8
  };

  const listings = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300",
      points: 45,
      condition: "Excellent",
      status: "Active",
      views: 24,
      likes: 8
    },
    {
      id: 2,
      title: "Floral Summer Dress",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300",
      points: 35,
      condition: "Good",
      status: "Active",
      views: 18,
      likes: 12
    },
    {
      id: 3,
      title: "Black Leather Boots",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300",
      points: 55,
      condition: "Excellent",
      status: "Swapped",
      views: 32,
      likes: 15
    }
  ];

  const swapHistory = [
    {
      id: 1,
      type: "completed",
      item: "White Cotton Blouse",
      swappedWith: "Emma Davis",
      points: 30,
      date: "2024-01-15"
    },
    {
      id: 2,
      type: "completed",
      item: "High-waist Jeans",
      swappedWith: "Mike Chen",
      points: 40,
      date: "2024-01-10"
    },
    {
      id: 3,
      type: "pending",
      item: "Vintage Scarf",
      swappedWith: "Lisa Park",
      points: 25,
      date: "2024-01-20"
    }
  ];

  const wishlist = [
    {
      id: 1,
      title: "Oversized Blazer",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300",
      points: 50,
      owner: "Jessica Kim"
    },
    {
      id: 2,
      title: "Midi Skirt",
      image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d27?w=300",
      points: 35,
      owner: "Alex Thompson"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-2xl">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                >
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                    <div className="flex items-center space-x-4 text-gray-600 mt-2">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {user.location}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Joined {user.joinDate}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-emerald-50 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">{user.points}</div>
                    <div className="text-sm text-gray-600">Points</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{user.totalSwaps}</div>
                    <div className="text-sm text-gray-600">Swaps</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{user.activeListings}</div>
                    <div className="text-sm text-gray-600">Active Items</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center justify-center">
                      <Star className="w-5 h-5 text-yellow-500 mr-1" />
                      <span className="text-2xl font-bold text-yellow-600">{user.rating}</span>
                    </div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Bio</Label>
                    {isEditing ? (
                      <Textarea
                        defaultValue={user.bio}
                        className="mt-1"
                        rows={3}
                      />
                    ) : (
                      <p className="text-gray-600 mt-1">{user.bio}</p>
                    )}
                  </div>
                  
                  {isEditing && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" defaultValue={user.email} />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" defaultValue={user.phone} />
                      </div>
                    </div>
                  )}
                  
                  {isEditing && (
                    <div className="flex space-x-4">
                      <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full mb-8">
            <TabsTrigger value="listings" className="flex items-center">
              <Package className="w-4 h-4 mr-2" />
              My Items
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Swap History
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center">
              <Heart className="w-4 h-4 mr-2" />
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="listings">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">My Listings</h2>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600">
                <Plus className="w-4 h-4 mr-2" />
                Add New Item
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((item) => (
                <Card key={item.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden rounded-t-lg relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge
                      variant={item.status === 'Active' ? 'default' : 'secondary'}
                      className="absolute top-2 right-2"
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-emerald-600 font-bold">{item.points} pts</span>
                      <Badge variant="outline" className="text-xs">
                        {item.condition}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{item.views} views</span>
                      <span className="flex items-center">
                        <Heart className="w-3 h-3 mr-1" />
                        {item.likes}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <h2 className="text-2xl font-bold mb-6">Swap History</h2>
            <div className="space-y-4">
              {swapHistory.map((swap) => (
                <Card key={swap.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          swap.type === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                        }`} />
                        <div>
                          <h3 className="font-semibold">{swap.item}</h3>
                          <p className="text-sm text-gray-600">
                            Swapped with {swap.swappedWith}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-emerald-600 font-bold">+{swap.points} pts</div>
                        <div className="text-sm text-gray-500">{swap.date}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="wishlist">
            <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
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
                      <span className="text-sm text-gray-500">by {item.owner}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" defaultValue={user.email} />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue={user.phone} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue={user.location} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Profile Visibility</h4>
                      <p className="text-sm text-gray-600">Make your profile visible to other users</p>
                    </div>
                    <Button variant="outline" size="sm">Public</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive updates about swaps and messages</p>
                    </div>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
