
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, Heart, ShoppingBag, User, LogOut, Settings, Package } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RW</span>
            </div>
            <span className="font-bold text-xl text-gray-900">ReWear</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <Link to="/browse" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Browse
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center bg-gray-50 rounded-full px-4 py-2 w-80">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search for clothes, styles, brands..."
              className="bg-transparent flex-1 outline-none text-sm"
            />
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            {isAuthenticated && (
              <>
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  <Heart className="w-4 h-4 mr-2" />
                  Wishlist
                </Button>
                <Button variant="ghost" size="sm">
                  <Package className="w-4 h-4 mr-2" />
                  My Items
                </Button>
              </>
            )}
            
            <div className="flex items-center space-x-2 ml-4">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback>
                          {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/add-item')}>
                      <Package className="mr-2 h-4 w-4" />
                      Add Item
                    </DropdownMenuItem>
                    {user?.isAdmin && (
                      <DropdownMenuItem onClick={() => navigate('/admin')}>
                        <Settings className="mr-2 h-4 w-4" />
                        Admin Panel
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
