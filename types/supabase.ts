export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          phone_number: string
          package: string
          due_date: string
          status: 'active' | 'inactive'
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          phone_number: string
          package: string
          due_date: string
          status?: 'active' | 'inactive'
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          phone_number?: string
          package?: string
          due_date?: string
          status?: 'active' | 'inactive'
          user_id?: string
        }
      }
    }
  }
}