"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { PlusIcon, Loader2 } from 'lucide-react';

export function AddClientDialog() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'clients'), {
        ...data,
        createdAt: new Date().toISOString(),
        status: 'active',
      });
      toast.success('Client added successfully');
      setOpen(false);
      reset();
    } catch (error: any) {
      toast.error(error.message || 'Error adding client');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              {...register('name', { required: true })}
              id="name"
              placeholder="Client Name"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-sm text-destructive">Name is required</p>
            )}
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              {...register('phoneNumber', { required: true })}
              id="phoneNumber"
              placeholder="+254 XXX XXX XXX"
              disabled={isSubmitting}
            />
            {errors.phoneNumber && (
              <p className="text-sm text-destructive">Phone number is required</p>
            )}
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="package">Package</Label>
            <Input
              {...register('package', { required: true })}
              id="package"
              placeholder="Internet Package"
              disabled={isSubmitting}
            />
            {errors.package && (
              <p className="text-sm text-destructive">Package is required</p>
            )}
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              {...register('dueDate', { required: true })}
              id="dueDate"
              type="date"
              disabled={isSubmitting}
            />
            {errors.dueDate && (
              <p className="text-sm text-destructive">Due date is required</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              'Add Client'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}