
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Maya Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&auto=format',
    rating: 5,
    text: 'ReWear has completely transformed how I approach fashion. I\'ve swapped over 30 items and discovered amazing pieces I never would have found otherwise!',
    location: 'San Francisco, CA'
  },
  {
    id: 2,
    name: 'Jordan Smith',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&auto=format',
    rating: 5,
    text: 'The community here is incredible. Everyone is so helpful and the quality of items is consistently amazing. Plus, I love that I\'m being sustainable!',
    location: 'Austin, TX'
  },
  {
    id: 3,
    name: 'Zoe Williams',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&auto=format',
    rating: 5,
    text: 'I\'ve saved over $500 this year by swapping instead of buying new. The point system is genius and makes it feel like a fun game!',
    location: 'Brooklyn, NY'
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Community Says
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of fashion lovers who are building a more sustainable future together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="w-8 h-8 text-emerald-500 mb-4" />
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
