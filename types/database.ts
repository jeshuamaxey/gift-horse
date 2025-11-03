// Re-export types from auto-generated Supabase types
// This file provides convenient type aliases and can be extended if needed

import type { Database } from './supabase';

// Schema types
type PublicSchema = Database['public'];

// Table row types
export type Profile = PublicSchema['Tables']['profiles']['Row'];
export type Recipient = PublicSchema['Tables']['recipients']['Row'];
export type Occasion = PublicSchema['Tables']['occasions']['Row'];
export type RecipientOccasionMapping = PublicSchema['Tables']['recipient_occasion_mappings']['Row'];
export type GiftIdea = PublicSchema['Tables']['gift_ideas']['Row'];

// Insert types (for creating new records)
export type InsertProfile = PublicSchema['Tables']['profiles']['Insert'];
export type InsertRecipient = Omit<PublicSchema['Tables']['recipients']['Insert'], 'user_id' | 'id'>;
export type InsertOccasion = Omit<PublicSchema['Tables']['occasions']['Insert'], 'user_id' | 'id'>;
export type InsertGiftIdea = Omit<PublicSchema['Tables']['gift_ideas']['Insert'], 'user_id' | 'id' | 'created_at' | 'updated_at'>;

// Update types (for updating existing records)
export type UpdateProfile = PublicSchema['Tables']['profiles']['Update'];
export type UpdateRecipient = PublicSchema['Tables']['recipients']['Update'];
export type UpdateOccasion = PublicSchema['Tables']['occasions']['Update'];
export type UpdateGiftIdea = PublicSchema['Tables']['gift_ideas']['Update'];

// Enum types
export type GiftState = PublicSchema['Enums']['gift_state'];

// Re-export Database type for use with Supabase client
export type { Database };
