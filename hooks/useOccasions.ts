import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import type { InsertOccasion, Occasion, UpdateOccasion } from '@/types/database';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useOccasions() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['occasions', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('occasions')
        .select('*')
        .eq('user_id', user.id)
        .order('name', { ascending: true });

      if (error) throw error;
      return data as Occasion[];
    },
    enabled: !!user,
  });
}

export function useOccasion(id: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['occasions', user?.id, id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('occasions')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data as Occasion;
    },
    enabled: !!user && !!id,
  });
}

export function useCreateOccasion() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (occasion: InsertOccasion) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('occasions')
        .insert({
          ...occasion,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data as Occasion;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['occasions', user?.id] });
    },
  });
}

export function useUpdateOccasion() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & UpdateOccasion) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('occasions')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data as Occasion;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['occasions', user?.id] });
    },
  });
}

export function useDeleteOccasion() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('occasions')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['occasions', user?.id] });
    },
  });
}

