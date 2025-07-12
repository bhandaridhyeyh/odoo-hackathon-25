
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Recycle, Users, Leaf } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Hero = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Swap, Share, and
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {' '}Sustain
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join the fashion revolution! Trade your pre-loved clothes, discover unique pieces, 
            and build a sustainable wardrobe with our community-driven platform.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">10k+</div>
              <div className="text-sm text-gray-600">Active Swappers</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Recycle className="w-6 h-6 text-teal-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">50k+</div>
              <div className="text-sm text-gray-600">Items Swapped</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Leaf className="w-6 h-6 text-cyan-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">2M+</div>
              <div className="text-sm text-gray-600">CO₂ Saved (kg)</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {isAuthenticated ? (
              <>
                <Link to="/add-item">
                  <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 text-lg">
                    List Your Items
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/browse">
                  <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-emerald-200 hover:bg-emerald-50">
                    Browse Items
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/signup">
                  <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 text-lg">
                    Start Swapping
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/browse">
                  <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-emerald-200 hover:bg-emerald-50">
                    Browse Items
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Trust indicators */}
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-500 mb-4">Trusted by fashion lovers worldwide</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-xs font-semibold text-gray-400">SUSTAINABLE</div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="text-xs font-semibold text-gray-400">COMMUNITY</div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="text-xs font-semibold text-gray-400">CIRCULAR</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
