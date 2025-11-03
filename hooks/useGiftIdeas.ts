import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import type { GiftIdea, InsertGiftIdea, UpdateGiftIdea } from '@/types/database';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useGiftIdeas(filters?: { recipient_id?: string | null; state?: string }) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['gift-ideas', user?.id, filters],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      let query = supabase
        .from('gift_ideas')
        .select('*')
        .eq('user_id', user.id);

      if (filters?.recipient_id !== undefined) {
        if (filters.recipient_id === null) {
          query = query.is('recipient_id', null);
        } else {
          query = query.eq('recipient_id', filters.recipient_id);
        }
      }

      if (filters?.state) {
        query = query.eq('state', filters.state);
      } else {
        // By default, exclude 'gifted' state (archived items)
        query = query.neq('state', 'gifted');
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) throw error;
      return data as GiftIdea[];
    },
    enabled: !!user,
  });
}

export function useUnassignedGiftIdeas() {
  return useGiftIdeas({ recipient_id: null });
}

export function useGiftIdeasByRecipient(recipientId: string) {
  return useGiftIdeas({ recipient_id: recipientId });
}

export function useGiftIdea(id: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['gift-ideas', user?.id, id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('gift_ideas')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data as GiftIdea;
    },
    enabled: !!user && !!id,
  });
}

export function useCreateGiftIdea() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (giftIdea: InsertGiftIdea) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('gift_ideas')
        .insert({
          ...giftIdea,
          user_id: user.id,
          state: giftIdea.state || 'idea',
        })
        .select()
        .single();

      if (error) throw error;
      return data as GiftIdea;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['gift-ideas', user?.id] });
      if (data.recipient_id) {
        queryClient.invalidateQueries({ 
          queryKey: ['gift-ideas', user?.id, { recipient_id: data.recipient_id }] 
        });
      }
    },
  });
}

export function useUpdateGiftIdea() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & UpdateGiftIdea) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('gift_ideas')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data as GiftIdea;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['gift-ideas', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['gift-ideas', user?.id, data.id] });
      if (data.recipient_id) {
        queryClient.invalidateQueries({ 
          queryKey: ['gift-ideas', user?.id, { recipient_id: data.recipient_id }] 
        });
      }
    },
  });
}

export function useDeleteGiftIdea() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('gift_ideas')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gift-ideas', user?.id] });
    },
  });
}

