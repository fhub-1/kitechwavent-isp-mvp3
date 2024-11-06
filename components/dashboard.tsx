"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Client } from '@/types/client';
import { ClientForm } from './client-form';
import { ClientList } from './client-list';
import { DashboardHeader } from './dashboard-header';
import { Card } from './ui/card';
import { toast } from 'sonner';
import { XCircle, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) return;

      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', session.session.user.id)
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Failed to fetch clients', {
          icon: <XCircle className="h-5 w-5 text-red-500" />,
          className: "bg-red-50 text-red-800 border-red-200",
        });
      } else {
        setClients(data || []);
      }
      setLoading(false);
    };

    fetchClients();

    const channel = supabase
      .channel('clients_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'clients' 
      }, fetchClients)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addClient = async (clientData: Omit<Client, 'id' | 'created_at' | 'user_id'>) => {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user) {
      toast.error('You must be logged in to add clients', {
        icon: <XCircle className="h-5 w-5 text-red-500" />,
        className: "bg-red-50 text-red-800 border-red-200",
      });
      return;
    }

    try {
      const { error } = await supabase.from('clients').insert([{
        ...clientData,
        user_id: session.session.user.id,
      }]);

      if (error) throw error;

      toast.success('Client added successfully', {
        icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
        className: "bg-emerald-50 text-emerald-800 border-emerald-200",
      });
    } catch (error: any) {
      toast.error(error.message, {
        icon: <XCircle className="h-5 w-5 text-red-500" />,
        className: "bg-red-50 text-red-800 border-red-200",
      });
    }
  };

  const updateClient = async (id: string, data: Partial<Client>) => {
    try {
      const { error } = await supabase
        .from('clients')
        .update(data)
        .eq('id', id);

      if (error) throw error;

      toast.success('Client updated successfully', {
        icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
        className: "bg-emerald-50 text-emerald-800 border-emerald-200",
      });
    } catch (error: any) {
      toast.error(error.message, {
        icon: <XCircle className="h-5 w-5 text-red-500" />,
        className: "bg-red-50 text-red-800 border-red-200",
      });
    }
  };

  const deleteClient = async (id: string) => {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Client deleted successfully', {
        icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
        className: "bg-emerald-50 text-emerald-800 border-emerald-200",
      });
    } catch (error: any) {
      toast.error(error.message, {
        icon: <XCircle className="h-5 w-5 text-red-500" />,
        className: "bg-red-50 text-red-800 border-red-200",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          <Card className="p-6">
            <ClientForm onSubmit={addClient} />
          </Card>
          <ClientList 
            clients={clients} 
            loading={loading}
            onUpdate={updateClient}
            onDelete={deleteClient}
          />
        </div>
      </main>
    </div>
  );
}