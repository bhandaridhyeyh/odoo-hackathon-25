
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shirt, Crown, Footprints, Watch, Briefcase, Star } from 'lucide-react';

const categories = [
  {
    id: 'tops',
    name: 'Tops & Tees',
    icon: Shirt,
    count: '2.4k items',
    color: 'from-pink-500 to-purple-600'
  },
  {
    id: 'dresses',
    name: 'Dresses',
    icon: Crown,
    count: '1.8k items',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'shoes',
    name: 'Shoes',
    icon: Footprints,
    count: '3.2k items',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    icon: Watch,
    count: '1.5k items',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'bags',
    name: 'Bags',
    icon: Briefcase,
    count: '980 items',
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'premium',
    name: 'Premium',
    icon: Star,
    count: '420 items',
    color: 'from-yellow-500 to-orange-600'
  }
];

const CategoryCards = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover amazing pieces across all categories. From everyday essentials to premium designer items.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Card key={category.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-white">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">{category.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;
