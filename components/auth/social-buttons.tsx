"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Loader2, Github, XCircle, CheckCircle2 } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';

export function SocialButtons() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    try {
      setLoading(provider);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
      
      toast.success('Redirecting to login...', {
        icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
        className: "bg-emerald-50 text-emerald-800 border-emerald-200",
      });
    } catch (error: any) {
      console.error('Social login error:', error);
      toast.error('Authentication failed. Please try email login instead.', {
        icon: <XCircle className="h-5 w-5 text-red-500" />,
        className: "bg-red-50 text-red-800 border-red-200",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="grid gap-4">
      <Button 
        variant="outline" 
        onClick={() => handleSocialLogin('google')}
        disabled={loading !== null}
        className="relative"
      >
        <FcGoogle className="mr-2 h-4 w-4" />
        Continue with Google
        {loading === 'google' && <Loader2 className="absolute right-2 h-4 w-4 animate-spin" />}
      </Button>
      <Button 
        variant="outline" 
        onClick={() => handleSocialLogin('github')}
        disabled={loading !== null}
        className="relative"
      >
        <Github className="mr-2 h-4 w-4" />
        Continue with GitHub
        {loading === 'github' && <Loader2 className="absolute right-2 h-4 w-4 animate-spin" />}
      </Button>
    </div>
  );
}