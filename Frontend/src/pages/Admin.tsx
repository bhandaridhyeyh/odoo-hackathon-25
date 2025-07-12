
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Package, 
  ArrowUpDown, 
  BarChart3, 
  Search, 
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import API from '@/utils/axios';

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  points: number;
}

interface Item {
  _id: string;
  title: string;
  description: string;
  category: string;
  condition: string;
  images: string[];
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  status: string;
  createdAt: string;
}

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState<User[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalItems: 0,
    pendingItems: 0,
    activeSwaps: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'items') {
      fetchItems();
    }
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      const [usersRes, itemsRes] = await Promise.all([
        API.get('/admin/users'),
        API.get('/admin/items')
      ]);
      
      setStats({
        totalUsers: usersRes.data.length,
        totalItems: itemsRes.data.length,
        pendingItems: itemsRes.data.filter((item: Item) => item.status === 'pending').length,
        activeSwaps: 0
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await API.get('/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await API.get('/admin/items');
      setItems(response.data);
    } catch (error) {
      console.error('Failed to fetch items:', error);
      toast({
        title: "Error",
        description: "Failed to fetch items.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApproveItem = async (itemId: string) => {
    try {
      await API.patch(`/admin/items/${itemId}/status`, { status: 'available' });
      toast({
        title: "Item Approved",
        description: "Item has been approved and is now visible to users.",
      });
      fetchItems();
      fetchStats();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve item.",
        variant: "destructive",
      });
    }
  };

  const handleRejectItem = async (itemId: string) => {
    try {
      await API.patch(`/admin/items/${itemId}/status`, { status: 'rejected' });
      toast({
        title: "Item Rejected",
        description: "Item has been rejected.",
      });
      fetchItems();
      fetchStats();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject item.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await API.delete(`/admin/users/${userId}`);
      toast({
        title: "User Deleted",
        description: "User has been deleted successfully.",
      });
      fetchUsers();
      fetchStats();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      await API.delete(`/admin/items/${itemId}`);
      toast({
        title: "Item Deleted",
        description: "Item has been deleted successfully.",
      });
      fetchItems();
      fetchStats();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete item.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'swapped':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">ReWear Admin Panel</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full mb-8">
            <TabsTrigger value="dashboard" className="flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="items" className="flex items-center">
              <Package className="w-4 h-4 mr-2" />
              Items
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Items</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalItems}</p>
                    </div>
                    <Package className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.pendingItems}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Swaps</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.activeSwaps}</p>
                    </div>
                    <ArrowUpDown className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pending Items for Quick Action */}
            <Card>
              <CardHeader>
                <CardTitle>Items Pending Approval</CardTitle>
              </CardHeader>
              <CardContent>
                {items.filter(item => item.status === 'pending').slice(0, 5).map((item) => (
                  <div key={item._id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={item.images[0] || '/placeholder.svg'} 
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-500">by {item.userId.name}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => handleApproveItem(item._id)}>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleRejectItem(item._id)}>
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
                {items.filter(item => item.status === 'pending').length === 0 && (
                  <p className="text-gray-500 text-center py-4">No items pending approval</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">User Management</h2>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="text-left p-4 font-medium text-gray-600">User</th>
                          <th className="text-left p-4 font-medium text-gray-600">Points</th>
                          <th className="text-left p-4 font-medium text-gray-600">Join Date</th>
                          <th className="text-left p-4 font-medium text-gray-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user._id} className="border-b hover:bg-gray-50">
                            <td className="p-4">
                              <div className="flex items-center space-x-3">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage src={user.avatar} />
                                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{user.name}</p>
                                  <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">{user.points}</td>
                            <td className="p-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleDeleteUser(user._id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="items">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Item Management</h2>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="text-left p-4 font-medium text-gray-600">Item</th>
                          <th className="text-left p-4 font-medium text-gray-600">Owner</th>
                          <th className="text-left p-4 font-medium text-gray-600">Category</th>
                          <th className="text-left p-4 font-medium text-gray-600">Status</th>
                          <th className="text-left p-4 font-medium text-gray-600">Date Added</th>
                          <th className="text-left p-4 font-medium text-gray-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => (
                          <tr key={item._id} className="border-b hover:bg-gray-50">
                            <td className="p-4">
                              <div className="flex items-center space-x-3">
                                <img 
                                  src={item.images[0] || '/placeholder.svg'} 
                                  alt={item.title}
                                  className="w-12 h-12 object-cover rounded"
                                />
                                <div>
                                  <p className="font-medium">{item.title}</p>
                                  <p className="text-sm text-gray-500">{item.condition}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">{item.userId.name}</td>
                            <td className="p-4">{item.category}</td>
                            <td className="p-4">
                              <Badge className={getStatusColor(item.status)}>
                                {item.status}
                              </Badge>
                            </td>
                            <td className="p-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                {item.status === 'pending' && (
                                  <>
                                    <Button size="sm" onClick={() => handleApproveItem(item._id)}>
                                      <CheckCircle className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => handleRejectItem(item._id)}>
                                      <XCircle className="w-4 h-4" />
                                    </Button>
                                  </>
                                )}
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleDeleteItem(item._id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
