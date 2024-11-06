"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ArrowLeft, XCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface ResetPasswordProps {
  onBack: () => void;
}

export function ResetPassword({ onBack }: ResetPasswordProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback`,
      });
      
      if (error) throw error;

      toast.success('Check your email for the reset link', {
        icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
        className: "bg-emerald-50 text-emerald-800 border-emerald-200",
      });
      onBack();
    } catch (error: any) {
      toast.error(error.message, {
        icon: <XCircle className="h-5 w-5 text-red-500" />,
        className: "bg-red-50 text-red-800 border-red-200",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending reset link...
                </>
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            variant="link"
            className="w-full"
            onClick={onBack}
            disabled={loading}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}