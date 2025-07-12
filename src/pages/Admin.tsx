
import React, { useState } from 'react';
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
  AlertTriangle
} from 'lucide-react';

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data
  const stats = {
    totalUsers: 1234,
    activeSwaps: 89,
    totalItems: 5678,
    pendingReports: 12
  };

  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@email.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9692ca9?w=50",
      status: "Active",
      swaps: 23,
      points: 250,
      joinDate: "2023-01-15",
      lastActive: "2024-01-20"
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike@email.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50",
      status: "Active",
      swaps: 15,
      points: 180,
      joinDate: "2023-03-20",
      lastActive: "2024-01-19"
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma@email.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50",
      status: "Suspended",
      swaps: 8,
      points: 120,
      joinDate: "2023-06-10",
      lastActive: "2024-01-15"
    }
  ];

  const items = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      owner: "Sarah Johnson",
      category: "Jackets",
      condition: "Excellent",
      points: 45,
      status: "Active",
      reports: 0,
      views: 24,
      dateAdded: "2024-01-18"
    },
    {
      id: 2,
      title: "Designer Handbag",
      owner: "Mike Chen",
      category: "Accessories",
      condition: "Good",
      points: 75,
      status: "Reported",
      reports: 2,
      views: 45,
      dateAdded: "2024-01-15"
    },
    {
      id: 3,
      title: "Summer Dress",
      owner: "Emma Davis",
      category: "Dresses",
      condition: "Excellent",
      points: 35,
      status: "Active",
      reports: 0,
      views: 18,
      dateAdded: "2024-01-20"
    }
  ];

  const swaps = [
    {
      id: 1,
      item1: "Vintage Denim Jacket",
      user1: "Sarah Johnson",
      item2: "White Sneakers",
      user2: "Mike Chen",
      status: "Completed",
      points: 45,
      date: "2024-01-15"
    },
    {
      id: 2,
      item1: "Summer Dress",
      user1: "Emma Davis",
      item2: "Black Boots",
      user2: "Lisa Park",
      status: "Pending",
      points: 35,
      date: "2024-01-20"
    },
    {
      id: 3,
      item1: "Designer Handbag",
      user1: "Mike Chen",
      item2: "Silk Scarf",
      user2: "Anna Kim",
      status: "Disputed",
      points: 75,
      date: "2024-01-18"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Suspended':
      case 'Reported':
      case 'Disputed':
        return 'bg-red-100 text-red-800';
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
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full mb-8">
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
            <TabsTrigger value="swaps" className="flex items-center">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Swaps
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
                      <p className="text-sm font-medium text-gray-600">Active Swaps</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.activeSwaps}</p>
                    </div>
                    <ArrowUpDown className="w-8 h-8 text-green-500" />
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
                      <p className="text-sm font-medium text-gray-600">Pending Reports</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.pendingReports}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">New user registered: Sarah Johnson</span>
                    <span className="text-xs text-gray-500 ml-auto">2 minutes ago</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Swap completed between Mike Chen and Emma Davis</span>
                    <span className="text-xs text-gray-500 ml-auto">15 minutes ago</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm">Item reported: Designer Handbag</span>
                    <span className="text-xs text-gray-500 ml-auto">1 hour ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">User Management</h2>
              <Button>Add New User</Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-600">User</th>
                        <th className="text-left p-4 font-medium text-gray-600">Status</th>
                        <th className="text-left p-4 font-medium text-gray-600">Swaps</th>
                        <th className="text-left p-4 font-medium text-gray-600">Points</th>
                        <th className="text-left p-4 font-medium text-gray-600">Join Date</th>
                        <th className="text-left p-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
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
                          <td className="p-4">
                            <Badge className={getStatusColor(user.status)}>
                              {user.status}
                            </Badge>
                          </td>
                          <td className="p-4">{user.swaps}</td>
                          <td className="p-4">{user.points}</td>
                          <td className="p-4">{user.joinDate}</td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
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
          </TabsContent>

          <TabsContent value="items">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Item Management</h2>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-600">Item</th>
                        <th className="text-left p-4 font-medium text-gray-600">Owner</th>
                        <th className="text-left p-4 font-medium text-gray-600">Category</th>
                        <th className="text-left p-4 font-medium text-gray-600">Points</th>
                        <th className="text-left p-4 font-medium text-gray-600">Status</th>
                        <th className="text-left p-4 font-medium text-gray-600">Reports</th>
                        <th className="text-left p-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{item.title}</p>
                              <p className="text-sm text-gray-500">{item.condition}</p>
                            </div>
                          </td>
                          <td className="p-4">{item.owner}</td>
                          <td className="p-4">{item.category}</td>
                          <td className="p-4">{item.points}</td>
                          <td className="p-4">
                            <Badge className={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            {item.reports > 0 ? (
                              <Badge variant="destructive">{item.reports}</Badge>
                            ) : (
                              <span className="text-gray-400">0</span>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <XCircle className="w-4 h-4" />
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
          </TabsContent>

          <TabsContent value="swaps">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Swap Management</h2>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-600">Swap Details</th>
                        <th className="text-left p-4 font-medium text-gray-600">Points</th>
                        <th className="text-left p-4 font-medium text-gray-600">Status</th>
                        <th className="text-left p-4 font-medium text-gray-600">Date</th>
                        <th className="text-left p-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {swaps.map((swap) => (
                        <tr key={swap.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div className="space-y-1">
                              <p className="font-medium">{swap.item1} ↔ {swap.item2}</p>
                              <p className="text-sm text-gray-500">{swap.user1} ↔ {swap.user2}</p>
                            </div>
                          </td>
                          <td className="p-4">{swap.points}</td>
                          <td className="p-4">
                            <Badge className={getStatusColor(swap.status)}>
                              {swap.status}
                            </Badge>
                          </td>
                          <td className="p-4">{swap.date}</td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <XCircle className="w-4 h-4" />
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
