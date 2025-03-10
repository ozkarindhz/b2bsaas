export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          tenant_id: string;
          name: string;
          description: string | null;
          parent_id: string | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
          active: boolean;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          name: string;
          description?: string | null;
          parent_id?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
          active?: boolean;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          name?: string;
          description?: string | null;
          parent_id?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
          active?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey";
            columns: ["parent_id"];
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "categories_tenant_id_fkey";
            columns: ["tenant_id"];
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      customers: {
        Row: {
          id: string;
          tenant_id: string;
          first_name: string;
          last_name: string | null;
          email: string | null;
          phone: string | null;
          address: string | null;
          loyalty_points: number | null;
          created_at: string;
          updated_at: string;
          active: boolean;
          notes: string | null;
          custom_fields: Json | null;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          first_name: string;
          last_name?: string | null;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          loyalty_points?: number | null;
          created_at?: string;
          updated_at?: string;
          active?: boolean;
          notes?: string | null;
          custom_fields?: Json | null;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          first_name?: string;
          last_name?: string | null;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          loyalty_points?: number | null;
          created_at?: string;
          updated_at?: string;
          active?: boolean;
          notes?: string | null;
          custom_fields?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "customers_tenant_id_fkey";
            columns: ["tenant_id"];
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      inventory: {
        Row: {
          id: string;
          product_id: string;
          location_id: string;
          quantity: number;
          min_quantity: number;
          max_quantity: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          location_id: string;
          quantity?: number;
          min_quantity?: number;
          max_quantity?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          location_id?: string;
          quantity?: number;
          min_quantity?: number;
          max_quantity?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "inventory_location_id_fkey";
            columns: ["location_id"];
            referencedRelation: "locations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inventory_product_id_fkey";
            columns: ["product_id"];
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      inventory_transactions: {
        Row: {
          id: string;
          tenant_id: string;
          product_id: string;
          location_id: string;
          user_id: string;
          quantity: number;
          transaction_type: string;
          reference_id: string | null;
          reference_type: string | null;
          notes: string | null;
          created_at: string;
          batch_number: string | null;
          expiry_date: string | null;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          product_id: string;
          location_id: string;
          user_id: string;
          quantity: number;
          transaction_type: string;
          reference_id?: string | null;
          reference_type?: string | null;
          notes?: string | null;
          created_at?: string;
          batch_number?: string | null;
          expiry_date?: string | null;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          product_id?: string;
          location_id?: string;
          user_id?: string;
          quantity?: number;
          transaction_type?: string;
          reference_id?: string | null;
          reference_type?: string | null;
          notes?: string | null;
          created_at?: string;
          batch_number?: string | null;
          expiry_date?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "inventory_transactions_location_id_fkey";
            columns: ["location_id"];
            referencedRelation: "locations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inventory_transactions_product_id_fkey";
            columns: ["product_id"];
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inventory_transactions_tenant_id_fkey";
            columns: ["tenant_id"];
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inventory_transactions_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      locations: {
        Row: {
          id: string;
          tenant_id: string;
          name: string;
          address: string | null;
          phone: string | null;
          email: string | null;
          is_main: boolean | null;
          created_at: string;
          updated_at: string;
          active: boolean;
          settings: Json | null;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          name: string;
          address?: string | null;
          phone?: string | null;
          email?: string | null;
          is_main?: boolean | null;
          created_at?: string;
          updated_at?: string;
          active?: boolean;
          settings?: Json | null;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          name?: string;
          address?: string | null;
          phone?: string | null;
          email?: string | null;
          is_main?: boolean | null;
          created_at?: string;
          updated_at?: string;
          active?: boolean;
          settings?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "locations_tenant_id_fkey";
            columns: ["tenant_id"];
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      notifications: {
        Row: {
          id: string;
          tenant_id: string;
          user_id: string | null;
          title: string;
          message: string;
          is_read: boolean | null;
          notification_type: string | null;
          reference_id: string | null;
          reference_type: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          user_id?: string | null;
          title: string;
          message: string;
          is_read?: boolean | null;
          notification_type?: string | null;
          reference_id?: string | null;
          reference_type?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          user_id?: string | null;
          title?: string;
          message?: string;
          is_read?: boolean | null;
          notification_type?: string | null;
          reference_id?: string | null;
          reference_type?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "notifications_tenant_id_fkey";
            columns: ["tenant_id"];
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "notifications_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      products: {
        Row: {
          id: string;
          tenant_id: string;
          category_id: string | null;
          name: string;
          description: string | null;
          sku: string | null;
          barcode: string | null;
          image_url: string | null;
          cost_price: number | null;
          selling_price: number | null;
          tax_rate: number | null;
          is_service: boolean | null;
          track_inventory: boolean | null;
          created_at: string;
          updated_at: string;
          active: boolean;
          attributes: Json | null;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          category_id?: string | null;
          name: string;
          description?: string | null;
          sku?: string | null;
          barcode?: string | null;
          image_url?: string | null;
          cost_price?: number | null;
          selling_price?: number | null;
          tax_rate?: number | null;
          is_service?: boolean | null;
          track_inventory?: boolean | null;
          created_at?: string;
          updated_at?: string;
          active?: boolean;
          attributes?: Json | null;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          category_id?: string | null;
          name?: string;
          description?: string | null;
          sku?: string | null;
          barcode?: string | null;
          image_url?: string | null;
          cost_price?: number | null;
          selling_price?: number | null;
          tax_rate?: number | null;
          is_service?: boolean | null;
          track_inventory?: boolean | null;
          created_at?: string;
          updated_at?: string;
          active?: boolean;
          attributes?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_tenant_id_fkey";
            columns: ["tenant_id"];
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      project_tasks: {
        Row: {
          id: string;
          project_id: string;
          name: string;
          description: string | null;
          start_date: string | null;
          due_date: string | null;
          assigned_to: string | null;
          created_at: string;
          updated_at: string;
          status: string | null;
          priority: string | null;
          completion_percentage: number | null;
        };
        Insert: {
          id?: string;
          project_id: string;
          name: string;
          description?: string | null;
          start_date?: string | null;
          due_date?: string | null;
          assigned_to?: string | null;
          created_at?: string;
          updated_at?: string;
          status?: string | null;
          priority?: string | null;
          completion_percentage?: number | null;
        };
        Update: {
          id?: string;
          project_id?: string;
          name?: string;
          description?: string | null;
          start_date?: string | null;
          due_date?: string | null;
          assigned_to?: string | null;
          created_at?: string;
          updated_at?: string;
          status?: string | null;
          priority?: string | null;
          completion_percentage?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "project_tasks_assigned_to_fkey";
            columns: ["assigned_to"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_tasks_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      projects: {
        Row: {
          id: string;
          tenant_id: string;
          name: string;
          description: string | null;
          start_date: string | null;
          end_date: string | null;
          budget: number | null;
          customer_id: string | null;
          manager_id: string | null;
          created_at: string;
          updated_at: string;
          status: string | null;
          custom_fields: Json | null;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          name: string;
          description?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          budget?: number | null;
          customer_id?: string | null;
          manager_id?: string | null;
          created_at?: string;
          updated_at?: string;
          status?: string | null;
          custom_fields?: Json | null;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          name?: string;
          description?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          budget?: number | null;
          customer_id?: string | null;
          manager_id?: string | null;
          created_at?: string;
          updated_at?: string;
          status?: string | null;
          custom_fields?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "projects_customer_id_fkey";
            columns: ["customer_id"];
            referencedRelation: "customers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_manager_id_fkey";
            columns: ["manager_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_tenant_id_fkey";
            columns: ["tenant_id"];
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      purchase_order_items: {
        Row: {
          id: string;
          purchase_order_id: string;
          product_id: string;
          quantity: number;
          received_quantity: number | null;
          unit_cost: number;
          tax_rate: number | null;
          tax_amount: number | null;
          discount_amount: number | null;
          total_amount: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          purchase_order_id: string;
          product_id: string;
          quantity?: number;
          received_quantity?: number | null;
          unit_cost?: number;
          tax_rate?: number | null;
          tax_amount?: number | null;
          discount_amount?: number | null;
          total_amount?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          purchase_order_id?: string;
          product_id?: string;
          quantity?: number;
          received_quantity?: number | null;
          unit_cost?: number;
          tax_rate?: number | null;
          tax_amount?: number | null;
          discount_amount?: number | null;
          total_amount?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "purchase_order_items_product_id_fkey";
            columns: ["product_id"];
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "purchase_order_items_purchase_order_id_fkey";
            columns: ["purchase_order_id"];
            referencedRelation: "purchase_orders";
            referencedColumns: ["id"];
          },
        ];
      };
      purchase_orders: {
        Row: {
          id: string;
          tenant_id: string;
          location_id: string;
          supplier_id: string | null;
          user_id: string;
          po_number: string;
          po_date: string;
          expected_date: string | null;
          subtotal: number;
          tax_amount: number;
          discount_amount: number;
          total_amount: number;
          payment_status: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
          status: string | null;
          custom_fields: Json | null;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          location_id: string;
          supplier_id?: string | null;
          user_id: string;
          po_number: string;
          po_date?: string;
          expected_date?: string | null;
          subtotal?: number;
          tax_amount?: number;
          discount_amount?: number;
          total_amount?: number;
          payment_status?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
          status?: string | null;
          custom_fields?: Json | null;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          location_id?: string;
          supplier_id?: string | null;
          user_id?: string;
          po_number?: string;
          po_date?: string;
          expected_date?: string | null;
          subtotal?: number;
          tax_amount?: number;
          discount_amount?: number;
          total_amount?: number;
          payment_status?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
          status?: string | null;
          custom_fields?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "purchase_orders_location_id_fkey";
            columns: ["location_id"];
            referencedRelation: "locations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "purchase_orders_supplier_id_fkey";
            columns: ["supplier_id"];
            referencedRelation: "suppliers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "purchase_orders_tenant_id_fkey";
            columns: ["tenant_id"];
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "purchase_orders_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      roles: {
        Row: {
          id: string;
          tenant_id: string;
          name: string;
          permissions: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          name: string;
          permissions?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          name?: string;
          permissions?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "roles_tenant_id_fkey";
            columns: ["tenant_id"];
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      sale_items: {
        Row: {
          id: string;
          sale_id: string;
          product_id: string;
          quantity: number;
          unit_price: number;
          tax_rate: number | null;
          tax_amount: number | null;
          discount_amount: number | null;
          total_amount: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          sale_id: string;
          product_id: string;
          quantity?: number;
          unit_price?: number;
          tax_rate?: number | null;
          tax_amount?: number | null;
          discount_amount?: number | null;
          total_amount?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          sale_id?: string;
          product_id?: string;
          quantity?: number;
          unit_price?: number;
          tax_rate?: number | null;
          tax_amount?: number | null;
          discount_amount?: number | null;
          total_amount?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sale_items_product_id_fkey";
            columns: ["product_id"];
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sale_items_sale_id_fkey";
            columns: ["sale_id"];
            referencedRelation: "sales";
            referencedColumns: ["id"];
          },
        ];
      };
      sales: {
        Row: {
          id: string;
          tenant_id: string;
          location_id: string;
          customer_id: string | null;
          user_id: string;
          sale_number: string;
          sale_date: string;
          subtotal: number;
          tax_amount: number;
          discount_amount: number;
          total_amount: number;
          payment_status: string | null;
          payment_method: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
          status: string | null;
          custom_fields: Json | null;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          location_id: string;
          customer_id?: string | null;
          user_id: string;
          sale_number: string;
          sale_date?: string;
          subtotal?: number;
          tax_amount?: number;
          discount_amount?: number;
          total_amount?: number;
          payment_status?: string | null;
          payment_method?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
          status?: string | null;
          custom_fields?: Json | null;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          location_id?: string;
          customer_id?: string | null;
          user_id?: string;
          sale_number?: string;
          sale_date?: string;
          subtotal?: number;
          tax_amount?: number;
          discount_amount?: number;
          total_amount?: number;
          payment_status?: string | null;
          payment_method?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
          status?: string | null;
          custom_fields?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "sales_customer_id_fkey";
            columns: ["customer_id"];
            referencedRelation: "customers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sales_location_id_fkey";
            columns: ["location_id"];
            referencedRelation: "locations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sales_tenant_id_fkey";
            columns: ["tenant_id"];
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sales_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      shifts: {
        Row: {
          id: string;
          tenant_id: string;
          location_id: string;
          user_id: string;
          start_time: string;
          end_time: string | null;
          created_at: string;
          updated_at: string;
          status: string | null;
          notes: string | null;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          location_id: string;
          user_id: string;
          start_time: string;
          end_time?: string | null;
          created_at?: string;
          updated_at?: string;
          status?: string | null;
          notes?: string | null;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          location_id?: string;
          user_id?: string;
          start_time?: string;
          end_time?: string | null;
          created_at?: string;
          updated_at?: string;
          status?: string | null;
          notes?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "shifts_location_id_fkey";
            columns: ["location_id"];
            referencedRelation: "locations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "shifts_tenant_id_fkey";
            columns: ["tenant_id"];
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "shifts_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      suppliers: {
        Row: {
          id: string;
          tenant_id: string;
          name: string;
          contact_person: string | null;
          email: string | null;
          phone: string | null;
          address: string | null;
          created_at: string;
          updated_at: string;
          active: boolean;
          notes: string | null;
          custom_fields: Json | null;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          name: string;
          contact_person?: string | null;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          created_at?: string;
          updated_at?: string;
          active?: boolean;
          notes?: string | null;
          custom_fields?: Json | null;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          name?: string;
          contact_person?: string | null;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          created_at?: string;
          updated_at?: string;
          active?: boolean;
          notes?: string | null;
          custom_fields?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "suppliers_tenant_id_fkey";
            columns: ["tenant_id"];
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      tenants: {
        Row: {
          id: string;
          name: string;
          slug: string;
          logo_url: string | null;
          primary_color: string | null;
          secondary_color: string | null;
          created_at: string;
          updated_at: string;
          active: boolean;
          subscription_status: string | null;
          subscription_end_date: string | null;
          settings: Json | null;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          logo_url?: string | null;
          primary_color?: string | null;
          secondary_color?: string | null;
          created_at?: string;
          updated_at?: string;
          active?: boolean;
          subscription_status?: string | null;
          subscription_end_date?: string | null;
          settings?: Json | null;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          logo_url?: string | null;
          primary_color?: string | null;
          secondary_color?: string | null;
          created_at?: string;
          updated_at?: string;
          active?: boolean;
          subscription_status?: string | null;
          subscription_end_date?: string | null;
          settings?: Json | null;
        };
        Relationships: [];
      };
      user_locations: {
        Row: {
          user_id: string;
          location_id: string;
          is_default: boolean | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          location_id: string;
          is_default?: boolean | null;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          location_id?: string;
          is_default?: boolean | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_locations_location_id_fkey";
            columns: ["location_id"];
            referencedRelation: "locations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_locations_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          id: string;
          tenant_id: string | null;
          role_id: string | null;
          first_name: string | null;
          last_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          created_at: string;
          updated_at: string;
          active: boolean;
          settings: Json | null;
        };
        Insert: {
          id: string;
          tenant_id?: string | null;
          role_id?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
          active?: boolean;
          settings?: Json | null;
        };
        Update: {
          id?: string;
          tenant_id?: string | null;
          role_id?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
          active?: boolean;
          settings?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "users_role_id_fkey";
            columns: ["role_id"];
            referencedRelation: "roles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "users_tenant_id_fkey";
            columns: ["tenant_id"];
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
