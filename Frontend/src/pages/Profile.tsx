import React, { useEffect, useState } from 'react';
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
  Loader2,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import API from '@/utils/axios';

interface Item {
  _id: string;
  title: string;
  images: string[];
  condition: string;
  category: string;
  createdAt: string;
  status: string;
}

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('listings');
  const [userItems, setUserItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    phone: '',
    location: '',
    bio: ''
  });

  useEffect(() => {
    if (user) {
      fetchUserItems();
      setEditForm({
        name: user.name,
        phone: '',
        location: '',
        bio: ''
      });
    }
  }, [user]);

  const fetchUserItems = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/items/user/${user?._id}`);
      setUserItems(response.data);
      console.log('User items fetched:', response.data);
    } catch (error) {
      console.error('Failed to fetch user items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async () => {
    try {
      setUpdateLoading(true);
      console.log('Updating profile with:', editForm);
      
      await API.put('/users/me', editForm);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      setIsEditing(false);
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast({
        title: "Update failed",
        description: error.response?.data?.message || "Failed to update profile.",
        variant: "destructive",
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600 text-lg">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={user.avatar || ''} />
                  <AvatarFallback className="text-2xl">
                    {user.name
                      ?.split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
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
                        {editForm.location || 'Location'}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Member since 2024
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
                    <div className="text-2xl font-bold text-emerald-600">
                      {user.points || 0}
                    </div>
                    <div className="text-sm text-gray-600">Points</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">0</div>
                    <div className="text-sm text-gray-600">Swaps</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {userItems.length}
                    </div>
                    <div className="text-sm text-gray-600">Active Items</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center justify-center">
                      <Star className="w-5 h-5 text-yellow-500 mr-1" />
                      <span className="text-2xl font-bold text-yellow-600">5.0</span>
                    </div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>

                {isEditing && (
                  <div className="space-y-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          value={editForm.name}
                          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          value={editForm.phone}
                          onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location" 
                          value={editForm.location}
                          onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={editForm.bio}
                        onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <div className="flex space-x-4">
                      <Button 
                        onClick={handleEditSubmit} 
                        disabled={updateLoading}
                      >
                        {updateLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          'Save Changes'
                        )}
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-8">
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">My Listed Items</h2>
              <Link to="/add-item">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Item
                </Button>
              </Link>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : userItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userItems.map((item) => (
                  <Card key={item._id} className="group cursor-pointer hover:shadow-md transition-shadow">
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <img
                        src={item.images[0] || '/placeholder.svg'}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{item.condition}</Badge>
                        <Badge variant={item.status === 'available' ? 'default' : 'secondary'}>
                          {item.status || 'pending'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No items listed yet.</p>
                <Link to="/add-item">
                  <Button className="mt-4">List Your First Item</Button>
                </Link>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history">
            <div className="text-center text-gray-500 py-8">
              <ArrowUpDown className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No swap history found.</p>
            </div>
          </TabsContent>

          <TabsContent value="wishlist">
            <div className="text-center text-gray-500 py-8">
              <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No wishlist items yet.</p>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={user.email} disabled />
                  </div>
                  <div>
                    <Label htmlFor="joined">Member Since</Label>
                    <Input id="joined" value="2024" disabled />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
