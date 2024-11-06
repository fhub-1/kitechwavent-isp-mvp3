"use client";

import { useState } from 'react';
import { Client } from '@/types/client';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { XCircle, Loader2 } from 'lucide-react';

type ClientFormProps = {
  onSubmit: (data: Omit<Client, 'id' | 'created_at' | 'user_id'>) => Promise<void>;
  initialData?: Partial<Client>;
};

export function ClientForm({ onSubmit, initialData }: ClientFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    phone_number: initialData?.phone_number || '',
    package: initialData?.package || '',
    due_date: initialData?.due_date || '',
    status: initialData?.status || 'active',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      if (!initialData) {
        setFormData({
          name: '',
          phone_number: '',
          package: '',
          due_date: '',
          status: 'active',
        });
      }
    } catch (error: any) {
      toast.error('Failed to submit form', {
        icon: <XCircle className="h-5 w-5 text-red-500" />,
        className: "bg-red-50 text-red-800 border-red-200",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Client Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone_number">Phone Number</Label>
          <Input
            id="phone_number"
            value={formData.phone_number}
            onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
            required
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="package">Package</Label>
          <Select
            value={formData.package}
            onValueChange={(value) => setFormData({ ...formData, package: value })}
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select package" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic (5 Mbps)</SelectItem>
              <SelectItem value="standard">Standard (10 Mbps)</SelectItem>
              <SelectItem value="premium">Premium (20 Mbps)</SelectItem>
              <SelectItem value="business">Business (50 Mbps)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="due_date">Due Date</Label>
          <Input
            id="due_date"
            type="date"
            value={formData.due_date}
            onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
            required
            disabled={loading}
          />
        </div>
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {initialData ? 'Updating...' : 'Adding...'}
          </>
        ) : (
          initialData ? 'Update Client' : 'Add Client'
        )}
      </Button>
    </form>
  );
}