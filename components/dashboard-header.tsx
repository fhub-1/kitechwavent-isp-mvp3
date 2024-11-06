"use client";

import { supabase } from '@/lib/supabase';
import { Button } from './ui/button';
import { WifiIcon } from 'lucide-react';
import { toast } from 'sonner';

export function DashboardHeader() {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Failed to sign out', {
        className: "bg-red-50 text-red-800 border-red-200",
      });
    }
  };

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <WifiIcon className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">ISP Management</h1>
          </div>
          <Button
            variant="outline"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}