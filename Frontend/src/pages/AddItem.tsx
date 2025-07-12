
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, X } from 'lucide-react';
import API from '@/utils/axios';

interface ItemData {
  title: string;
  description: string;
  category: string;
  size: string;
  condition: string;
  tags: string;
}

const AddItem = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [itemData, setItemData] = useState<ItemData>({
    title: '',
    description: '',
    category: '',
    size: '',
    condition: '',
    tags: ''
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    'Jackets',
    'Dresses',
    'Tops',
    'Bottoms',
    'Accessories',
    'Shoes',
    'Outerwear'
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const conditions = ['New', 'Excellent', 'Good', 'Fair'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setItemData({
      ...itemData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 4) {
      toast({
        title: "Too many images",
        description: "You can upload a maximum of 4 images.",
        variant: "destructive",
      });
      return;
    }

    setImages(files);

    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }

    if (images.length === 0) {
      toast({
        title: "Images required",
        description: "Please add at least one image of your item.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', itemData.title);
      formData.append('description', itemData.description);
      formData.append('category', itemData.category);
      formData.append('size', itemData.size);
      formData.append('condition', itemData.condition);
      formData.append('tags', itemData.tags);

      images.forEach((image) => {
        formData.append('images', image);
      });

      console.log('Submitting form data:', {
        title: itemData.title,
        description: itemData.description,
        category: itemData.category,
        size: itemData.size,
        condition: itemData.condition,
        tags: itemData.tags,
        imageCount: images.length
      });

      const response = await API.post('/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Item created successfully:', response.data);

      toast({
        title: "Item submitted successfully!",
        description: "Your item has been submitted for admin approval and will be visible once approved.",
      });

      // Reset form
      setItemData({
        title: '',
        description: '',
        category: '',
        size: '',
        condition: '',
        tags: ''
      });
      setImages([]);
      setImagePreviews([]);
      
      navigate('/profile');
    } catch (error: any) {
      console.error('Error submitting item:', error);
      
      let errorMessage = "Something went wrong. Please try again.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Failed to add item",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">List a New Item</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="e.g., Vintage Denim Jacket"
                  value={itemData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the item in detail"
                  value={itemData.description}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(value) => setItemData({ ...itemData, category: value })}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="size">Size</Label>
                  <Select onValueChange={(value) => setItemData({ ...itemData, size: value })}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="condition">Condition</Label>
                  <Select onValueChange={(value) => setItemData({ ...itemData, condition: value })}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((condition) => (
                        <SelectItem key={condition} value={condition}>
                          {condition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  name="tags"
                  type="text"
                  placeholder="e.g., vintage, denim, casual"
                  value={itemData.tags}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="images">Images (up to 4)</Label>
                <Input
                  id="images"
                  name="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Button asChild variant="secondary">
                  <label htmlFor="images" className="cursor-pointer">
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Images
                  </label>
                </Button>

                {imagePreviews.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`preview-${index}`}
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 rounded-full text-red-500 hover:bg-gray-100"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold"
              >
                {loading ? 'Submitting...' : 'Submit Item'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddItem;
