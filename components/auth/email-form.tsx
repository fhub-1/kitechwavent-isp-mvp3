"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, XCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface EmailFormProps {
  isLogin: boolean;
  onResetPassword: () => void;
}

export function EmailForm({ isLogin, onResetPassword }: EmailFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success('Logged in successfully', {
          icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
          className: "bg-emerald-50 text-emerald-800 border-emerald-200",
        });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast.success('Check your email to confirm your account', {
          icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
          className: "bg-emerald-50 text-emerald-800 border-emerald-200",
        });
      }
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          minLength={6}
        />
      </div>
      {isLogin && (
        <Button
          type="button"
          variant="link"
          className="px-0 text-sm"
          onClick={onResetPassword}
        >
          Forgot password?
        </Button>
      )}
      <Button type="submit" className="w-full relative" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isLogin ? 'Logging in...' : 'Signing up...'}
          </>
        ) : (
          isLogin ? 'Login' : 'Sign Up'
        )}
      </Button>
    </form>
  );
}