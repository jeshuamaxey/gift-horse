import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import type { InsertRecipient, Recipient, UpdateRecipient } from '@/types/database';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useRecipients() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['recipients', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('recipients')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Recipient[];
    },
    enabled: !!user,
  });
}

export function useRecipient(id: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['recipients', user?.id, id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('recipients')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data as Recipient;
    },
    enabled: !!user && !!id,
  });
}

export function useCreateRecipient() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (recipient: InsertRecipient) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('recipients')
        .insert({
          ...recipient,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data as Recipient;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipients', user?.id] });
    },
  });
}

export function useUpdateRecipient() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & UpdateRecipient) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('recipients')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data as Recipient;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['recipients', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['recipients', user?.id, data.id] });
    },
  });
}

export function useDeleteRecipient() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('recipients')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipients', user?.id] });
      // Also invalidate gift ideas since they reference recipients
      queryClient.invalidateQueries({ queryKey: ['gift-ideas', user?.id] });
    },
  });
}

