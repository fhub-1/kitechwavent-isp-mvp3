export interface Client {
  id: string;
  user_id: string;
  name: string;
  phone_number: string;
  package: string;
  due_date: string;
  status: 'active' | 'inactive';
  created_at: string;
}