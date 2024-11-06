"use client";

import { Client } from '@/types/client';
import { Button } from './ui/button';
import { Card } from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Loader2, Pencil, Trash2, Users, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from './ui/badge';

type ClientListProps = {
  clients: Client[];
  loading: boolean;
  onUpdate: (id: string, data: Partial<Client>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export function ClientList({ clients, loading, onUpdate, onDelete }: ClientListProps) {
  if (loading) {
    return (
      <Card className="p-8">
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Card>
    );
  }

  if (clients.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full bg-primary/10 p-4">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold tracking-tight">No clients yet</h3>
            <p className="text-muted-foreground">
              Get started by adding your first client using the form above.
            </p>
          </div>
          <Button className="mt-4" onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Your First Client
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Package</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.phoneNumber}</TableCell>
              <TableCell className="capitalize">{client.package}</TableCell>
              <TableCell>{format(client.dueDate, 'PP')}</TableCell>
              <TableCell>
                <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                  {client.status}
                </Badge>
              </TableCell>
              <TableCell>{format(client.createdAt, 'PP')}</TableCell>
              <TableCell>{format(client.updatedAt, 'PP')}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newStatus = client.status === 'active' ? 'inactive' : 'active';
                      onUpdate(client.id, { status: newStatus });
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this client?')) {
                        onDelete(client.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}