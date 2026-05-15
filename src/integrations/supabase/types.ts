export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_activity_log: {
        Row: {
          action: string
          created_at: string | null
          entity_label: string | null
          entity_type: string
          fields_changed: number | null
          id: string
          user_email: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          entity_label?: string | null
          entity_type: string
          fields_changed?: number | null
          id?: string
          user_email?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          entity_label?: string | null
          entity_type?: string
          fields_changed?: number | null
          id?: string
          user_email?: string | null
        }
        Relationships: []
      }
      bank_accounts: {
        Row: {
          abbr: string | null
          account_number: string | null
          branch: string | null
          created_at: string | null
          currencies: string | null
          iban: string | null
          id: string
          published: boolean | null
          sort_order: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          abbr?: string | null
          account_number?: string | null
          branch?: string | null
          created_at?: string | null
          currencies?: string | null
          iban?: string | null
          id?: string
          published?: boolean | null
          sort_order?: number | null
          title?: string
          updated_at?: string | null
        }
        Update: {
          abbr?: string | null
          account_number?: string | null
          branch?: string | null
          created_at?: string | null
          currencies?: string | null
          iban?: string | null
          id?: string
          published?: boolean | null
          sort_order?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      case_studies: {
        Row: {
          challenge: string
          client_name: string
          cover_image_url: string | null
          created_at: string | null
          featured: boolean | null
          id: string
          industry: string
          metric_1_label: string | null
          metric_1_value: string | null
          metric_2_label: string | null
          metric_2_value: string | null
          metric_3_label: string | null
          metric_3_value: string | null
          published: boolean | null
          results: string
          slug: string
          solution: string
          sort_order: number | null
          tagline: string
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          challenge?: string
          client_name?: string
          cover_image_url?: string | null
          created_at?: string | null
          featured?: boolean | null
          id?: string
          industry?: string
          metric_1_label?: string | null
          metric_1_value?: string | null
          metric_2_label?: string | null
          metric_2_value?: string | null
          metric_3_label?: string | null
          metric_3_value?: string | null
          published?: boolean | null
          results?: string
          slug: string
          solution?: string
          sort_order?: number | null
          tagline?: string
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          challenge?: string
          client_name?: string
          cover_image_url?: string | null
          created_at?: string | null
          featured?: boolean | null
          id?: string
          industry?: string
          metric_1_label?: string | null
          metric_1_value?: string | null
          metric_2_label?: string | null
          metric_2_value?: string | null
          metric_3_label?: string | null
          metric_3_value?: string | null
          published?: boolean | null
          results?: string
          slug?: string
          solution?: string
          sort_order?: number | null
          tagline?: string
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          address: string | null
          bachelor_degree: string | null
          city: string | null
          country: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string
          first_name: string
          graduation_year: string | null
          id: string
          id_back_url: string | null
          id_front_url: string | null
          instapay_link: string | null
          job_id: string | null
          job_title: string | null
          last_name: string
          linkedin_url: string | null
          mobile: string
          resume_url: string | null
        }
        Insert: {
          address?: string | null
          bachelor_degree?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email: string
          first_name: string
          graduation_year?: string | null
          id?: string
          id_back_url?: string | null
          id_front_url?: string | null
          instapay_link?: string | null
          job_id?: string | null
          job_title?: string | null
          last_name: string
          linkedin_url?: string | null
          mobile: string
          resume_url?: string | null
        }
        Update: {
          address?: string | null
          bachelor_degree?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string
          first_name?: string
          graduation_year?: string | null
          id?: string
          id_back_url?: string | null
          id_front_url?: string | null
          instapay_link?: string | null
          job_id?: string | null
          job_title?: string | null
          last_name?: string
          linkedin_url?: string | null
          mobile?: string
          resume_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      job_listings: {
        Row: {
          created_at: string | null
          experience: string | null
          id: string
          notes: string | null
          published: boolean | null
          requirements: string | null
          responsibilities: string | null
          role_overview: string | null
          sort_order: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          experience?: string | null
          id?: string
          notes?: string | null
          published?: boolean | null
          requirements?: string | null
          responsibilities?: string | null
          role_overview?: string | null
          sort_order?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          experience?: string | null
          id?: string
          notes?: string | null
          published?: boolean | null
          requirements?: string | null
          responsibilities?: string | null
          role_overview?: string | null
          sort_order?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      site_content: {
        Row: {
          id: string
          key: string
          label: string
          section: string
          updated_at: string
          value: string
        }
        Insert: {
          id?: string
          key: string
          label?: string
          section: string
          updated_at?: string
          value?: string
        }
        Update: {
          id?: string
          key?: string
          label?: string
          section?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar_url: string | null
          client_name: string
          company: string | null
          content: string
          created_at: string | null
          id: string
          linkedin_url: string | null
          published: boolean | null
          rating: number | null
          relation: string | null
          role: string | null
          sort_order: number | null
        }
        Insert: {
          avatar_url?: string | null
          client_name: string
          company?: string | null
          content: string
          created_at?: string | null
          id?: string
          linkedin_url?: string | null
          published?: boolean | null
          rating?: number | null
          relation?: string | null
          role?: string | null
          sort_order?: number | null
        }
        Update: {
          avatar_url?: string | null
          client_name?: string
          company?: string | null
          content?: string
          created_at?: string | null
          id?: string
          linkedin_url?: string | null
          published?: boolean | null
          rating?: number | null
          relation?: string | null
          role?: string | null
          sort_order?: number | null
        }
        Relationships: []
      }
      time_entries: {
        Row: {
          created_at: string
          description: string
          entry_date: string
          hour: number
          id: string
          notes: string
          project: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string
          entry_date: string
          hour: number
          id?: string
          notes?: string
          project?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          entry_date?: string
          hour?: number
          id?: string
          notes?: string
          project?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_secret: { Args: { secret_name: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
