"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WifiIcon } from 'lucide-react';
import { SocialButtons } from './auth/social-buttons';
import { EmailForm } from './auth/email-form';
import { ResetPassword } from './auth/reset-password';

export function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showReset, setShowReset] = useState(false);

  if (showReset) {
    return <ResetPassword onBack={() => setShowReset(false)} />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <WifiIcon className="h-8 w-8 text-primary" />
          </div>
          <CardTitle>ISP Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <SocialButtons />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <EmailForm isLogin={isLogin} onResetPassword={() => setShowReset(true)} />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="link"
            className="w-full"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}