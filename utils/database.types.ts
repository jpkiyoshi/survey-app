export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      survey_options: {
        Row: {
          created_at: string | null
          id: number
          option_name: string
          survey_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          option_name: string
          survey_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          option_name?: string
          survey_id?: number
        }
      }
      survey_votes: {
        Row: {
          id: number
          survey_id: number
          survey_options_id: number
          voter_id: string | null
        }
        Insert: {
          id?: number
          survey_id: number
          survey_options_id: number
          voter_id?: string | null
        }
        Update: {
          id?: number
          survey_id?: number
          survey_options_id?: number
          voter_id?: string | null
        }
      }
      surveys: {
        Row: {
          author_id: string | null
          created_at: string | null
          description: string | null
          id: number
          title: string
        }
        Insert: {
          author_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          title: string
        }
        Update: {
          author_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          title?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
