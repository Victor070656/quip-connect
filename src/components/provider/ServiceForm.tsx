
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X } from 'lucide-react';

interface ServiceFormProps {
  onSubmit: (serviceData: any) => void;
  initialData?: any;
  isEditing?: boolean;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ onSubmit, initialData, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    minPrice: initialData?.minPrice || '',
    maxPrice: initialData?.maxPrice || '',
    duration: initialData?.duration || '',
    location: initialData?.location || '',
    images: initialData?.images || []
  });

  const categories = [
    'Beauty & Personal Care',
    'Home Services',
    'Technology & Repair',
    'Events & Entertainment',
    'Health & Wellness',
    'Education & Training',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, { id: Date.now(), url: imageUrl, file }]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (imageId: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((img: any) => img.id !== imageId)
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Service' : 'Add New Service'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Service Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g., Professional Hair Styling"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
              <SelectTrigger>
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe your service, what's included, and any special features..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minPrice">Minimum Price (₦)</Label>
              <Input
                id="minPrice"
                type="number"
                value={formData.minPrice}
                onChange={(e) => handleChange('minPrice', e.target.value)}
                placeholder="5000"
                required
              />
            </div>
            <div>
              <Label htmlFor="maxPrice">Maximum Price (₦)</Label>
              <Input
                id="maxPrice"
                type="number"
                value={formData.maxPrice}
                onChange={(e) => handleChange('maxPrice', e.target.value)}
                placeholder="15000"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
                placeholder="e.g., 1-2 hours"
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Service Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="e.g., Victoria Island"
                required
              />
            </div>
          </div>

          <div>
            <Label>Portfolio Images</Label>
            <div className="mt-2">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 block text-center cursor-pointer hover:border-blue-500"
              >
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">Click to upload images</p>
              </label>
            </div>
            
            {formData.images.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {formData.images.map((image: any) => (
                  <div key={image.id} className="relative">
                    <img
                      src={image.url}
                      alt="Portfolio"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button type="submit" className="w-full">
            {isEditing ? 'Update Service' : 'Create Service'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ServiceForm;
