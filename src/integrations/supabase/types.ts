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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
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
      job_listings: {
        Row: {
          id: string
          title: string
          role_overview: string | null
          responsibilities: string | null
          requirements: string | null
          notes: string | null
          experience: string | null
          sort_order: number | null
          published: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          role_overview?: string | null
          responsibilities?: string | null
          requirements?: string | null
          notes?: string | null
          experience?: string | null
          sort_order?: number | null
          published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          role_overview?: string | null
          responsibilities?: string | null
          requirements?: string | null
          notes?: string | null
          experience?: string | null
          sort_order?: number | null
          published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      bank_accounts: {
        Row: {
          id: string
          title: string
          abbr: string | null
          branch: string | null
          account_number: string | null
          iban: string | null
          currencies: string | null
          sort_order: number | null
          published: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          abbr?: string | null
          branch?: string | null
          account_number?: string | null
          iban?: string | null
          currencies?: string | null
          sort_order?: number | null
          published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          abbr?: string | null
          branch?: string | null
          account_number?: string | null
          iban?: string | null
          currencies?: string | null
          sort_order?: number | null
          published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          id: string
          job_id: string | null
          job_title: string | null
          first_name: string
          last_name: string
          date_of_birth: string | null
          email: string
          country: string | null
          city: string | null
          mobile: string
          address: string | null
          bachelor_degree: string | null
          linkedin_url: string | null
          instapay_link: string | null
          graduation_year: string | null
          id_front_url: string | null
          id_back_url: string | null
          resume_url: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          job_id?: string | null
          job_title?: string | null
          first_name: string
          last_name: string
          date_of_birth?: string | null
          email: string
          country?: string | null
          city?: string | null
          mobile: string
          address?: string | null
          bachelor_degree?: string | null
          linkedin_url?: string | null
          instapay_link?: string | null
          graduation_year?: string | null
          id_front_url?: string | null
          id_back_url?: string | null
          resume_url?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          job_id?: string | null
          job_title?: string | null
          first_name?: string
          last_name?: string
          date_of_birth?: string | null
          email?: string
          country?: string | null
          city?: string | null
          mobile?: string
          address?: string | null
          bachelor_degree?: string | null
          linkedin_url?: string | null
          instapay_link?: string | null
          graduation_year?: string | null
          id_front_url?: string | null
          id_back_url?: string | null
          resume_url?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          id: string
          client_name: string
          role: string | null
          company: string | null
          content: string
          rating: number | null
          avatar_url: string | null
          sort_order: number | null
          published: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          client_name: string
          role?: string | null
          company?: string | null
          content: string
          rating?: number | null
          avatar_url?: string | null
          sort_order?: number | null
          published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          client_name?: string
          role?: string | null
          company?: string | null
          content?: string
          rating?: number | null
          avatar_url?: string | null
          sort_order?: number | null
          published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      admin_activity_log: {
        Row: {
          id: string
          user_email: string | null
          action: string
          entity_type: string
          entity_label: string | null
          fields_changed: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_email?: string | null
          action: string
          entity_type: string
          entity_label?: string | null
          fields_changed?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_email?: string | null
          action?: string
          entity_type?: string
          entity_label?: string | null
          fields_changed?: number | null
          created_at?: string
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
