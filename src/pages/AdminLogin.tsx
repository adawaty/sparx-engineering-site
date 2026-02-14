import React, { useState } from 'react';
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple client-side auth for demonstration
    // In production, this should be handled by a real auth provider (Auth0, Clerk, Supabase, etc.)
    if (password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      setLocation('/admin/dashboard');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900 text-white shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-secondary/20">
            <Lock className="w-6 h-6 text-secondary" />
          </div>
          <CardTitle className="text-2xl font-bold uppercase tracking-wider">Admin Access</CardTitle>
          <CardDescription className="text-zinc-400">
            Enter your secure password to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-zinc-950 border-zinc-800 focus:border-secondary h-12 text-center text-lg tracking-widest"
              />
            </div>
            {error && (
              <Alert variant="destructive" className="bg-red-900/20 border-red-900/50 text-red-400">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold h-12 uppercase tracking-widest">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
