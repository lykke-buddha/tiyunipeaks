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
            plots: {
                Row: {
                    id: string
                    plot_number: string
                    size_ha: number
                    price_mwk: number
                    status: 'available' | 'reserved' | 'sold'
                    description: string | null
                    features: string[] | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    plot_number: string
                    size_ha: number
                    price_mwk: number
                    status?: 'available' | 'reserved' | 'sold'
                    description?: string | null
                    features?: string[] | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    plot_number?: string
                    size_ha?: number
                    price_mwk?: number
                    status?: 'available' | 'reserved' | 'sold'
                    description?: string | null
                    features?: string[] | null
                    created_at?: string
                }
                Relationships: []
            }
            applications: {
                Row: {
                    id: string
                    plot_id: string | null
                    applicant_name: string
                    applicant_email: string
                    applicant_phone: string
                    deposit_amount: number | null
                    loan_duration_months: number | null
                    status: 'pending' | 'approved' | 'rejected'
                    notes: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    plot_id?: string | null
                    applicant_name: string
                    applicant_email: string
                    applicant_phone: string
                    deposit_amount?: number | null
                    loan_duration_months?: number | null
                    status?: 'pending' | 'approved' | 'rejected'
                    notes?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    plot_id?: string | null
                    applicant_name?: string
                    applicant_email?: string
                    applicant_phone?: string
                    deposit_amount?: number | null
                    loan_duration_months?: number | null
                    status?: 'pending' | 'approved' | 'rejected'
                    notes?: string | null
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "applications_plot_id_fkey"
                        columns: ["plot_id"]
                        isOneToOne: false
                        referencedRelation: "plots"
                        referencedColumns: ["id"]
                    }
                ]
            },
            profiles: {
                Row: {
                    id: string
                    role: 'customer' | 'employee' | 'admin'
                    full_name: string
                    phone: string | null
                    country: string | null
                    diaspora: boolean | null
                    diaspora_country: string | null
                    current_city: string | null
                    address: string | null
                    purchase_purpose: string | null
                    timeline: string | null
                    budget_range: string | null
                    preferences: any | null
                    heard_from: string | null
                    dob: string | null
                    id_number: string | null
                    id_type: string | null
                    contact_method: string | null
                    financing_interest: boolean | null
                    marketing_consent: boolean | null
                    profile_complete: boolean | null
                    status: 'active' | 'inactive' | 'suspended' | null
                    failed_login_attempts: number | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    role?: 'customer' | 'employee' | 'admin'
                    full_name: string
                    phone?: string | null
                    country?: string | null
                    diaspora?: boolean | null
                    diaspora_country?: string | null
                    current_city?: string | null
                    address?: string | null
                    purchase_purpose?: string | null
                    timeline?: string | null
                    budget_range?: string | null
                    preferences?: any | null
                    heard_from?: string | null
                    dob?: string | null
                    id_number?: string | null
                    id_type?: string | null
                    contact_method?: string | null
                    financing_interest?: boolean | null
                    marketing_consent?: boolean | null
                    profile_complete?: boolean | null
                    status?: 'active' | 'inactive' | 'suspended' | null
                    failed_login_attempts?: number | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    role?: 'customer' | 'employee' | 'admin'
                    full_name?: string
                    phone?: string | null
                    country?: string | null
                    diaspora?: boolean | null
                    diaspora_country?: string | null
                    current_city?: string | null
                    address?: string | null
                    purchase_purpose?: string | null
                    timeline?: string | null
                    budget_range?: string | null
                    preferences?: any | null
                    heard_from?: string | null
                    dob?: string | null
                    id_number?: string | null
                    id_type?: string | null
                    contact_method?: string | null
                    financing_interest?: boolean | null
                    marketing_consent?: boolean | null
                    profile_complete?: boolean | null
                    status?: 'active' | 'inactive' | 'suspended' | null
                    failed_login_attempts?: number | null
                    created_at?: string
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "profiles_id_fkey"
                        columns: ["id"]
                        isOneToOne: true
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
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
