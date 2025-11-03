import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/types/database';
import { useQuery } from '@tanstack/react-query';

export function useProfile() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data as Profile;
    },
    enabled: !!user,
  });
}

