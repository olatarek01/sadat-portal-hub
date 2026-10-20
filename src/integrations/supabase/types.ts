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
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      admin_allowlist: {
        Row: {
          created_at: string
          email: string
        }
        Insert: {
          created_at?: string
          email: string
        }
        Update: {
          created_at?: string
          email?: string
        }
        Relationships: []
      }
      admin_audit_logs: {
        Row: {
          action: string
          admin_id: string
          created_at: string
          details: Json
          entity_id: string | null
          entity_type: string
          id: string
        }
        Insert: {
          action: string
          admin_id: string
          created_at?: string
          details?: Json
          entity_id?: string | null
          entity_type: string
          id?: string
        }
        Update: {
          action?: string
          admin_id?: string
          created_at?: string
          details?: Json
          entity_id?: string | null
          entity_type?: string
          id?: string
        }
        Relationships: []
      }
      admissions_applications: {
        Row: {
          certificate_year: number | null
          college_slug: string
          created_at: string
          email: string
          full_name: string
          id: string
          national_id: string | null
          nationality: string
          notes: string | null
          phone: string
          program: string | null
          status: string
          total_score: number | null
          updated_at: string
        }
        Insert: {
          certificate_year?: number | null
          college_slug: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          national_id?: string | null
          nationality?: string
          notes?: string | null
          phone: string
          program?: string | null
          status?: string
          total_score?: number | null
          updated_at?: string
        }
        Update: {
          certificate_year?: number | null
          college_slug?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          national_id?: string | null
          nationality?: string
          notes?: string | null
          phone?: string
          program?: string | null
          status?: string
          total_score?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      college_admission_requirements: {
        Row: {
          college_id: string
          created_at: string
          description_ar: string
          description_en: string
          id: string
          published: boolean
          requirement_type: string
          sort_order: number
          source_url: string
          title_ar: string
          title_en: string
          updated_at: string
          verified_at: string | null
        }
        Insert: {
          college_id: string
          created_at?: string
          description_ar?: string
          description_en?: string
          id?: string
          published?: boolean
          requirement_type?: string
          sort_order?: number
          source_url?: string
          title_ar: string
          title_en: string
          updated_at?: string
          verified_at?: string | null
        }
        Update: {
          college_id?: string
          created_at?: string
          description_ar?: string
          description_en?: string
          id?: string
          published?: boolean
          requirement_type?: string
          sort_order?: number
          source_url?: string
          title_ar?: string
          title_en?: string
          updated_at?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "college_admission_requirements_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
        ]
      }
      colleges: {
        Row: {
          category_ar: string
          category_en: string
          created_at: string
          dean_ar: string
          dean_en: string
          desc_ar: string
          desc_en: string
          id: string
          image_key: string
          name_ar: string
          name_en: string
          programs: Json
          slug: string
          sort_order: number
          students: number
          updated_at: string
          years: number
        }
        Insert: {
          category_ar?: string
          category_en?: string
          created_at?: string
          dean_ar?: string
          dean_en?: string
          desc_ar?: string
          desc_en?: string
          id?: string
          image_key?: string
          name_ar: string
          name_en: string
          programs?: Json
          slug: string
          sort_order?: number
          students?: number
          updated_at?: string
          years?: number
        }
        Update: {
          category_ar?: string
          category_en?: string
          created_at?: string
          dean_ar?: string
          dean_en?: string
          desc_ar?: string
          desc_en?: string
          id?: string
          image_key?: string
          name_ar?: string
          name_en?: string
          programs?: Json
          slug?: string
          sort_order?: number
          students?: number
          updated_at?: string
          years?: number
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          message: string
          phone: string | null
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          message: string
          phone?: string | null
          status?: string
          subject?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          message?: string
          phone?: string | null
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      departments: {
        Row: {
          college_id: string
          created_at: string
          description_ar: string
          description_en: string
          id: string
          name_ar: string
          name_en: string
          published: boolean
          sort_order: number
          source_url: string
          updated_at: string
          verified_at: string | null
        }
        Insert: {
          college_id: string
          created_at?: string
          description_ar?: string
          description_en?: string
          id?: string
          name_ar: string
          name_en: string
          published?: boolean
          sort_order?: number
          source_url?: string
          updated_at?: string
          verified_at?: string | null
        }
        Update: {
          college_id?: string
          created_at?: string
          description_ar?: string
          description_en?: string
          id?: string
          name_ar?: string
          name_en?: string
          published?: boolean
          sort_order?: number
          source_url?: string
          updated_at?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "departments_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
        ]
      }
      faculty_members: {
        Row: {
          bio_ar: string
          bio_en: string
          college_id: string
          created_at: string
          email: string
          id: string
          name_ar: string
          name_en: string
          photo_key: string
          published: boolean
          sort_order: number
          source_url: string
          title_ar: string
          title_en: string
          updated_at: string
          verified_at: string | null
        }
        Insert: {
          bio_ar?: string
          bio_en?: string
          college_id: string
          created_at?: string
          email: string
          id?: string
          name_ar: string
          name_en: string
          photo_key?: string
          published?: boolean
          sort_order?: number
          source_url?: string
          title_ar?: string
          title_en?: string
          updated_at?: string
          verified_at?: string | null
        }
        Update: {
          bio_ar?: string
          bio_en?: string
          college_id?: string
          created_at?: string
          email?: string
          id?: string
          name_ar?: string
          name_en?: string
          photo_key?: string
          published?: boolean
          sort_order?: number
          source_url?: string
          title_ar?: string
          title_en?: string
          updated_at?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "faculty_members_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
        ]
      }
      faqs: {
        Row: {
          answer_ar: string
          answer_en: string
          created_at: string
          id: string
          published: boolean
          question_ar: string
          question_en: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          answer_ar?: string
          answer_en?: string
          created_at?: string
          id?: string
          published?: boolean
          question_ar: string
          question_en: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          answer_ar?: string
          answer_en?: string
          created_at?: string
          id?: string
          published?: boolean
          question_ar?: string
          question_en?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          body_ar: string
          body_en: string
          category_ar: string
          category_en: string
          created_at: string
          event_date: string
          excerpt_ar: string
          excerpt_en: string
          id: string
          image_key: string
          kind: string
          published: boolean
          title_ar: string
          title_en: string
          updated_at: string
        }
        Insert: {
          body_ar?: string
          body_en?: string
          category_ar?: string
          category_en?: string
          created_at?: string
          event_date?: string
          excerpt_ar?: string
          excerpt_en?: string
          id?: string
          image_key?: string
          kind?: string
          published?: boolean
          title_ar: string
          title_en: string
          updated_at?: string
        }
        Update: {
          body_ar?: string
          body_en?: string
          category_ar?: string
          category_en?: string
          created_at?: string
          event_date?: string
          excerpt_ar?: string
          excerpt_en?: string
          id?: string
          image_key?: string
          kind?: string
          published?: boolean
          title_ar?: string
          title_en?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_key: string | null
          created_at: string
          display_name: string
          id: string
          preferred_language: string
          updated_at: string
        }
        Insert: {
          avatar_key?: string | null
          created_at?: string
          display_name?: string
          id: string
          preferred_language?: string
          updated_at?: string
        }
        Update: {
          avatar_key?: string | null
          created_at?: string
          display_name?: string
          id?: string
          preferred_language?: string
          updated_at?: string
        }
        Relationships: []
      }
      study_plan_courses: {
        Row: {
          academic_year: number
          college_id: string
          course_code: string
          course_type: string
          created_at: string
          credit_hours: number
          id: string
          name_ar: string
          name_en: string
          prerequisite_ar: string
          prerequisite_en: string
          published: boolean
          semester: number
          sort_order: number
          source_url: string
          updated_at: string
        }
        Insert: {
          academic_year: number
          college_id: string
          course_code?: string
          course_type?: string
          created_at?: string
          credit_hours?: number
          id?: string
          name_ar: string
          name_en: string
          prerequisite_ar?: string
          prerequisite_en?: string
          published?: boolean
          semester: number
          sort_order?: number
          source_url?: string
          updated_at?: string
        }
        Update: {
          academic_year?: number
          college_id?: string
          course_code?: string
          course_type?: string
          created_at?: string
          credit_hours?: number
          id?: string
          name_ar?: string
          name_en?: string
          prerequisite_ar?: string
          prerequisite_en?: string
          published?: boolean
          semester?: number
          sort_order?: number
          source_url?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_plan_courses_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          college_id: string | null
          content_ar: string
          content_en: string
          created_at: string
          id: string
          is_approved: boolean
          photo_key: string
          rating: number
          role_ar: string
          role_en: string
          sort_order: number
          student_name_ar: string
          student_name_en: string
          updated_at: string
        }
        Insert: {
          college_id?: string | null
          content_ar: string
          content_en: string
          created_at?: string
          id?: string
          is_approved?: boolean
          photo_key?: string
          rating?: number
          role_ar?: string
          role_en?: string
          sort_order?: number
          student_name_ar: string
          student_name_en: string
          updated_at?: string
        }
        Update: {
          college_id?: string | null
          content_ar?: string
          content_en?: string
          created_at?: string
          id?: string
          is_approved?: boolean
          photo_key?: string
          rating?: number
          role_ar?: string
          role_en?: string
          sort_order?: number
          student_name_ar?: string
          student_name_en?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
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
      app_role: "admin" | "moderator" | "user"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
